import { Router } from 'express';
import playwright from 'playwright';

async function main(id: string) {
  const browser = await playwright.firefox.launch({
    headless: true, // setting this to true will not run the UI
  });
  const context = await browser.newContext();
  const page = await context.newPage();

  console.log(`goto ${id} channel page`);

  await page.goto(`https://www.youtube.com/channel/${id}/videos`);

  await page.waitForTimeout(1000);

  console.log('get vedios thumbnails');
  const vedios = page.locator('ytd-grid-video-renderer #thumbnail');

  await page.waitForTimeout(1000);
  console.log('get vedios links');

  const vedioLinks = await vedios.evaluateAll((list) =>
    list.map((vedio) => vedio.getAttribute('href')),
  );

  const vedioIds = vedioLinks.map((link) => link.replace('/watch?v=', ''));

  console.log('browser close');

  await browser.close();
  return vedioIds;
}

export default (router: Router) => {
  router.get('/channels/:id/videos', async (req, res) => {
    const id = req.params.id;

    const viedoIds = await main(id);

    res.send({
      data: viedoIds,
    });
  });
};
