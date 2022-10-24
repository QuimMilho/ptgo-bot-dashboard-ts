import { Router } from 'express';
import { UserRequest } from '.';
import ExtendedClient from '../client/ExtendedClient';
import { authenticated } from '../strategies/authentication';

const router = Router();

router.get('/info', authenticated, async (req: UserRequest, res) => {
	const client: ExtendedClient = (await import('..')).default;

	const guilds = client.guilds.fetch();
	if (!guilds) return res.sendStatus(400);

	const botInfo = {
		nServers: client.guilds.cache.size,
		upTime: client.uptime,
	};
	res.status(200).send(botInfo);
});

export default router;
