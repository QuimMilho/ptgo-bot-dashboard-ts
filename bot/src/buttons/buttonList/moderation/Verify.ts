import { ButtonInteraction } from 'discord.js';
import ExtendedClient from '../../../client/ExtendedClient';
import Button from '../../Button';

export default class FillFormButton extends Button {
	constructor(client: ExtendedClient) {
		super(client, { category: 'mod', command: 'verify' });
	}

    run = (interaction: ButtonInteraction) => {

    }
}
