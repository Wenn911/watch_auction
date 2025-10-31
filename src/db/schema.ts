import { int, mysqlTable, timestamp, varchar } from 'drizzle-orm/mysql-core';

export const watches = mysqlTable('watches', {
    id: int('id').primaryKey().autoincrement(),
    name: varchar('name', { length: 255 }).notNull(),
    model: varchar('model', { length: 255 }).notNull(),
    price: varchar('price', { length: 255 }).notNull(),
    startTime: varchar('startTime', { length: 255 }),
    endTime: varchar('endTime', { length: 255 }),
    image: varchar('image', { length: 255 }).notNull(),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow().onUpdateNow(),
    refCode: varchar('refCode', { length: 255 }).notNull(),
});

export const bids = mysqlTable("bids", {
    id: int("id").primaryKey().autoincrement(),
    amount: int("amount").notNull(),
    itemId: int("itemId")
        .notNull()
        .references(() => watches.id, { onDelete: "cascade" }),
    timestamp: timestamp("timestamp", { mode: "date" }).notNull(),
});

export type Watch = typeof watches.$inferSelect;
export type Bid = typeof bids.$inferSelect;
