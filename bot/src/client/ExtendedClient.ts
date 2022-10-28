import { Client, ClientOptions } from 'discord.js';
import MySQL, { Connection } from 'mysql';
import ButtonManager from '../buttons/ButtonManager';
import CommandManager from '../commands/CommandManager';
import EventManager from '../events/EventManager';
import GuildManager from '../guilds/GuildManager';
import Server from '../server/Server';
import TimeManager from '../timer/TimeManager';
import { ClientConfig } from '../types/Config';

export default class ExtendedClient extends Client {
	eventManager: EventManager;
	buttonManager: ButtonManager;
	commandManager: CommandManager;
	guildManager: GuildManager;
	timeManager: TimeManager;
	mysql: Connection;
	config: ClientConfig;
	server: Server;
	serverReady: boolean;

	constructor(options: ClientOptions, config: ClientConfig) {
		super(options);

		this.config = config;
		this.serverReady = false;
		this.createConnection().then((v) => {
			if (v) console.log('MySQL Connection complete!');
			else console.log('Alguma coisa aconteceu!');
		});

		// Start Managers
		this.guildManager = new GuildManager(this);
		this.eventManager = new EventManager(this);
		this.commandManager = new CommandManager(this);
		this.buttonManager = new ButtonManager(this);
		this.server = new Server(this);
		this.timeManager = new TimeManager(this);
	}

	private async createConnection() {
		this.mysql = MySQL.createConnection(this.config.mysql);
		return new Promise((resolve, reject) => {
			this.mysql.connect((err) => {
				if (err) reject(err);
				else resolve(true);
			});
		});
	}

	async query(query: string, elements: any[]) {
		return new Promise<any[]>((resolve, reject) => {
			this.mysql.query(query, elements, (err, res: any[], fields) => {
				if (err) reject(err);
				else resolve(res);
			});
		});
	}

	ready() {
		this.serverReady = true;
	}
}
