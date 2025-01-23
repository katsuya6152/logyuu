CREATE TABLE `events` (
	`eventId` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`cattleId` integer NOT NULL,
	`eventType` text NOT NULL,
	`eventDatetime` integer NOT NULL,
	`notes` text,
	`createdAt` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	`updatedAt` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	FOREIGN KEY (`cattleId`) REFERENCES `cattle`(`cattleId`) ON UPDATE no action ON DELETE no action
);
