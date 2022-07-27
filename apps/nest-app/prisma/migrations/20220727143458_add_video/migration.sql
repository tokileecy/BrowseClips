-- CreateTable
CREATE TABLE "Video" (
    "id" TEXT NOT NULL,
    "channelId" TEXT NOT NULL,
    "title" TEXT DEFAULT E'',
    "description" TEXT DEFAULT E'',
    "publishedAt" TIMESTAMP(3),
    "thumbnails" JSONB,
    "status" JSONB,
    "statistics" JSONB,
    "liveStreamingDetails" JSONB,
    "contentDetails" JSONB,
    "tags" TEXT[]
);

-- CreateIndex
CREATE UNIQUE INDEX "Video_id_key" ON "Video"("id");

-- AddForeignKey
ALTER TABLE "Video" ADD CONSTRAINT "Video_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "Channel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
