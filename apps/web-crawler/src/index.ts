import dotenv from 'dotenv';
import playwright from 'playwright';

dotenv.config();

async function main() {
  const browser = await playwright.firefox.launch({
    headless: true, // setting this to true will not run the UI
  });
  const context = await browser.newContext();
  const page = await context.newPage();

  console.log(`goto ${process.env.CHANNEL_ID} channel page`);

  await page.goto(
    `https://www.youtube.com/channel/${process.env.CHANNEL_ID}/videos`,
  );

  await page.waitForTimeout(1000);

  console.log('get vedios thumbnails');
  const vedios = page.locator('ytd-grid-video-renderer #thumbnail');

  await page.waitForTimeout(1000);
  console.log('get vedios links');

  const vedioLinks = await vedios.evaluateAll((list) =>
    list.map((vedio) => vedio.getAttribute('href')),
  );

  const vedioIds = vedioLinks.map((link) => link.replace('/watch?v=', ''));

  console.log(vedioIds);
  console.log('browser close');

  await browser.close();
}

main();
