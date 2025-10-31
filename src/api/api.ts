import { eq } from "drizzle-orm";

import db from "$/db/database";
import { watches } from "$/db/schema";

export async function getWatches() {
    try {
        const allWatches = await db
            .select()
            .from(watches);

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
