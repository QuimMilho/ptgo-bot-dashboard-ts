import { CommandInteraction } from 'discord.js';
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

	run = async (interaction: CommandInteraction) => {
		const test = await this.client.query('SELECT * FROM users', []);
		console.log(test);
		interaction.editReply('Done!');
		interaction.followUp({ content: 'Realmente bem feito!' });
	};
}
