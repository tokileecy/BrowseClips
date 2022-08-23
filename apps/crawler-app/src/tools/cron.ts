import { CronJob } from 'cron';
import crawVideos from '../utils/crawVideos';

const job = new CronJob(
  '0 * * * *',
  function () {
    crawVideos();
    console.log(`${new Date().toISOString()} crawVideos...`);
  },
  null,
  true,
  'Asia/Taipei',
);

job.start();
