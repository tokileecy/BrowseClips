ALTER TABLE "SubjectsOnVideos" DROP CONSTRAINT "SubjectsOnVideos_videoId_fkey";

CREATE UNIQUE INDEX "Video_id_key" ON "Video"("id");
ALTER TABLE "Video" DROP CONSTRAINT "Video_pkey";

ALTER TABLE "SubjectsOnVideos" ADD CONSTRAINT "SubjectsOnVideos_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "Video"("id") ON DELETE RESTRICT ON UPDATE CASCADE;