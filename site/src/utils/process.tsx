import replaceString from 'string-placeholder';
import { APIUserGuildsInfo } from '../types/API';
import parser from 'html-react-parser';
import { Mention } from '../types/Messages';

export function processMentions(content: string, mentions: Mention[]) {
	const replacers = mentionToReplacer(mentions);
	content = replaceString(content, replacers, { before: '<#', after: '>' });
	content = replaceString(content, replacers, { before: '<@&', after: '>' });
	content = replaceString(content, replacers, { before: '<@!', after: '>' });
	content = replaceString(content, replacers, { before: '<@', after: '>' });
	return parser(`<span className="white">${content}</span>`);
}

export function guildInfoToMentions(guild: APIUserGuildsInfo) {
	const mentions: Mention[] = [];
	for (let i = 0; i < guild.guild.channels.length; i++) {
		const c = guild.guild.channels[i];
		mentions.push({
			type: 'CHANNEL',
			discriminator: c.type,
			id: c.id,
			name: c.name,
		});
	}
	for (let i = 0; i < guild.guild.members.length; i++) {
		const m = guild.guild.members[i];
		mentions.push({
			type: 'USER',
			discriminator: m.discriminator,
			id: m.id,
			name: m.username,
		});
	}
	for (let i = 0; i < guild.guild.roles.length; i++) {
		const r = guild.guild.roles[i];
		mentions.push({
			type: 'ROLE',
			discriminator: r.colorHex,
			id: r.id,
			name: r.name,
		});
	}
	return mentions;
}

export function mentionToReplacer(mentions: Mention[]) {
	const temp: any = {};
	for (let i = 0; i < mentions.length; i++) {
		const m = mentions[i];
		temp[m.id] =
			`<span style="background-color: ${
				m.type === 'ROLE'
					? m.discriminator
						? m.discriminator
						: '#424676'
					: '#424676'
			}; border-radius: 3px; padding: 1px;">` +
			(m.type === 'ROLE'
				? `@${m.name}`
				: m.type === 'USER'
				? `@${m.name}#${m.discriminator}`
				: `#${m.name}`) +
			`</span>`;
	}
	return temp;
}
