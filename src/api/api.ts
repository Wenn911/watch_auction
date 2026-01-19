import db from '$/db/database';
import { auctions, bids, categories, item_images, item_instances, items, watch_details } from '$/db/schema';
import { and, desc, eq, isNotNull, or } from 'drizzle-orm';

export async function getActiveItems() {
    try {
        const allItemsFromActiveAuctions = await db.select().from(auctions)
            .innerJoin(item_instances, eq(auctions.instance_id, item_instances.id_instance))
            .innerJoin(items, eq(item_instances.item_id, items.id_item))
            .innerJoin(categories, eq(items.category_id, categories.id_category))
            .where(or(eq(auctions.status, 'active'), eq(auctions.status, 'pending')));

        return allItemsFromActiveAuctions;
    } catch (error) {
        console.error('Error fetching watches:', error);
        return [];
    }
}

export async function getItemCard(id: number) {
    try {

        if (!id || isNaN(id) || id <= 0) {
            return null;
        }

        const instance = await db.select().from(item_instances)
            .innerJoin(items, eq(item_instances.item_id, items.id_item))
            .innerJoin(watch_details, eq(watch_details.instance_id, item_instances.id_instance))
            .innerJoin(categories, eq(items.category_id, categories.id_category))
            .where(eq(item_instances.id_instance, id))

        if (instance.length === 0) {
            return null;
        }
        
        return instance[0];

    } catch (error) {
        console.error('Error fetching watches:', error);
    }
}

export async function getItems() {
    try {
        const allItems = await db.select().from(items);

        return allItems;
    } catch (error) {
        console.error('Error fetching watches:', error);
        return [];
    }
}

export async function getItemImages(id: number) {
    try {
        
        if (!id || isNaN(id) || id <= 0) {
            return null;
        }

        const itemQuery = await db.select({ item_id: items.id_item }).from(auctions)
            .innerJoin(item_instances, eq(auctions.instance_id, item_instances.id_instance))
            .innerJoin(items, eq(item_instances.item_id, items.id_item))
            .where(eq(auctions.id_auction, id))

        if (!itemQuery.length) return [];

        const itemIdIm = itemQuery[0].item_id

        const mainImageQuery = await db.select({ image: items.image }).from(items).where(and(eq(items.id_item, itemIdIm), isNotNull(items.image)));

        const itemImagesQuery = await db.select().from(item_images).where(eq(item_images.item_id, itemIdIm));

        const mainImage = mainImageQuery.map((im) => im.image);

        const itemImages = itemImagesQuery.map((image) => image.images);
        
        if (itemImages.length === 0 && mainImage.length === 0) {
            return [];
        }
        
        const allImagesArray = [...mainImage, ...itemImages];
        
        return allImagesArray;

    } catch (error) {
        console.error('Error fetching watches:', error);
        return [];
    }
    
}

export async function getAuctionByItemId(itemId: number) {
    try {
        if (!itemId || isNaN(itemId) || itemId <= 0) {
            return null;
        }

        const auction = await db.select({ auctions })
            .from(auctions)
            .innerJoin(item_instances, eq(auctions.instance_id, item_instances.id_instance))
            .innerJoin(items, eq(item_instances.item_id, items.id_item))
            .where(eq(items.id_item, itemId));

        if (auction.length === 0) {
            return null;
        }

        return auction[0].auctions;
    } catch (error) {
        console.error('Error fetching auction:', error);
        return null;
    }
}

export async function getBidsByAuctionId(auctionId: number) {
    try {
        if (!auctionId || isNaN(auctionId) || auctionId <= 0) {
            return [];
        }

        const allBids = await db.select().from(bids)
            .where(eq(bids.auction_id, auctionId))
            .orderBy(desc(bids.createdAt));

        return allBids;
    } catch (error) {
        console.error('Error fetching bids:', error);
        return [];
    }
}

export async function getAuctionById(auctionId: number) {
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
        console.error('Error fetching auction:', error);
        return null;
    }
}

export async function createBid(auctionId: number, userId: string, amount: number) {
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
        console.error('Error creating bid:', error);
        throw error;
    }
}