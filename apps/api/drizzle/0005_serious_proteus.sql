CREATE TABLE `users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`userName` text DEFAULT 'ユーザー',
	`email` text NOT NULL,
	`passwordHash` text NOT NULL,
	`createdAt` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	`updatedAt` integer DEFAULT (unixepoch() * 1000) NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);--> statement-breakpoint
CREATE TABLE `bloodline` (
	`bloodlineId` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`cattleId` integer NOT NULL,
	`fatherCattleName` text,
	`motherFatherCattleName` text,
	`motherGrandFatherCattleName` text,
	`motherGreatGrandFatherCattleName` text,
	FOREIGN KEY (`cattleId`) REFERENCES `cattle`(`cattleId`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `cattle` (
	`cattleId` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`ownerUserId` integer NOT NULL,
	`identificationNumber` integer NOT NULL,
	`earTagNumber` text,
	`name` text,
	`growthStage` text,
	`birthday` text,
	`age` integer,
	`monthsOld` integer,
	`daysOld` integer,
	`gender` text,
	`score` integer,
	`breed` text,
	`healthStatus` text,
	`producerName` text,
	`barn` text,
	`breedingValue` text,
	`notes` text,
	`createdAt` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	`updatedAt` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	FOREIGN KEY (`ownerUserId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `mother_info` (
	`motherInfoId` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`cattleId` integer NOT NULL,
	`motherCattleId` integer NOT NULL,
	`motherName` text,
	`motherIdentificationNumber` text,
	`motherScore` integer,
	FOREIGN KEY (`cattleId`) REFERENCES `cattle`(`cattleId`) ON UPDATE no action ON DELETE no action
);
