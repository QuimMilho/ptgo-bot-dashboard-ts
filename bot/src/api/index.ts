import { Router } from 'express';
import botRouter from './bot';
import guildRouter from './guilds';
import authRouter from './auth';
import userRouter from './user';

const router = Router();

router.use('/bot', botRouter);
router.use('/guild', guildRouter);
router.use('/auth', authRouter);
router.use('/user', userRouter);
router.get('/*', (req, res) => res.sendStatus(404));

export default router;
