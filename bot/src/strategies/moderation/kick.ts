import { EmbedBuilder, Guild, User } from 'discord.js';
import ExtendedClient from '../../client/ExtendedClient';
import { hasRoles } from '../permissions';

export async function kick(
	client: ExtendedClient,
	guild: Guild,
	user: User,
	admin: User,
	motivo?: string
): Promise<'Kicked' | 'Error' | 'NotInServer'> {
	const member = await guild.members.fetch(user.id);
	const moderation = client.guildManager.getFeatures(guild.id).moderation;
	const modRoles = moderation.moderators;
	if (
		member &&
		(hasRoles(member, modRoles) || member.permissions.has('Administrator'))
	) {
		return 'Error';
	}
	if (!member) {
		return 'NotInServer';
	}
	await client.query(
		'INSERT INTO PUNICOES (GUILDID, CLIENTID, ADMINID, TIMEDONE, EXPIRED, REASON, TIPO) VALUES ' +
			"(?, ?, ?, NOW(), TRUE, ?, 'kick')",
		[guild.id, user.id, admin.id, motivo]
	);
	await member.kick(motivo);
    const embed = new EmbedBuilder()
		.setTitle('User kickado!')
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
			{ name: 'Motivo', value: motivo ? motivo : 'Sem motivo', inline: true },
		]);
	client.guildManager.logSnowflake(guild, moderation.logs, null, [embed]);
	return 'Kicked';
}
