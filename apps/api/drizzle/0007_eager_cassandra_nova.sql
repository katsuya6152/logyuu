CREATE TABLE `breeding_status` (
	`breedingStatusId` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`cattleId` integer NOT NULL,
	`parity` integer,
	`expectedCalvingDate` text,
	`scheduledPregnancyCheckDate` text,
	`daysAfterCalving` integer,
	`daysOpen` integer,
	`pregnancyDays` integer,
	`daysAfterInsemination` integer,
	`inseminationCount` integer,
	`breedingMemo` text,
	`isDifficultBirth` integer,
	`createdAt` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	`updatedAt` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	FOREIGN KEY (`cattleId`) REFERENCES `cattle`(`cattleId`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `breeding_summary` (
	`breedingSummaryId` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`cattleId` integer NOT NULL,
	`totalInseminationCount` integer,
	`averageDaysOpen` integer,
	`averagePregnancyPeriod` integer,
	`averageCalvingInterval` integer,
	`difficultBirthCount` integer,
	`pregnancyHeadCount` integer,
	`pregnancySuccessRate` integer,
	`createdAt` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	`updatedAt` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	FOREIGN KEY (`cattleId`) REFERENCES `cattle`(`cattleId`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_cattle` (
	`cattleId` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`ownerUserId` integer NOT NULL,
	`identificationNumber` integer NOT NULL,
	`earTagNumber` integer,
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
INSERT INTO `__new_cattle`("cattleId", "ownerUserId", "identificationNumber", "earTagNumber", "name", "growthStage", "birthday", "age", "monthsOld", "daysOld", "gender", "score", "breed", "healthStatus", "producerName", "barn", "breedingValue", "notes", "createdAt", "updatedAt") SELECT "cattleId", "ownerUserId", "identificationNumber", "earTagNumber", "name", "growthStage", "birthday", "age", "monthsOld", "daysOld", "gender", "score", "breed", "healthStatus", "producerName", "barn", "breedingValue", "notes", "createdAt", "updatedAt" FROM `cattle`;--> statement-breakpoint
DROP TABLE `cattle`;--> statement-breakpoint
ALTER TABLE `__new_cattle` RENAME TO `cattle`;--> statement-breakpoint
PRAGMA foreign_keys=ON;