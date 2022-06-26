import { Client, ClientOptions } from 'discord.js';
import MySQL, { Connection } from 'mysql';
import CommandManager from '../commands/CommandManager';
import EventManager from '../events/EventManager';
import GuildManager from '../guilds/GuildManager';
import Server from '../server/Server';
import { ClientConfig } from '../types/Config';

export default class ExtendedClient extends Client {
	eventManager: EventManager;
	commandManager: CommandManager;
	guildManager: GuildManager;
	mysql: Connection;
	config: ClientConfig;
	server: Server;

	constructor(options: ClientOptions, config: ClientConfig) {
		super(options);

		this.config = config;
		this.createConnection();

		// Start Managers
		this.guildManager = new GuildManager(this);
		this.eventManager = new EventManager(this);
		this.commandManager = new CommandManager(this);
		this.server = new Server(this);
	}

	private createConnection() {
		this.mysql = MySQL.createConnection(this.config.mysql);
		console.log('MySQL connection created!');
	}

	async query(query: string, elements: any[]) {
		return new Promise<any[]>((resolve, reject) => {
			this.mysql.query(query, elements, (err, res: any[], fields) => {
				if (err) reject(err);
				else resolve(res);
			});
		});
	}
}
