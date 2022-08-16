-- CreateTable
CREATE TABLE "ChannelGroup" (
    "id" SERIAL NOT NULL,
    "name" TEXT,

    CONSTRAINT "ChannelGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChannelGroupsOnChannels" (
    "channelId" TEXT NOT NULL,
    "channelGroupId" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ChannelGroupsOnChannels_pkey" PRIMARY KEY ("channelGroupId","channelId")
);

-- AddForeignKey
ALTER TABLE "ChannelGroupsOnChannels" ADD CONSTRAINT "ChannelGroupsOnChannels_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "Channel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChannelGroupsOnChannels" ADD CONSTRAINT "ChannelGroupsOnChannels_channelGroupId_fkey" FOREIGN KEY ("channelGroupId") REFERENCES "ChannelGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
