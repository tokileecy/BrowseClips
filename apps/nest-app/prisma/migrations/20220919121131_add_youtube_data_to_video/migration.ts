import { PrismaClient, Prisma, Video } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log(`Start migration ...`);
  
  const size = await prisma.video.count()
  const perSize = 100 

  console.log(`total ${size}`)
  let cursor : Prisma.VideoWhereUniqueInput | undefined = undefined
  for(let i = 0; i < Math.ceil(size / perSize) ; i ++) {
    try {
      const videos : Video[] = await prisma.video.findMany({
        take: perSize,
        cursor,
      })
  
      for(let i = 0; i < videos.length; i ++) {
        const video = videos[i]
  
        await prisma.video.update({
          where: {
            id: video.id
          },
          data: {
            youtubeData: {
              id: video.id,
              snippet: {
                channelId: video.channelId,
                title: video.title,
                description: video.description,
                publishedAt: video.publishedAt?.toISOString(),
                thumbnails: video.thumbnails,
                tags: video.tags,
              },
              status: video.status,
              contentDetails: video.contentDetails,
              liveStreamingDetails: video.liveStreamingDetails,
              statistics: video.statistics,
            }
          }
        })
      }
      console.log(`finished on cursor ${cursor?.id}`)
      console.log(`remaining ${size - (i * perSize)}`)
      cursor = { id: videos[videos.length - 1].id }
    } catch {
      console.error(`update faild at cursor ${cursor?.id}`)
    }
  }
  console.log(`migration finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
