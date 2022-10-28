import { ChatInputCommandInteraction, EmbedBuilder, User } from 'discord.js';
import ExtendedClient from '../../../client/ExtendedClient';
import { ban } from '../../../strategies/moderation/ban';
import Command, { noPermission } from '../../Command';

export default class Mute extends Command {
	constructor(client: ExtendedClient) {
		super(client, {
			category: { name: 'moderation' },
			defaultMemberPermissions: 'ModerateMembers',
			description: 'Muta um utilizador por tempo indeterminado',
			dmPermission: false,
			name: 'ban',
			options: [
				{
					description: 'Utilizador a banir',
					name: 'user',
					required: true,
					type: 'User',
				},
				{
					description: 'Motivo do ban',
					name: 'motivo',
					required: false,
					type: 'String',
					maxLength: 100,
				},
			],
		});
	}

	run = async (interaction: ChatInputCommandInteraction) => {
		const member = await interaction.guild.members.fetch(
			interaction.member.user.id
		);
		if (
			noPermission(
				interaction,
				member,
				this.client.guildManager.getFeatures(interaction.guild.id).moderation
					.moderators
			)
		)
			return;

		const user = interaction.options.getUser('user');
		const motivo = interaction.options.getString('motivo');
		const banned = await ban(
			this.client,
			interaction.guild,
			user,
			interaction.member.user as User,
			motivo
		);
		const embed = new EmbedBuilder().setFooter({
			text: `memberId:${user.id} adminId:${interaction.member.user.id}`,
		});
		if (banned === 'AlreadyBanned') {
			embed.setTitle('Esse utilizador já estava banido!');
			embed.setColor('#ff0000');
			embed.setFooter({
				text: `memberId:${user.id} adminId:${interaction.member.user.id}`,
			});
		} else if (banned === 'AlreadyBannedDiscord') {
			embed.setTitle('Esse utilizador já estava banido do discord!');
			embed.setColor('#ff0000');
			embed.setFooter({
				text: `memberId:${user.id} adminId:${interaction.member.user.id}`,
			});
		} else if (banned === 'Banned') {
			embed.setTitle('User banido!');
			embed.setColor('#00ff00');
			embed.setFooter({
				text: `memberId:${user.id} adminId:${interaction.member.user.id}`,
			});
			embed.addFields([
				{ name: 'User', value: `<@${user.id}>`, inline: true },
				{
					name: 'Admin',
					value: `<@${interaction.member.user.id}>`,
					inline: true,
				},
				{ name: 'Duração', value: 'Indeterminado', inline: true },
				{ name: 'Motivo', value: motivo ? motivo : 'Sem motivo', inline: true },
			]);
		} else if (banned === 'BannedDiscord') {
			embed.setTitle('User banido do discord!');
			embed.setColor('#00ff00');
			embed.setFooter({
				text: `memberId:${user.id} adminId:${interaction.member.user.id}`,
			});
			embed.addFields([
				{ name: 'User', value: `<@${user.id}>`, inline: true },
				{
					name: 'Admin',
					value: `<@${interaction.member.user.id}>`,
					inline: true,
				},
				{ name: 'Duração', value: 'Indeterminado', inline: true },
				{ name: 'Motivo', value: motivo ? motivo : 'Sem motivo', inline: true },
			]);
		} else {
			embed.setTitle('Ocorreu um erro ao executares esse comando!');
			embed.setColor('#00ff00');
			embed.setFooter(null);
		}
		await interaction.editReply('Comando executado!');
		await interaction.followUp({ embeds: [embed] });
	};
}
