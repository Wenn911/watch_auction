import { eq } from 'drizzle-orm';
import db from '$/db/database';
import { watches } from '$/db/schema';
import { items } from '$/db/schema';
import { auctions } from '$/db/schema';
import { categories } from '$/db/schema';
import { watch_details } from '../db/schema.ts';

export async function getActiveItems() {
    try {
        const allItemsFromActiveAuctions = await db.select().from(auctions).innerJoin(items, eq(auctions.item_id, items.id_item))
            .innerJoin(categories, eq(items.category_id, categories.id_category));

        return allItemsFromActiveAuctions;
    } catch (error) {
        console.error('Error fetching watches:', error);
        return [];
    }
}

export async function getItemCard(id: number) {
    try {
        const item = await db.select().from(items).innerJoin(watch_details, eq(items.id_item, watch_details.item_id))
            .innerJoin(categories, eq(items.category_id, categories.id_category))
            .where(eq(items.id_item, id));

        return item;
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

export async function getWatches() {
    try {
        const allWatches = await db.select().from(watches);

        return allWatches;
    } catch (error) {
        console.error('Error fetching watches:', error);
        return [];
    }
}

export async function getWatch(id: number) {
    try {
        const watch = await db.query.watches.findFirst({
            where: eq(watches.id, id),
        });

        return watch;
    } catch (error) {
        console.error('Error fetching watches:', error);
    }
}
