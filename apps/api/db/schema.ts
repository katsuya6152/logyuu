import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

// 初期テストのためのスキーマのため後ほど削除
export const todos = sqliteTable("todos", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  completed: integer("completed").notNull().default(0),
});

export * from "./tables/users";
export * from "./tables/cattle";
