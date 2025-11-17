import db from '$/db/database';
import { auctions, categories, item_images, item_instances, items, watch_details } from '$/db/schema';
import { and, eq, isNotNull, or } from 'drizzle-orm';

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