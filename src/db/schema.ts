import { decimal, int, mysqlEnum, mysqlTable, timestamp, varchar } from 'drizzle-orm/mysql-core';

export const itemConditionEnum = mysqlEnum('item_condition', ['New', 'Used', 'Unworn']); // enum for item_condition

export const statusEnum = mysqlEnum('status', ['active', 'ended', 'pending', 'cancelled']);

export const categories = mysqlTable('categories', {
    id_category: int('id_category').primaryKey().autoincrement(),
    name_category: varchar('name_category', { length: 255 }).notNull().unique(),
    createdAt: timestamp('createdAt').defaultNow(),
});

export const items = mysqlTable('items', {
    id_item: int('id_item').primaryKey().autoincrement(),
    category_id: int('category_id')
        .notNull()
        .references(() => categories.id_category, { onDelete: 'cascade' }),
    brand_name: varchar('brand_name', { length: 255 }).notNull(),
    model: varchar('model', { length: 255 }).notNull(),
    material: varchar('material', { length: 255 }).notNull(),
    image: varchar('image', { length: 255 }).notNull(),
    createdAt: timestamp('createdAt').defaultNow(),
    updatedAt: timestamp('updatedAt').defaultNow().onUpdateNow(),
});

export const item_instances = mysqlTable('item_instances', {
    id_instance: int('id_instance').primaryKey().autoincrement(),
    item_id: int('item_id')
        .notNull()
        .references(() => items.id_item, { onDelete: 'cascade', onUpdate: 'cascade'}),
    refCode: varchar('refCode', { length: 255 }).notNull(),
    productionYear: int('productionYear').notNull(),
    item_condition: itemConditionEnum.notNull(),
})

export const auctions = mysqlTable('auctions', {
    id_auction: int('id_auction').primaryKey().autoincrement(),
    instance_id: int('instance_id')
        .notNull()
        .references(() => item_instances.id_instance, { onDelete: 'cascade', onUpdate: 'cascade' }),
    start_price: decimal('start_price', { precision: 10, scale: 2 }).notNull(),
    current_price: decimal('current_price', { precision: 10, scale: 2 }),
    start_time: timestamp('start_time').notNull(),
    end_time: timestamp('end_time').notNull(),
    status: statusEnum.notNull().default('pending'),
    createdAt: timestamp('createdAt').defaultNow(),
    updatedAt: timestamp('updatedAt').defaultNow().onUpdateNow(),
});

export const watch_details = mysqlTable('watch_details', {
    id_watch_detail: int('id_watch_detail').primaryKey().autoincrement(),
    instance_id: int('instance_id')
        .notNull()
        .references(() => item_instances.id_instance, { onDelete: 'cascade', onUpdate: 'cascade' }),
    crystal: varchar('crystal', { length: 255 }).notNull(),
    dial: varchar('dial', { length: 255 }).notNull(),
    diameter: varchar('diameter', { length: 20 }).notNull(),
    movement: varchar('movement', { length: 255 }).notNull(),
    country: varchar('country', { length: 255 }).notNull(),
    accessories: varchar('accessories', { length: 255 }).notNull(),
    createdAt: timestamp('createdAt').defaultNow(),
    updatedAt: timestamp('updatedAt').defaultNow().onUpdateNow(),
});

export const item_images = mysqlTable('item_images', {
    id_image: int('id_image').primaryKey().autoincrement(),
    item_id: int('item_id')
        .notNull()
        .references(() => items.id_item, { onDelete: 'cascade' }),
    images: varchar('images', { length: 255 }).notNull()
})

export const bids = mysqlTable('bids', {
    id_bid: int('id_bid').primaryKey().autoincrement(),
    auction_id: int('auction_id')
        .notNull()
        .references(() => auctions.id_auction, { onDelete: 'cascade' }),
    user_id: varchar('user_id', { length: 255 }).notNull(), // Telegram user ID или другой идентификатор
    amount: decimal('amount', { precision: 10, scale: 2 }).notNull(),
    createdAt: timestamp('createdAt').defaultNow(),
});

export type Category = typeof categories.$inferSelect;
export type Item = typeof items.$inferSelect;
export type Auction = typeof auctions.$inferSelect;
export type Watch_detail = typeof watch_details.$inferSelect;
export type Item_image = typeof item_images.$inferSelect;
export type Item_instance = typeof item_instances.$inferSelect;
export type Bid = typeof bids.$inferSelect;

export type Status = typeof auctions.$inferSelect.status;
export type ItemCondition = typeof item_instances.$inferSelect.item_condition;