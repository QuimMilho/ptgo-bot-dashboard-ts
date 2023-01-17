import { ChatInputCommandInteraction, EmbedBuilder, User } from 'discord.js';
import ExtendedClient from '../../../client/ExtendedClient';
import { kick } from '../../../strategies/moderation/kick';
import Command, { noPermission } from '../../Command';

export default class Kick extends Command {
	constructor(client: ExtendedClient) {
		super(client, {
			category: { name: 'moderation' },
			defaultMemberPermissions: 'ModerateMembers',
			description: 'Kickar um membro da guild',
			dmPermission: false,
			name: 'kick',
			options: [
				{
					description: 'Membro a kickar',
					name: 'user',
					required: true,
					type: 'User',
				},
				{
					description: 'Motivo do kick',
					name: 'motivo',
					required: false,
					type: 'String',
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
		const kicked = await kick(
			this.client,
			interaction.guild,
			user,
			interaction.member.user as User,
			motivo
		);

		let embed = new EmbedBuilder().setFooter({
			text: `memberId:${user.id} adminId:${interaction.member.user.id}`,
		});
		if (kicked === 'Kicked') {
			embed.setTitle('User kickado!');
			embed.setColor('#00ff00');
			embed.addFields([
				{ name: 'User', value: `<@${user.id}>`, inline: true },
				{
					name: 'Admin',
					value: `<@${interaction.member.user.id}>`,
					inline: true,
				},
				{ name: 'Motivo', value: motivo ? motivo : 'Sem motivo', inline: true },
			]);
		} else if (kicked === 'NotInServer') {
			embed.setTitle('Esse user não está no servidor!');
			embed.setColor('#ff0000');
		} else {
			embed.setColor('#ff0000');
			embed.setFooter(null);
			embed.setTitle('Ocorreu um erro ao executar esse comando!');
		}
		await interaction.editReply('Comando executado!');
		await interaction.followUp({ embeds: [embed] });
	};
}
