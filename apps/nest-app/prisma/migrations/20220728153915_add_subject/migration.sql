-- CreateTable
CREATE TABLE "Subject" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Subject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubjectsOnVideos" (
    "videoId" TEXT NOT NULL,
    "subjectId" INTEGER NOT NULL,

    CONSTRAINT "SubjectsOnVideos_pkey" PRIMARY KEY ("subjectId","videoId")
);

-- AddForeignKey
ALTER TABLE "SubjectsOnVideos" ADD CONSTRAINT "SubjectsOnVideos_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubjectsOnVideos" ADD CONSTRAINT "SubjectsOnVideos_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "Video"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
