import { EmbedBuilder, Guild, User } from 'discord.js';
import ExtendedClient from '../../client/ExtendedClient';
import { BDPunitions } from '../../types/Database';
import { hasRoles } from '../permissions';

export async function ban(
	client: ExtendedClient,
	guild: Guild,
	user: User,
	admin: User,
	reason?: string
): Promise<
	| 'Banned'
	| 'BannedDiscord'
	| 'AlreadyBanned'
	| 'AlreadyBannedDiscord'
	| 'Error'
> {
	const member = await guild.members.fetch(user.id).catch(console.log);
	const moderation = client.guildManager.getFeatures(guild.id).moderation;
	const bannedRoles = moderation.bannedRoles;
	const modRoles = moderation.moderators;
	if (
		member &&
		(hasRoles(member, modRoles) || member.permissions.has('Administrator'))
	) {
		return 'Error';
	}
	if (await guild.bans.fetch(user.id).catch(console.log)) {
		return 'AlreadyBannedDiscord';
	} else if (member && moderation.banRoles && hasRoles(member, bannedRoles)) {
		return 'AlreadyBanned';
	}
	const info: BDPunitions[] = await client.query(
		'SELECT * FROM PUNICOES WHERE GUILDID LIKE ? AND CLIENTID LIKE ? AND' +
			" EXPIRED = FALSE AND TIPO LIKE 'ban'",
		[guild.id, user.id]
	);
	if (info.length > 0 && !member && moderation.banRoles) {
		return 'AlreadyBanned';
	}
	await client.query(
		'INSERT INTO PUNICOES (GUILDID, CLIENTID, ADMINID, TIMEDONE, EXPIRED, REASON, TIPO) VALUES ' +
			"(?, ?, ?, NOW(), false, ?, 'ban')",
		[guild.id, user.id, admin.id, reason]
	);
	const embed = new EmbedBuilder()
		.setTitle('User banido!')
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
	if (moderation.banRoles) {
		if (member) {
			await member.roles.add(bannedRoles);
		}
		return 'Banned';
	} else {
		await guild.bans.create(user.id, { reason });
		return 'BannedDiscord';
	}
}

export async function tempban(
	client: ExtendedClient,
	guild: Guild,
	user: User,
	admin: User,
	time: number,
	reason?: string
): Promise<
	| 'Banned'
	| 'BannedDiscord'
	| 'AlreadyBanned'
	| 'AlreadyBannedDiscord'
	| 'Error'
> {
	const member = await guild.members.fetch(user.id).catch(console.log);
	const moderation = client.guildManager.getFeatures(guild.id).moderation;
	const bannedRoles = moderation.bannedRoles;
	const modRoles = moderation.moderators;
	if (
		member &&
		(hasRoles(member, modRoles) || member.permissions.has('Administrator'))
	) {
		return 'Error';
	}
	if (await guild.bans.fetch(user.id).catch(console.log)) {
		return 'AlreadyBannedDiscord';
	} else if (member && moderation.banRoles && hasRoles(member, bannedRoles)) {
		return 'AlreadyBanned';
	}
	const info: BDPunitions[] = await client.query(
		'SELECT * FROM PUNICOES WHERE GUILDID LIKE ? AND CLIENTID LIKE ? AND' +
			" EXPIRED = FALSE AND TIPO LIKE 'ban'",
		[guild.id, user.id]
	);
	if (info.length > 0 && !member && moderation.banRoles) {
		return 'AlreadyBanned';
	}
	await client.query(
		'INSERT INTO PUNICOES (GUILDID, CLIENTID, ADMINID, TIMEDONE, EXPIRES, EXPIRED, REASON, TIPO) VALUES ' +
			"(?, ?, ?, NOW(), NOW() + INTERVAL ? MINUTE, false, ?, 'ban')",
		[guild.id, user.id, admin.id, time, reason]
	);
	const embed = new EmbedBuilder()
		.setTitle('User banido!')
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
	if (moderation.banRoles) {
		if (member) {
			await member.roles.add(bannedRoles);
		}
		return 'Banned';
	} else {
		await guild.bans.create(user.id, { reason });
		return 'BannedDiscord';
	}
}

export async function unban(
	client: ExtendedClient,
	guild: Guild,
	user: User,
	admin: User,
	reason?: string
): Promise<'Unbanned' | 'DBUnbanned' | 'NotBanned' | 'Error'> {
	const member = await guild.members.fetch(user.id).catch(console.log);
	const moderation = client.guildManager.getFeatures(guild.id).moderation;
	const bannedRoles = moderation.bannedRoles;
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

	const ban = await guild.bans.fetch(user.id).catch(console.log);
	if (ban) {
		await client.query(
			'UPDATE PUNICOES SET EXPIRED = TRUE, REMOVEREASON = ?, REMOVEADMINID = ? ' +
				' WHERE CLIENTID LIKE ? AND' +
				" GUILDID LIKE ? AND EXPIRED = FALSE AND TIPO LIKE 'ban'",
			[reason, admin.id, user.id, guild.id]
		);
		await guild.bans.remove(user.id);
		embed.setTitle('Ban removido do discord!');
		embed.setColor('#00ff00');
		client.guildManager.logSnowflake(guild, moderation.logs, null, [embed]);
		return 'Unbanned';
	} else if (member) {
		if (hasRoles(member, bannedRoles)) {
			await client.query(
				'UPDATE PUNICOES SET EXPIRED = TRUE, REMOVEREASON = ?, REMOVEADMINID = ? ' +
					' WHERE CLIENTID LIKE ? AND' +
					" GUILDID LIKE ? AND EXPIRED = FALSE AND TIPO LIKE 'ban'",
				[reason, admin.id, user.id, guild.id]
			);
			member.roles.remove(bannedRoles);
			embed.setTitle('Ban removido!');
			embed.setColor('#00ff00');
			client.guildManager.logSnowflake(guild, moderation.logs, null, [embed]);
			return 'Unbanned';
		}
	}
	const info: BDPunitions[] = await client.query(
		'SELECT * FROM PUNICOES WHERE GUILDID LIKE ? AND CLIENTID LIKE ? AND' +
			" EXPIRED = FALSE AND TIPO LIKE 'ban'",
		[guild.id, user.id]
	);
	if (info.length === 0) {
		return 'NotBanned';
	} else {
		await client.query(
			'UPDATE PUNICOES SET EXPIRED = TRUE, REMOVEREASON = ?, REMOVEADMINID = ? ' +
				' WHERE CLIENTID LIKE ? AND' +
				" GUILDID LIKE ? AND EXPIRED = FALSE AND TIPO LIKE 'ban'",
			[reason, admin.id, user.id, guild.id]
		);
		embed.setTitle('Ban removido da database!');
		embed.setColor('#ff9933');
		client.guildManager.logSnowflake(guild, moderation.logs, null, [embed]);
		return 'DBUnbanned';
	}
}
