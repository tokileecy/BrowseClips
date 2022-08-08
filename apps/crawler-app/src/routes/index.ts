import express from 'express';
import channels from './channels';

const router = express.Router();

channels(router);

export default router;
