import { Client, ClientOptions } from 'discord.js';
import MySQL, { Connection } from 'mysql2/promise';
import CommandManager from '../commands/CommandManager';
import EventManager from '../events/EventManager';
import GuildManager from '../guilds/GuildManager';
import { ClientConfig } from '../types/Config';

export default class ExtendedClient extends Client {
	eventManager: EventManager;
	commandManager: CommandManager;
	guildManager: GuildManager;
	mysql: Connection;
	config: ClientConfig;

	constructor(options: ClientOptions, config: ClientConfig) {
		super(options);

		this.config = config;
		this.createConnection();

		// Start Managers
		this.guildManager = new GuildManager(this);
		this.eventManager = new EventManager(this);
		this.commandManager = new CommandManager(this);
	}

	async createConnection() {
		this.mysql = await MySQL.createConnection(this.config.mysql);
	}
}
