import express, { Router } from 'express';
import channels from './channels';

const router: Router = express.Router();

channels(router);

export default router;
