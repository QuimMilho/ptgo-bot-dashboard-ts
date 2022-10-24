import { Collection, CommandInteraction, Guild } from 'discord.js';
import ExtendedClient from '../client/ExtendedClient';
import Command from './Command';

import fs from 'fs';

export default class CommandManager {
	client: ExtendedClient;
	commands: Collection<string, Command>;

	constructor(client: ExtendedClient) {
		this.client = client;
		this.commands = new Collection();

		this.loadCommands();
	}

	async loadCommands() {
		const path = `${__dirname}/commandList/`;

		const categories = fs.readdirSync(path);

		for (let i = 0; i < categories.length; i++) {
			const category = categories[i];

			const commands = fs.readdirSync(`${path}/${category}`);

			for (let h = 0; h < commands.length; h++) {
				const commandFile = commands[h];
				const commandClass = (
					await import(`${path}/${category}/${commandFile}`)
				).default;

				const command: Command = new commandClass(this.client);

				this.commands.set(command.name, command);
				console.log(`Comando ${command.name} carregado!`);
			}
		}
	}

	async setCommands(guild: Guild) {
		let commands: Command[] = [];
		for (let i = 0; i < this.commands.size; i++) {
			const cmd = this.commands.at(i);
			if (this.client.guildManager.hasFeature(guild.id, cmd.category))
				commands.push(this.commands.at(i));
		}
		await guild.commands.set(commands);
		console.log(`Comandos registados para a guild ${guild.name}!`);
	}

	async executeCommand(interaction: CommandInteraction) {
		await interaction.deferReply({ ephemeral: true });
		this.commands.get(interaction.commandName).run(interaction);
	}
}
