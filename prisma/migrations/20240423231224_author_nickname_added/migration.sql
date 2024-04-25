/*
  Warnings:

  - A unique constraint covering the columns `[nickname]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE `notes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(63) NOT NULL,
    `content` VARCHAR(127) NOT NULL,
    `authorNickname` VARCHAR(191) NOT NULL,
    `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `users_nickname_key` ON `users`(`nickname`);

-- AddForeignKey
ALTER TABLE `notes` ADD CONSTRAINT `notes_authorNickname_fkey` FOREIGN KEY (`authorNickname`) REFERENCES `users`(`nickname`) ON DELETE RESTRICT ON UPDATE CASCADE;
