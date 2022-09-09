ALTER TABLE "ChannelGroupsOnChannels" DROP CONSTRAINT "ChannelGroupsOnChannels_channelId_fkey";
ALTER TABLE "Video" DROP CONSTRAINT "Video_channelId_fkey";

ALTER TABLE "Channel" ADD CONSTRAINT "Channel_pkey" PRIMARY KEY ("id");
DROP INDEX "Channel_id_key";

ALTER TABLE "ChannelGroupsOnChannels" ADD CONSTRAINT "ChannelGroupsOnChannels_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "Channel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "Video" ADD CONSTRAINT "Video_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "Channel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;