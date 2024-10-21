import { serial, text, timestamp, pgTable, integer } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name"),
  username: text("username"),
  password: text("password"),

  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .$onUpdate(() => new Date()),
});

export const postTable = pgTable("posts", {
  id: serial("id").primaryKey(),
  user_id: integer("user_id").references(() => usersTable.id),
  title: text("title"),
  content: text("content"),

  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .$onUpdate(() => new Date()),
});

export const commentTable = pgTable("comments", {
  id: serial("id").primaryKey(),
  user_id: integer("user_id").references(() => usersTable.id),
  post_id: integer("post_id").references(() => postTable.id),
  comment: text("comment"),

  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .$onUpdate(() => new Date()),
});

export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;

export type InsertPost = typeof postTable.$inferInsert;
export type SelectPost = typeof postTable.$inferSelect;

export type InsertComment = typeof commentTable.$inferInsert;
export type SelectComment = typeof commentTable.$inferSelect;
