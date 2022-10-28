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
	const modRoles = moderation.moderators;
	if (
		member &&
		(hasRoles(member, modRoles) || member.permissions.has('Administrator'))
	) {
		return 'Error';
	}
	if (member) {
		if (hasRoles(member, mutedRoles)) {
			return 'AlreadyMuted';
		}
	} else {
		const info: BDPunitions[] = await client.query(
			'SELECT * FROM PUNICOES WHERE GUILDID LIKE ? AND CLIENTID LIKE ? AND' +
				" EXPIRED = FALSE AND TIPO LIKE 'mute'",
			[guild.id, user.id]
		);
		if (info.length !== 0) {
			return 'AlreadyMuted';
		}
	}
	await client.query(
		'INSERT INTO PUNICOES (GUILDID, CLIENTID, ADMINID, TIMEDONE, EXPIRED, REASON, TIPO)' +
			` VALUES (?, ?, ?, NOW(), ?, ?, 'mute')`,
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
	const modRoles = moderation.moderators;
	if (
		member &&
		(hasRoles(member, modRoles) || member.permissions.has('Administrator'))
	) {
		return 'Error';
	}
	if (member) {
		if (hasRoles(member, mutedRoles)) {
			return 'AlreadyMuted';
		}
	} else {
		const info: BDPunitions[] = await client.query(
			'SELECT * FROM PUNICOES WHERE GUILDID LIKE ? AND CLIENTID LIKE ? AND' +
				" EXPIRED = FALSE AND TIPO LIKE 'mute'",
			[guild.id, user.id]
		);
		if (info.length !== 0) {
			return 'AlreadyMuted';
		}
	}
	await client.query(
		'INSERT INTO PUNICOES (GUILDID, CLIENTID, ADMINID, TIMEDONE, EXPIRES, EXPIRED, REASON, TIPO)' +
			` VALUES (?, ?, ?, NOW(), NOW() + interval ? minute, ?, ?, 'mute')`,
		[guild.id, user.id, admin.id, time, false, reason]
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
): Promise<'Unmuted' | 'DBUnmuted' | 'NotMuted' | 'Error'> {
	const member = await guild.members.fetch(user.id);
	const moderation = client.guildManager.getFeatures(guild.id).moderation;
	const mutedRoles = moderation.mutedRoles;
	const modRoles = moderation.moderators;
	if (
		member &&
		(hasRoles(member, modRoles) || member.permissions.has('Administrator'))
	) {
		return 'Error';
	}
	const embed = new EmbedBuilder()
		.setFooter({
			text: `memberId:${user.id} adminId:${admin.id}`,
		})
		.addFields([
			{ name: 'User', value: `<@${user.id}>`, inline: true },
			{
				name: 'Admin',
				value: `<@${admin.id}>`,
				inline: true,
			},
			{ name: 'Motivo', value: reason ? reason : 'Sem motivo', inline: true },
		]);
	const info: BDPunitions[] = await client.query(
		'SELECT * FROM PUNICOES WHERE GUILDID LIKE ? AND CLIENTID LIKE ? AND' +
			" EXPIRED = FALSE AND TIPO LIKE 'mute'",
		[guild.id, user.id]
	);
	if (member) {
		if (hasRoles(member, mutedRoles)) {
			await client.query(
				'UPDATE PUNICOES SET EXPIRED = TRUE, REMOVEREASON = ?, REMOVEADMINID = ?' +
					' WHERE CLIENTID LIKE ? AND' +
					" GUILDID LIKE ? AND EXPIRED = FALSE AND TIPO LIKE 'mute'",
				[reason, admin.id, user.id, guild.id]
			);
			await member.roles.remove(mutedRoles);
			embed.setTitle('Mute removido!');
			embed.setColor('#00ff00');
			await client.guildManager.logSnowflake(guild, moderation.logs, null, [
				embed,
			]);
			return 'Unmuted';
		}
		if (info.length !== 0) {
			await client.query(
				'UPDATE PUNICOES SET EXPIRED = TRUE, REMOVEREASON = ? WHERE CLIENTID LIKE ? AND' +
					" GUILDID LIKE ? AND EXPIRED = FALSE AND TIPO LIKE 'mute'",
				[reason, user.id, guild.id]
			);
			embed.setTitle('Mute removido da database!');
			embed.setDescription(
				'O utilizador não tinha nenhuma role de mute e tinha um mute ativo.'
			);
			embed.setColor('#ff9933');
			await client.guildManager.logSnowflake(guild, moderation.logs, null, [
				embed,
			]);
			return 'DBUnmuted';
		}
		return 'NotMuted';
	} else {
		if (info.length === 0) {
			return 'NotMuted';
		}
		await client.query(
			'UPDATE PUNICOES SET EXPIRED = TRUE, REMOVEREASON = ? WHERE CLIENTID LIKE ? AND' +
				" GUILDID LIKE ? AND EXPIRED = FALSE AND TIPO LIKE 'mute'",
			[reason, user.id, guild.id]
		);
		embed.setTitle('Mute removido da database!');
		embed.setDescription(
			'O utilizador não tinha nenhuma role de mute e tinha um mute ativo.'
		);
		embed.setColor('#ff9933');
		await client.guildManager.logSnowflake(guild, moderation.logs, null, [
			embed,
		]);
		return 'DBUnmuted';
	}
}
