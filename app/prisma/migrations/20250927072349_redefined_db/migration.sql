/*
  Warnings:

  - You are about to drop the column `movieId` on the `Review` table. All the data in the column will be lost.
  - You are about to alter the column `rating` on the `Review` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to drop the `Actor` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Genre` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Movie` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_MovieActors` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_MovieGenres` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_UserFavourites` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_UserWatchlist` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userId,tmdbId]` on the table `Review` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `tmdbId` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Review" DROP CONSTRAINT "Review_movieId_fkey";

-- DropForeignKey
ALTER TABLE "public"."_MovieActors" DROP CONSTRAINT "_MovieActors_A_fkey";

-- DropForeignKey
ALTER TABLE "public"."_MovieActors" DROP CONSTRAINT "_MovieActors_B_fkey";

-- DropForeignKey
ALTER TABLE "public"."_MovieGenres" DROP CONSTRAINT "_MovieGenres_A_fkey";

-- DropForeignKey
ALTER TABLE "public"."_MovieGenres" DROP CONSTRAINT "_MovieGenres_B_fkey";

-- DropForeignKey
ALTER TABLE "public"."_UserFavourites" DROP CONSTRAINT "_UserFavourites_A_fkey";

-- DropForeignKey
ALTER TABLE "public"."_UserFavourites" DROP CONSTRAINT "_UserFavourites_B_fkey";

-- DropForeignKey
ALTER TABLE "public"."_UserWatchlist" DROP CONSTRAINT "_UserWatchlist_A_fkey";

-- DropForeignKey
ALTER TABLE "public"."_UserWatchlist" DROP CONSTRAINT "_UserWatchlist_B_fkey";

-- AlterTable
ALTER TABLE "public"."Review" DROP COLUMN "movieId",
ADD COLUMN     "tmdbId" INTEGER NOT NULL,
ALTER COLUMN "rating" SET DATA TYPE INTEGER;

-- DropTable
DROP TABLE "public"."Actor";

-- DropTable
DROP TABLE "public"."Genre";

-- DropTable
DROP TABLE "public"."Movie";

-- DropTable
DROP TABLE "public"."_MovieActors";

-- DropTable
DROP TABLE "public"."_MovieGenres";

-- DropTable
DROP TABLE "public"."_UserFavourites";

-- DropTable
DROP TABLE "public"."_UserWatchlist";

-- CreateTable
CREATE TABLE "public"."Favourite" (
    "id" SERIAL NOT NULL,
    "tmdbId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Favourite_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Watchlist" (
    "id" SERIAL NOT NULL,
    "tmdbId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Watchlist_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Review_userId_tmdbId_key" ON "public"."Review"("userId", "tmdbId");

-- AddForeignKey
ALTER TABLE "public"."Favourite" ADD CONSTRAINT "Favourite_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Watchlist" ADD CONSTRAINT "Watchlist_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
