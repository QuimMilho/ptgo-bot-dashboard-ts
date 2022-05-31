import Client from './structs/Client';

import { loadConfig } from './strategies/config';

const config = loadConfig();

const client = new Client(
	{
		intents: [
			'GUILDS',
			'GUILD_MEMBERS',
			'GUILD_BANS',
			'GUILD_EMOJIS_AND_STICKERS',
			'GUILD_INVITES',
			'GUILD_VOICE_STATES',
			'GUILD_PRESENCES',
			'GUILD_MESSAGES',
			'GUILD_MESSAGE_REACTIONS',
			'DIRECT_MESSAGES',
			'DIRECT_MESSAGE_REACTIONS',
		],
	},
	config
);

client.login(config.token);

export { config };
