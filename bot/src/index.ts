import fs from 'fs';
import ExtendedClient from './client/ExtendedClient';
import { ClientConfig } from './types/Config';

const configString = fs.readFileSync(process.cwd() + '/config/bot.json');
const config: ClientConfig = JSON.parse(configString.toString());

const client = new ExtendedClient(
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
