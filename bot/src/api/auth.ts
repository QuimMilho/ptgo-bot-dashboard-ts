import { Router } from 'express';
import passport from 'passport';
import { UserRequest } from '.';
import { authenticated } from '../strategies/authentication';

const router = Router();

router.get('/login', passport.authenticate('discord'), (req: UserRequest, res) => {
	res.sendStatus(200);
});

router.get(
	'/login/redirect',
	passport.authenticate('discord'),
	async (req: UserRequest, res) => {
		const config = (await import('..')).default.config;
		res.redirect(config.api.callbackURL);
	}
);

router.get('/logout', authenticated, async (req: UserRequest, res) => {
	req.logout(console.log);
	const config = (await import('..')).default.config;
	res.redirect(config.api.callbackURL);
});

export default router;
