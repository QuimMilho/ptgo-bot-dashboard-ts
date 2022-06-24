import fs from 'fs';
import ExtendedClient from './client/ExtendedClient';
import { ClientConfig } from './types/Config';

const configPath = process.cwd() + '/config/bot.json';

if (!fs.existsSync(configPath)) {
	const configDefault: ClientConfig = {
		api: {
			callbackURL: 'http://localhost:3000',
			https: false,
			port: 3000,
			secret: 'string aleatoria aqui',
		},
		mysql: {
			host: '',
			database: '',
			password: '',
			user: '',
			port: 3306,
		},
		app_id: '',
		secret: '',
		token: '',
		memoryTrack: false,
	};
	console.log(
		'Criados ficheiros de configuração!\nPreenche antes de executares novamente o bot!'
	);
	process.exit(1);
}

const configString = fs.readFileSync(configPath);
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
