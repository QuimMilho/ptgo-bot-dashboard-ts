import { Router } from 'express';
import passport from 'passport';
import { config } from 'process';
import { authenticated } from '../strategies/authentication';

const router = Router();

router.get('/login', passport.authenticate('discord'), (req, res) => {
	res.sendStatus(200);
});

router.get(
	'/login/redirect',
	passport.authenticate('discord'),
	async (req, res) => {
		const config = (await import('..')).default.config;
		res.redirect(config.api.callbackURL);
	}
);

router.get('/logout', authenticated, async (req, res) => {
	req.logout(console.log);
	const config = (await import('..')).default.config;
	res.redirect(config.api.callbackURL);
});

export default router;
