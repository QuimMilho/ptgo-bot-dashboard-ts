export interface Messages {
	files: CustomFiles[];
	embeds: CustomEmbed[];
	buttons: CustomButtons[];
	content: string;
}

export interface CustomEmbed {
	title: string | null;
	description: string | null;
	url: string | null;
	timeStamp: boolean | Date | number | null;
	color: string;
	fields: CustomEmbedField[];
	thumbnail: string | null;
	image: string | null;
	author: CustomEmbedAuthor | null;
	footer: CustomEmbedFooter | null;
}

export interface CustomEmbedField {
	name: string | null;
	label: string | null;
	inLine: boolean | null;
}

export interface CustomEmbedAuthor {
	name: string | null;
	iconURL: string | null;
	url: string | null;
}

export interface CustomEmbedFooter {
	text: string | null;
	iconURL: string | null;
}

export interface CustomSmallButton {
	label: string;
	style: 'Danger' | 'Primary' | 'Secondary' | 'Success';
}

export interface CustomButtons {
	label: string;
	style: 'Danger' | 'Primary' | 'Secondary' | 'Success' | 'Link';
	customId: string | null;
	emoji: string;
	disabled: boolean;
	url: string | null;
}

export interface CustomFiles {
	data: string | number | boolean | Buffer | null;
	attachment: string | null;
	name: string;
}

export interface Mention {
	type: 'USER' | 'ROLE' | 'CHANNEL';
	discriminator: string | undefined;
	id: string;
	name: string;
}
