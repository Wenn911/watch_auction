import {int, mysqlEnum, mysqlTable, timestamp, varchar} from 'drizzle-orm/mysql-core';
import {decimal} from "drizzle-orm/pg-core";

export const itemConditionEnum = mysqlEnum('item_condition', ['New', 'Used', 'Unworn']); // enum for item_condition

export const statusEnum = mysqlEnum('status', ['active', 'ended', 'pending', 'cancelled']);

export const categories = mysqlTable('categories', {
    id_category: int('id_category').primaryKey().autoincrement(),
    name_category: varchar('name_category', {length: 255}).notNull().unique(),
});

export const items = mysqlTable('items', {
    id_item: int('id_item').primaryKey().autoincrement(),
    category_id: int('category_id').notNull()
        .references(() => categories.id_category, {onDelete: 'cascade'}),
    refCode: varchar('refCode', {length: 255}).notNull(),
    brand_name: varchar('brand_name', {length: 255}).notNull(),
    model: varchar('model', {length: 255}).notNull(),
    item_condition: itemConditionEnum.notNull(),
    material: varchar('material', {length: 255}).notNull(),
    productionYear: int('production_year').notNull(),
    image: varchar('image', { length: 255 }).notNull(),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow().onUpdateNow(),
})

export const auctions = mysqlTable('auctions', {
    id_auction: int('id_auction').primaryKey().autoincrement(),
    item_id: int('id_item').notNull()
        .references(() => items.id_item, {onDelete: 'cascade'}),
    start_price: decimal('start_price', {precision: 10, scale: 2}).notNull(),
    current_price: decimal('current_price', {precision: 10, scale: 2}),
    start_time: timestamp('start_time').notNull(),
    end_time: timestamp('end_time').notNull(),
    status: statusEnum.notNull().default('pending'),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow().onUpdateNow(),
})

export const watch_details = mysqlTable('watch_details', {
    id_watch_detail: int('id_watch_detail').primaryKey().autoincrement(),
    item_id: int('id_item').notNull()
        .references(() => items.id_item, {onDelete: 'cascade'}),
    crystal: varchar('crystal', {length: 255}).notNull(),
    dial: varchar('dial', {length: 255}).notNull(),
    diameter: varchar('diameter', {length: 20}).notNull(),
    movement: varchar('movement', {length: 255}),
    country: varchar('country', {length: 255}).notNull(),
    accessories: varchar('accessories', {length: 255}).notNull(),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow().onUpdateNow(),
})

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

export type Category = typeof categories.$inferSelect;
export type Item = typeof items.$inferSelect;
export type Auction = typeof auctions.$inferSelect;
export type Watch_detail = typeof watch_details.$inferSelect;
export type Watch = typeof watches.$inferSelect;
export type Bid = typeof bids.$inferSelect;

export type Status = typeof auctions.$inferSelect.status;
export type ItemCondition = typeof items.$inferSelect.itemCondition;

