import { CommandInteraction, Interaction } from 'discord.js';
import ExtendedClient from '../../../client/ExtendedClient';
import Event from '../../Event';

export default class extends Event {
	constructor(client: ExtendedClient) {
		super(client, { name: 'interactionCreate' });
	}

	run = (interaction: Interaction) => {
		if (interaction.isCommand()) {
			if (!this.client.serverReady)
				return interaction.reply({
					content: 'O bot ainda não está pronto!',
					ephemeral: true,
				});
			this.client.commandManager.executeCommand(interaction);
		} else if (interaction.isButton()) {
			if (!this.client.serverReady)
				return interaction.reply({
					content: 'O bot ainda não está pronto!',
					ephemeral: true,
				});
			this.client.buttonManager.executeButton(interaction);
		}
	};
}
