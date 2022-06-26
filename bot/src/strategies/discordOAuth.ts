import { PassportStatic } from 'passport';
import { Strategy } from 'passport-discord';
import ExtendedClient from '../client/ExtendedClient';
import { DBUser } from '../types/Database';

export default function DiscordStrategy(
	client: ExtendedClient,
	passport: PassportStatic
) {
	passport.serializeUser((user, done) => done(null, user));

	passport.deserializeUser(async (token: UserInfo, done) => {
		const result = await client.query(
			'SELECT * FROM users WHERE clientId LIKE ?',
			[token.clientId]
		);
		const user: DBUser = result[0];
		return user ? done(null, user) : done(null, null);
	});

	passport.use(
		new Strategy(
			{
				clientID: client.config.app_id,
				clientSecret: client.config.secret,
				callbackURL: `${client.config.api.callbackURL}/api/auth/login/redirect`,
				scope: ['identify'],
			},
			async (accessToken, refreshToken, profile, done) => {
				const user: DBUser = {
					avatar: profile.avatar,
					clientId: profile.id,
					token: accessToken,
					refreshToken,
					id: undefined,
					tag: `${profile.username}#${profile.discriminator}`,
				};
				const results: DBUser[] = await client.query(
					'SELECT id FROM users WHERE clientId LIKE ?',
					[user.clientId]
				);
				if (results.length === 0)
					client.query(
						'INSERT INTO users (clientId, token, refreshToken, avatar, tag) VALUES (?, ?, ?, ?, ?)',
						[
							user.clientId,
							user.token,
							user.refreshToken,
							user.avatar,
							user.tag,
						]
					);
				done(null, user);
			}
		)
	);
}

export interface UserInfo {
	clientId: string;
	accessToken: string;
	refreshToken: string;
}
