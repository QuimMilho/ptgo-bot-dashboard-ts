import { ApplicationCommandOptionData } from 'discord.js';
import CustomClient from './Client';

export interface CommandOptions {
	name: string;
	description: string;
	defaultPermission: boolean;
	tipo: string;
	options: ApplicationCommandOptionData;
}

export default class Command {
	client: CustomClient;
	name: string;
	description: string;
	defaultPermission: boolean;
	tipo: string;
	options: ApplicationCommandOptionData;

	constructor(client: CustomClient, options: CommandOptions) {
		this.client = client;
		this.name = options.name;
		this.description = options.description;
		this.defaultPermission = options.defaultPermission;
		this.tipo = options.tipo;
		this.options = options.options;
	}
}
