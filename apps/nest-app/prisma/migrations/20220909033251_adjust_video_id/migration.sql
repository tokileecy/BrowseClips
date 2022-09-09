ALTER TABLE "SubjectsOnVideos" DROP CONSTRAINT "SubjectsOnVideos_videoId_fkey";

ALTER TABLE "Video" ADD CONSTRAINT "Video_pkey" PRIMARY KEY ("id");

DROP INDEX "Video_id_key";

ALTER TABLE "SubjectsOnVideos" ADD CONSTRAINT "SubjectsOnVideos_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "Video"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
