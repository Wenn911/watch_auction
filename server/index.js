import cors from 'cors';
import express from 'express';
import { createServer } from 'http';
import { createBid, getActiveItems, getAuctionById, getAuctionByItemId, getBidsByAuctionId, getItemCard, getItemImages } from './api.js';
import { initializeSocketIO } from './socket.js';

const app = express();
const httpServer = createServer(app);

app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? process.env.FRONTEND_URL 
    : 'http://localhost:3000',
  credentials: true,
}));

app.use(express.json());

app.get('/api/items/active', async (req, res) => {
  try {
    const items = await getActiveItems();
    res.json(items);
  } catch (error) {
    console.error('Error fetching active items:', error);
    res.status(500).json({ error: 'Failed to fetch active items' });
  }
});

app.get('/api/items/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const item = await getItemCard(id);
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json(item);
  } catch (error) {
    console.error('Error fetching item:', error);
    res.status(500).json({ error: 'Failed to fetch item' });
  }
});

app.get('/api/items/:id/images', async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const images = await getItemImages(id);
    res.json(images || []);
  } catch (error) {
    console.error('Error fetching item images:', error);
    res.status(500).json({ error: 'Failed to fetch item images' });
  }
});

app.get('/api/auctions/item/:itemId', async (req, res) => {
  try {
    const itemId = parseInt(req.params.itemId, 10);
    const auction = await getAuctionByItemId(itemId);
    if (!auction) {
      return res.status(404).json({ error: 'Auction not found' });
    }
    res.json(auction);
  } catch (error) {
    console.error('Error fetching auction:', error);
    res.status(500).json({ error: 'Failed to fetch auction' });
  }
});

app.get('/api/bids/auction/:auctionId', async (req, res) => {
  try {
    const auctionId = parseInt(req.params.auctionId, 10);
    const bids = await getBidsByAuctionId(auctionId);
    res.json(bids);
  } catch (error) {
    console.error('Error fetching bids:', error);
    res.status(500).json({ error: 'Failed to fetch bids' });
  }
});

const io = initializeSocketIO(httpServer);

app.post('/api/bids', async (req, res) => {
  try {
    const { auctionId, userId, amount } = req.body;
    
    if (!auctionId || !userId || !amount) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const bid = await createBid(auctionId, userId, amount);

    const bids = await getBidsByAuctionId(auctionId);
    const auction = await getAuctionById(auctionId);
    const room = `auction_${auctionId}`;
    
    io.to(room).emit('bids_update', { auctionId, bids });
    if (auction) {
      io.to(room).emit('auction_update', { auction });
    }
    
    res.json(bid);
  } catch (error) {
    console.error('Error creating bid:', error);
    res.status(400).json({ error: error.message || 'Failed to create bid' });
  }
});

export { io };

const PORT = process.env.PORT || 3001;
httpServer.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  if (process.env.MOCK_DB === '1') {
    console.log('🧪 MOCK_DB=1: using in-memory fake data from __mocks__/mockDb.ts');
  } else {
    console.log('ℹ️  MOCK_DB not set: will try MySQL first, and fall back to mocks on DB errors');
  }
});
