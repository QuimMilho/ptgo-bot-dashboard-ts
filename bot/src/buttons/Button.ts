import { ButtonInteraction, EmbedBuilder } from 'discord.js';
import ExtendedClient from '../client/ExtendedClient';
import { ButtonOptions } from '../types/Commands';

export default class Button {
	client: ExtendedClient;
	category: string;
	command: string;

	constructor(client: ExtendedClient, options: ButtonOptions) {
		this.client = client;
		this.category = options.category;
		this.command = options.command;
	}

	run(interaction: ButtonInteraction, id: string | undefined) {
		const embed = new EmbedBuilder()
			.setTitle('Botão padrão!')
			.setColor([0, 255, 255])
			.setTimestamp();
		interaction.editReply({ embeds: [embed] });
	}
}
