import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { users } from "./users";

export const cattle = sqliteTable("cattle", {
  cattleId: integer("cattleId", { mode: "number" }).primaryKey({
    autoIncrement: true,
  }),
  // users(id)への外部キー参照
  ownerUserId: integer("ownerUserId", { mode: "number" })
    .references(() => users.id)
    .notNull(),
  // 個体識別番号
  identificationNumber: integer("identificationNumber", {
    mode: "number",
  }).notNull(),
  // 耳標番号
  earTagNumber: text("earTagNumber"),
  // 名号
  name: text("name"),
  // 成長段階
  growthStage: text("growthStage", {
    enum: ["仔牛", "育成牛", "肥育牛", "成牛"],
  }),
  // 出生日
  birthday: text("birthday"),
  // 年齢
  age: integer("age", { mode: "number" }),
  // 月齢
  monthsOld: integer("monthsOld", { mode: "number" }),
  // 日齢
  daysOld: integer("daysOld", { mode: "number" }),
  // 性別
  gender: text("gender"),
  // 得点
  score: integer("score", { mode: "number" }),
  // 品種
  breed: text("breed"),
  // 健康状態
  healthStatus: text("healthStatus"),
  // 生産者
  producerName: text("producerName"),
  // 牛舎
  barn: text("barn"),
  // 育種価
  breedingValue: text("breedingValue"),
  // 備考
  notes: text("notes"),
  // 登録日時
  createdAt: integer("createdAt", { mode: "timestamp_ms" })
    .notNull()
    .default(sql`(unixepoch() * 1000)`),
  // 更新日時
  updatedAt: integer("updatedAt", { mode: "timestamp_ms" })
    .notNull()
    .default(sql`(unixepoch() * 1000)`),
});

// 血統情報
export const bloodline = sqliteTable("bloodline", {
  bloodlineId: integer("bloodlineId", { mode: "number" }).primaryKey({
    autoIncrement: true,
  }),
  // 紐づけ対象の個体
  cattleId: integer("cattleId", { mode: "number" })
    .references(() => cattle.cattleId)
    .notNull(),
  // 父
  fatherCattleName: text("fatherCattleName"),
  // 母の父
  motherFatherCattleName: text("motherFatherCattleName"),
  // 母の祖父
  motherGrandFatherCattleName: text("motherGrandFatherCattleName"),
  // 母の祖祖父
  motherGreatGrandFatherCattleName: text("motherGreatGrandFatherCattleName"),
});

// 母情報
export const motherInfo = sqliteTable("mother_info", {
  motherInfoId: integer("motherInfoId", { mode: "number" }).primaryKey({
    autoIncrement: true,
  }),
  // 子の個体ID
  cattleId: integer("cattleId", { mode: "number" })
    .references(() => cattle.cattleId)
    .notNull(),
  // 実際の母(=cattleテーブル)を参照するID
  motherCattleId: integer("motherCattleId", { mode: "number" }).notNull(),
  // 母の名号
  motherName: text("motherName"),
  // 母の個体識別番号
  motherIdentificationNumber: text("motherIdentificationNumber"),
  // 母の得点
  motherScore: integer("motherScore", { mode: "number" }),
});
