ALTER TABLE "ChannelGroupsOnChannels" DROP CONSTRAINT "ChannelGroupsOnChannels_channelId_fkey";
ALTER TABLE "Video" DROP CONSTRAINT "Video_channelId_fkey";

CREATE UNIQUE INDEX "Channel_id_key" ON "Channel"("id");
ALTER TABLE "Channel" DROP CONSTRAINT "Channel_pkey";

ALTER TABLE "ChannelGroupsOnChannels" ADD CONSTRAINT "ChannelGroupsOnChannels_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "Channel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "Video" ADD CONSTRAINT "Video_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "Channel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;