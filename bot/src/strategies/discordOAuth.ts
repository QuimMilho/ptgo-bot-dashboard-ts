import { PassportStatic } from 'passport';
import { Strategy } from 'passport-discord';
import ExtendedClient from '../client/ExtendedClient';

export default function DiscordStrategy(
	client: ExtendedClient,
	passport: PassportStatic
) {
	passport.serializeUser((user, done) => done(null, user));

	passport.deserializeUser(async (token: UserInfo, done) => {
		const result = await this.client.mysql.query(
			'SELECT * FROM users WHERE clientId LIKE ?',
			[token.clientId]
		);
		const user = result[0][0];
		return user ? done(null, user) : done(null, null);
	});

	passport.use(
		new Strategy(
			{
				clientID: client.config.app_id,
				clientSecret: client.config.secret,
				callbackURL: client.config.api.callbackURL,
				scope: ['identify'],
			},
			async (accessToken, refreshToken, profile, done) => {}
		)
	);
}

export interface UserInfo {
	clientId: string;
	accessToken: string;
	refreshToken: string;
}
