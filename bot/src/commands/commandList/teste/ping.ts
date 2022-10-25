import {
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle,
	ChatInputCommandInteraction,
} from 'discord.js';
import ExtendedClient from '../../../client/ExtendedClient';
import Command from '../../Command';

export default class extends Command {
	constructor(client: ExtendedClient) {
		super(client, {
			name: 'ping',
			category: { name: 'general' },
			defaultMemberPermissions: null,
			dmPermission: false,
			description: 'Comando teste',
			options: [],
		});
	}

	run = async (interaction: ChatInputCommandInteraction) => {
		const test = await this.client.query('SELECT * FROM users', []);
		console.log(test);
		interaction.editReply('Done!');
		const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
			new ButtonBuilder()
				.setCustomId('forms-fill-1234')
				.setLabel('teste')
				.setStyle(ButtonStyle.Danger)
		);
		interaction.followUp({
			content: 'Realmente bem feito!',
			components: [row],
		});
	};
}
