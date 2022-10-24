import { Request, Router } from 'express';
import botRouter from './bot';
import guildRouter from './guilds';
import authRouter from './auth';
import userRouter from './user';
import { DBUser } from '../types/Database';

const router = Router();

router.use('/bot', botRouter);
router.use('/guild', guildRouter);
router.use('/auth', authRouter);
router.use('/user', userRouter);
router.get('/*', (req, res) => res.sendStatus(404));

export default router;

export interface UserRequest extends Request {
    user: DBUser;
}