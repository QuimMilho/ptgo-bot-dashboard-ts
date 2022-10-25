import { EmbedBuilder, Guild, User } from 'discord.js';
import ExtendedClient from '../../client/ExtendedClient';
import { BDPunitions } from '../../types/Database';
import { hasRoles } from '../permissions';

export async function mute(
	client: ExtendedClient,
	guild: Guild,
	user: User,
	admin: User,
	reason?: string
): Promise<'AlreadyMuted' | 'Muted' | 'Error'> {
	const member = await guild.members.fetch(user.id);
	const moderation = client.guildManager.getFeatures(guild.id).moderation;
	const mutedRoles = moderation.mutedRoles;
	if (member) {
		if (hasRoles(member, mutedRoles)) {
			return 'AlreadyMuted';
		}
	} else {
		const info: BDPunitions[] = await client.query(
			'SELECT * FROM PUNICOES WHERE CLIENTID LIKE ? AND EXPIRED = FALSE',
			[user.id]
		);
		if (info.length != 0) {
			return 'AlreadyMuted';
		}
	}
	await client.query(
		'INSERT INTO PUNICOES (GUILDID, CLIENTID, ADMINID, TIMEDONE, EXPIRES, EXPIRED, REASON, TIPO)' +
			` VALUES (?, ?, ?, NOW(), NOW(), ?, ?, 'mute')`,
		[guild.id, user.id, admin.id, false, reason]
	);
	const embed = new EmbedBuilder()
		.setTitle('User mutado!')
		.setFooter({
			text: `memberId:${user.id} adminId:${admin.id}`,
		})
		.setColor('#00ff00')
		.addFields([
			{ name: 'User', value: `<@${user.id}>`, inline: true },
			{
				name: 'Admin',
				value: `<@${admin.id}>`,
				inline: true,
			},
			{ name: 'Duração', value: 'Indeterminado', inline: true },
			{ name: 'Motivo', value: reason ? reason : 'Sem motivo', inline: true },
		]);
	client.guildManager.logSnowflake(guild, moderation.logs, null, [embed]);
	if (member) {
		member.roles.add(mutedRoles);
	}
	return 'Muted';
}

export async function tempMute(
	client: ExtendedClient,
	guild: Guild,
	user: User,
	admin: User,
	time: number,
	reason?: string
): Promise<'AlreadyMuted' | 'Muted' | 'Error'> {
	const member = await guild.members.fetch(user.id);
	const moderation = client.guildManager.getFeatures(guild.id).moderation;
	const mutedRoles = moderation.mutedRoles;
	if (member) {
		if (hasRoles(member, mutedRoles)) {
			return 'AlreadyMuted';
		}
	} else {
		const info: BDPunitions[] = await client.query(
			'SELECT * FROM PUNICOES WHERE CLIENTID LIKE ? AND EXPIRED = FALSE',
			[user.id]
		);
		if (info.length != 0) {
			return 'AlreadyMuted';
		}
	}
	await client.query(
		'INSERT INTO PUNICOES (GUILDID, CLIENTID, ADMINID, TIMEDONE, EXPIRES, EXPIRED, REASON, TIPO)' +
			` VALUES (?, ?, ?, NOW(), NOW() + interval ? minute, ?, ?, 'mute')`,
		[guild.id, user.id, admin.id, time + 1, false, reason]
	);
	const embed = new EmbedBuilder()
		.setTitle('User mutado!')
		.setFooter({
			text: `memberId:${user.id} adminId:${admin.id}`,
		})
		.setColor('#00ff00')
		.addFields([
			{ name: 'User', value: `<@${user.id}>`, inline: true },
			{
				name: 'Admin',
				value: `<@${admin.id}>`,
				inline: true,
			},
			{ name: 'Duração', value: `${time} minutos`, inline: true },
			{ name: 'Motivo', value: reason ? reason : 'Sem motivo', inline: true },
		]);
	client.guildManager.logSnowflake(guild, moderation.logs, null, [embed]);
	if (member) {
		member.roles.add(mutedRoles);
	}
	return 'Muted';
}

export async function unmute(
	client: ExtendedClient,
	guild: Guild,
	user: User,
	admin: User,
	reason?: string
) {}
