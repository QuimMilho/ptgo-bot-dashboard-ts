import { Router } from 'express';
import botRouter from './bot';

const router = Router();

router.use('/bot', botRouter);

export default router;
