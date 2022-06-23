import { CommandInteraction, Interaction } from 'discord.js';
import ExtendedClient from '../../../client/ExtendedClient';
import Event from '../../Event';

export default class extends Event {
	constructor(client: ExtendedClient) {
		super(client, { name: 'interactionCreate' });
	}

    override run = (interaction: Interaction) => {
        if (interaction.isCommand()) {
            const cmdInteraction: CommandInteraction = interaction;
            cmdInteraction.reply({content: 'Something here', ephemeral: true});
        }
    }
}
