import { Router } from 'express';
import listVideoIdsByChannelId from '../utils/listVideoIdsByChannelId';

export default (router: Router) => {
  router.get('/channels/:id/videos', async (req, res) => {
    const id = req.params.id;

    const viedoIds = await listVideoIdsByChannelId(id);

    res.send({
      data: viedoIds,
    });
  });
};
