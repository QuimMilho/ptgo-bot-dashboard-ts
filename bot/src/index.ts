import fs from 'fs';
import ExtendedClient from './client/ExtendedClient';
import { ClientConfig } from './types/Config';

let close = false;

const configPath = process.cwd() + '/config/bot.json';
const publicPath = process.cwd() + '/public';
const certsPath = process.cwd() + '/certs';

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
	const dirPath = process.cwd() + '/config';
	if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath);
	fs.writeFileSync(configPath, JSON.stringify(configDefault, null, 4));
	console.log(
		'Criados ficheiros de configuração!\nPreenche antes de executares novamente o bot!'
	);
	close = true;
}

if (!fs.existsSync(publicPath)) {
	fs.mkdirSync(publicPath);
	console.log('Criada pasta pública do site!');
	close = true;
}

if (close) process.exit(1);

const configString = fs.readFileSync(configPath);
const config: ClientConfig = JSON.parse(configString.toString());

if (!fs.existsSync(certsPath) && config.api.https) {
	fs.mkdirSync(certsPath);
	close = true;
	console.log(
		'Coloca os certificados na pasta /certs com os nomes ssl.pem e key.pem!'
	);
}

if (close) process.exit(1); 

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

export default client;
