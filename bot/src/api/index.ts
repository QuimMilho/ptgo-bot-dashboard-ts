import { Router } from 'express';
import botRouter from './bot';
import guildRouter from './guilds';
import authRouter from './auth';

const router = Router();

router.use('/bot', botRouter);
router.use('/guild', guildRouter);
router.use('/auth', authRouter)

export default router;
