import db from '$/db/database';
import { auctions, categories, item_images, items, watch_details } from '$/db/schema';
import { and, eq, isNotNull } from 'drizzle-orm';

export async function getActiveItems() {
    try {
        const allItemsFromActiveAuctions = await db.select().from(auctions)
            .innerJoin(items, eq(auctions.item_id, items.id_item))
            .innerJoin(categories, eq(items.category_id, categories.id_category));

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

        const item = await db.select().from(items)
            .innerJoin(watch_details, eq(items.id_item, watch_details.item_id))
            .innerJoin(categories, eq(items.category_id, categories.id_category))
            .where(eq(items.id_item, id));

        if (item.length === 0) {
            return null;
        }
        
        return item[0];

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
        console.error('Error fetching watches:', error);
        return [];
    }
    
}