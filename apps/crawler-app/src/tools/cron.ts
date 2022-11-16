import { CronJob } from 'cron';
import { crawChannels } from '../socket';

const job = new CronJob(
  '0 * * * *',
  function () {
    crawChannels();
    console.log(`${new Date().toISOString()} crawVideos...`);
  },
  null,
  true,
  'Asia/Taipei',
);

job.start();
