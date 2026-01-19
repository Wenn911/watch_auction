import { Server as SocketIOServer } from 'socket.io';
import { createBid, getBidsByAuctionId, getAuctionById } from './api.js';

let io = null;

export function initializeSocketIO(httpServer) {
  if (io) return io;

  io = new SocketIOServer(httpServer, {
    cors: {
      origin: process.env.NODE_ENV === 'production' 
        ? process.env.FRONTEND_URL 
        : 'http://localhost:3000',
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    console.log('🟢 Client connected:', socket.id);

    socket.on('subscribe_auction', async (data) => {
      try {
        const { auctionId } = data;
        const room = `auction_${auctionId}`;
        socket.join(room);
        console.log(`Client ${socket.id} joined room: ${room}`);

        const bids = await getBidsByAuctionId(auctionId);
        socket.emit('bids_update', { auctionId, bids });

        const auction = await getAuctionById(auctionId);
        if (auction) {
          socket.emit('auction_update', { auction });
        }
      } catch (error) {
        socket.emit('error', { message: error instanceof Error ? error.message : 'Unknown error' });
      }
    });

    socket.on('unsubscribe_auction', (data) => {
      const { auctionId } = data;
      const room = `auction_${auctionId}`;
      socket.leave(room);
      console.log(`Client ${socket.id} left room: ${room}`);
    });

    socket.on('get_bids', async (data) => {
      try {
        const { auctionId } = data;
        const bids = await getBidsByAuctionId(auctionId);
        socket.emit('bids_data', { auctionId, bids });
      } catch (error) {
        socket.emit('error', { message: error instanceof Error ? error.message : 'Unknown error' });
      }
    });

    socket.on('create_bid', async (data) => {
      try {
        const { auctionId, userId, amount } = data;

        const newBid = await createBid(auctionId, userId, amount);

        if (newBid) {
          const bids = await getBidsByAuctionId(auctionId);
          const auction = await getAuctionById(auctionId);

          const room = `auction_${auctionId}`;
          io.to(room).emit('bids_update', { auctionId, bids });
          
          if (auction) {
            io.to(room).emit('auction_update', { auction });
          }

          socket.emit('bid_created', { bid: newBid });
        } else {
          socket.emit('error', { message: 'Failed to create bid' });
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        socket.emit('error', { message: errorMessage });
        console.error('Error creating bid:', error);
      }
    });

    socket.on('disconnect', () => {
      console.log('🔴 Client disconnected:', socket.id);
    });

    socket.on('error', (error) => {
      console.error('Socket error:', error);
    });
  });

  return io;
}

export function getSocketIO() {
  if (!io) {
    throw new Error('Socket.IO not initialized');
  }
  return io;
}
