import { Router } from 'express';
import passport from 'passport';

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

export default router;
