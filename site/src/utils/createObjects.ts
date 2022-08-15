import { CustomEmbed, Messages } from '../types/Messages';

export function createCustomEmbed() {
	const embed: CustomEmbed = {
		author: null,
		color: '#202225',
		description: null,
		fields: [],
		footer: null,
		image: null,
		thumbnail: null,
		timeStamp: null,
		title: null,
		url: null,
	};
	return embed;
}

export function fixEmbed() {}

export function createCustomMessage() {
	const message: Messages = { buttons: [], content: '', embeds: [], files: [] };
	return message;
}
