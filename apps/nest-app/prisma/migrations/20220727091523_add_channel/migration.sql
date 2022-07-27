-- CreateTable
CREATE TABLE "Channel" (
    "id" TEXT NOT NULL,
    "title" TEXT DEFAULT E'',
    "description" TEXT DEFAULT E'',
    "country" TEXT DEFAULT E'',
    "publishedAt" TIMESTAMP(3),
    "thumbnails" JSONB
);

-- CreateIndex
CREATE UNIQUE INDEX "Channel_id_key" ON "Channel"("id");
