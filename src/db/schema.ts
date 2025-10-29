import { mysqlTable, int, varchar, timestamp } from 'drizzle-orm/mysql-core';

export const watches = mysqlTable('watches', {
  id: int('id').primaryKey().autoincrement(),
  name: varchar('name', { length: 255 }).notNull(),
  price: varchar('price', { length: 255 }).notNull(),
  startTime: varchar('startTime', { length: 255 }).notNull(),
  image: varchar('image', { length: 255 }).notNull(),
  //   bidInterval: int("bidInterval").notNull().default(100),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow(),
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