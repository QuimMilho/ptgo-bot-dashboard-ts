import { Router } from 'express';
import ExtendedClient from '../client/ExtendedClient';
import { authenticated } from '../strategies/authentication';

const router = Router();

router.get('/info', authenticated, async (req, res) => {
	const client: ExtendedClient = (await import('..')).default;
	const botInfo = {
		nServers: client.guilds.cache.size,
		upTime: client.uptime,
	};
	res.status(200).send(botInfo);
});

export default router;
