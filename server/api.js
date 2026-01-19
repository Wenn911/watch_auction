import { and, desc, eq, isNotNull } from 'drizzle-orm';
import { mockDb } from '../__mocks__/mockDb.ts';
import db from '../src/db/database.ts';
import { auctions, bids, categories, item_images, items, watch_details } from '../src/db/schema.ts';

const shouldUseMock = () => process.env.MOCK_DB === '1';

export async function getActiveItems() {
  if (shouldUseMock()) {
    return await mockDb.getActiveItems();
  }
  try {
    const allItemsFromActiveAuctions = await db.select().from(auctions)
      .innerJoin(items, eq(auctions.item_id, items.id_item))
      .innerJoin(categories, eq(items.category_id, categories.id_category));

    return allItemsFromActiveAuctions;
  } catch (error) {
    console.warn('DB error in getActiveItems, falling back to mockDb:', error);
    return await mockDb.getActiveItems();
  }
}

export async function getItemCard(id) {
  if (shouldUseMock()) {
    return await mockDb.getItemCard(id);
  }
  try {
    if (!id || isNaN(id) || id <= 0) {
      return null;
    }

    const item = await db.select().from(items)
      .innerJoin(watch_details, eq(items.id_item, watch_details.item_id))
      .innerJoin(categories, eq(items.category_id, categories.id_category))
      .where(eq(items.id_item, id));

    if (item.length === 0) {
      return null;
    }
    
    return item[0];
  } catch (error) {
    console.warn('DB error in getItemCard, falling back to mockDb:', error);
    return await mockDb.getItemCard(id);
  }
}

export async function getItems() {
  if (shouldUseMock()) {
    const active = await mockDb.getActiveItems();
    return active.map((x) => x.items);
  }
  try {
    const allItems = await db.select().from(items);
    return allItems;
  } catch (error) {
    console.warn('DB error in getItems, falling back to mockDb:', error);
    const active = await mockDb.getActiveItems();
    return active.map((x) => x.items);
  }
}

export async function getItemImages(id) {
  if (shouldUseMock()) {
    return await mockDb.getItemImages(id);
  }
  try {
    if (!id || isNaN(id) || id <= 0) {
      return null;
    }
    const mainImageQuery = await db.select({ image: items.image }).from(items).where(and(eq(items.id_item, id), isNotNull(items.image)));

    const itemImagesQuery = await db.select().from(item_images).where(eq(item_images.item_id, id));

    const mainImage = mainImageQuery.map((im) => im.image);

    const itemImages = itemImagesQuery.map((image) => image.images);
    
    if (itemImages.length === 0 && mainImage.length === 0) {
      return [];
    }
    
    const allImagesArray = [...mainImage, ...itemImages];
    
    return allImagesArray;
  } catch (error) {
    console.warn('DB error in getItemImages, falling back to mockDb:', error);
    return await mockDb.getItemImages(id);
  }
}

export async function getAuctionByItemId(itemId) {
  if (shouldUseMock()) {
    return await mockDb.getAuctionByItemId(itemId);
  }
  try {
    if (!itemId || isNaN(itemId) || itemId <= 0) {
      return null;
    }

    const auction = await db.select().from(auctions).where(eq(auctions.item_id, itemId));

    if (auction.length === 0) {
      return null;
    }

    return auction[0];
  } catch (error) {
    console.warn('DB error in getAuctionByItemId, falling back to mockDb:', error);
    return await mockDb.getAuctionByItemId(itemId);
  }
}

export async function getAuctionById(auctionId) {
  if (shouldUseMock()) {
    return await mockDb.getAuctionById(auctionId);
  }
  try {
    if (!auctionId || isNaN(auctionId) || auctionId <= 0) {
      return null;
    }

    const auction = await db.select().from(auctions).where(eq(auctions.id_auction, auctionId));

    if (auction.length === 0) {
      return null;
    }

    return auction[0];
  } catch (error) {
    console.warn('DB error in getAuctionById, falling back to mockDb:', error);
    return await mockDb.getAuctionById(auctionId);
  }
}

export async function getBidsByAuctionId(auctionId) {
  if (shouldUseMock()) {
    return await mockDb.getBidsByAuctionId(auctionId);
  }
  try {
    if (!auctionId || isNaN(auctionId) || auctionId <= 0) {
      return [];
    }

    const allBids = await db.select().from(bids)
      .where(eq(bids.auction_id, auctionId))
      .orderBy(desc(bids.createdAt));

    return allBids;
  } catch (error) {
    console.warn('DB error in getBidsByAuctionId, falling back to mockDb:', error);
    return await mockDb.getBidsByAuctionId(auctionId);
  }
}

export async function createBid(auctionId, userId, amount) {
  if (shouldUseMock()) {
    return await mockDb.createBid(Number(auctionId), String(userId), Number(amount));
  }
  try {
    if (!auctionId || isNaN(auctionId) || auctionId <= 0) {
      throw new Error('Invalid auction ID');
    }

    if (!userId || userId.trim() === '') {
      throw new Error('Invalid user ID');
    }

    if (!amount || amount <= 0) {
      throw new Error('Invalid bid amount');
    }

    const auction = await getAuctionById(auctionId);
    if (!auction) {
      throw new Error('Auction not found');
    }

    if (auction.status !== 'active') {
      throw new Error('Auction is not active');
    }

    const currentPrice = auction.current_price ? parseFloat(auction.current_price.toString()) : parseFloat(auction.start_price.toString());
    if (amount <= currentPrice) {
      throw new Error('Bid amount must be greater than current price');
    }

    await db.insert(bids).values({
      auction_id: auctionId,
      user_id: userId,
      amount: amount.toString(),
    });

    await db.update(auctions)
      .set({ 
        current_price: amount.toString(),
        updatedAt: new Date()
      })
      .where(eq(auctions.id_auction, auctionId));

    const createdBid = await db.select().from(bids)
      .where(eq(bids.auction_id, auctionId))
      .orderBy(desc(bids.createdAt))
      .limit(1);

    return createdBid[0] || null;
  } catch (error) {
    console.warn('DB error in createBid, falling back to mockDb:', error);
    return await mockDb.createBid(Number(auctionId), String(userId), Number(amount));
  }
}
