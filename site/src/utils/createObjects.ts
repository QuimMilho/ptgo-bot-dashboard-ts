import {
	FormButtonOptions,
	FormQuestionsOptions,
	FormsOptions,
} from '../types/Features';
import { CustomEmbed, Messages } from '../types/Messages';
import { generateRandomId } from './random';

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

export function createForm() {
	const form: FormsOptions = {
		answerDelay: 60,
		delay: 30,
		blockedRoles: [],
		buttons: [],
		emojis: false,
		id: generateRandomId(6),
		introColor: '#123456',
		name: 'Novo formulário!',
		questionColor: '#123456',
		questions: [],
		responseChat: {
			channel: { id: '', name: '' },
			guild: { id: '', name: '' },
		},
		responseColor: '#123456',
	};
	return form;
}

export function createFormButton(index: number | undefined) {
	const button: FormButtonOptions = {
		channel: '',
		color: '#12356',
		deleteAfter: false,
		disableAfter: false,
		function: 'SEND_DM',
		label: 'Botão',
		message: createCustomMessage(),
		roles: [],
		type: 'Danger',
		index: index ? index : 0,
	};
	return button;
}

export function createFormQuestion(index: number | undefined) {
	const question: FormQuestionsOptions = {
		index: index ? index : 0,
		question: '',
		type: 'STRING',
	};
	return question;
}
