import { ButtonInteraction, EmbedBuilder } from 'discord.js';
import ExtendedClient from '../../../client/ExtendedClient';
import Button from '../../Button';

export default class FillFormButton extends Button {
	constructor(client: ExtendedClient) {
		super(client, { category: 'forms', command: 'fill' });
	}
}
