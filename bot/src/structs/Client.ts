import { Client, ClientOptions } from 'discord.js';
import fs from 'fs';
import MySQL, { Connection } from 'mysql2/promise';

import Command from './Command';
import ready from '../events/client/ready';
import { AppOptions } from '../types/options';

export default class DiscordClient extends Client {
	commands: Command[];
	config: AppOptions;

	mysql: Connection;

	constructor(options: ClientOptions, config: AppOptions) {
		super(options);
		this.config = config;

		this.createConnection();

		this.commands = [];

		this.loadEvents();
		this.loadCommands();
	}

	async createConnection() {
		this.mysql = await MySQL.createConnection(this.config.mysql);
	}

	async importFile(filePath: string) {
		return (await import(filePath))?.default;
	}

	async loadEvents() {
		const path = `${__dirname}/../events`;

		const categories = fs.readdirSync(path);

		for (let i = 0; i < categories.length; i++) {
			const category = categories[i];

			const events = fs.readdirSync(`${path}/${category}`);

			for (let h = 0; h < events.length; h++) {
				const eventFile = `${path}/${category}/${events[h]}`;

				const eventClass = await this.importFile(eventFile);

				const event: ready = new eventClass(this);

				this.on(event.name, event.run);
			}
		}
	}

	async loadCommands() {
		const path = `${__dirname}/../events`;

		const categories = fs.readdirSync(path);

		for (let i = 0; i < categories.length; i++) {
			const category = categories[i];

			const commands = fs.readdirSync(`${path}/${category}`);

			for (let h = 0; h < commands.length; h++) {
				const commandFile = `${path}/${category}/${commands[h]}`;

				const commandClass = await this.importFile(commandFile);

				const command = new commandClass(this);

				this.commands.push(command);
			}
		}
	}
}
