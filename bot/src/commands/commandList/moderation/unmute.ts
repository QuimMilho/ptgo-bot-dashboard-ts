import { EmbedBuilder } from 'discord.js';
import { ChatInputCommandInteraction, User } from 'discord.js';
import ExtendedClient from '../../../client/ExtendedClient';
import { unmute } from '../../../strategies/moderation/mute';
import Command from '../../Command';

export default class Unmute extends Command {
	constructor(client: ExtendedClient) {
		super(client, {
			category: { name: 'moderation' },
			defaultMemberPermissions: 'ModerateMembers',
			description: 'Retira o mute a um utilizador',
			dmPermission: false,
			options: [
				{
					description: 'User a remover o mute',
					name: 'user',
					required: true,
					type: 'User',
				},
				{
					description: 'Motivo do unmute',
					name: 'motivo',
					required: false,
					type: 'String',
					maxLength: 100,
				},
			],
			name: 'unmute',
		});
	}

	run = async (interaction: ChatInputCommandInteraction) => {
		const user = interaction.options.getUser('user');
		const motivo = interaction.options.getString('motivo');
		const unmuted = await unmute(
			this.client,
			interaction.guild,
			user,
			interaction.member.user as User,
			motivo
		);
		const embed = new EmbedBuilder().setFooter({
			text: `memberId:${user.id} adminId:${interaction.member.user.id}`,
		});
		if (unmuted === 'DBUnmuted') {
			embed.setTitle('Mute removido da base de dados!');
			embed.setDescription(
				'O utilizador não tinha nenhuma role de mute e tinha um mute ativo.'
			);
			embed.addFields([
				{ name: 'User', value: `<@${user.id}>`, inline: true },
				{
					name: 'Admin',
					value: `<@${interaction.member.user.id}>`,
					inline: true,
				},
				{ name: 'Motivo', value: motivo ? motivo : 'Sem motivo', inline: true },
			]);
			embed.setColor('#ff9933');
		} else if (unmuted === 'Unmuted') {
			embed.setTitle('Mute removido!');
			embed.addFields([
				{ name: 'User', value: `<@${user.id}>`, inline: true },
				{
					name: 'Admin',
					value: `<@${interaction.member.user.id}>`,
					inline: true,
				},
				{ name: 'Motivo', value: motivo ? motivo : 'Sem motivo', inline: true },
			]);
			embed.setColor('#00ff00');
		} else if (unmuted === 'NotMuted') {
			embed.setTitle('Esse utilizador não está mutado!');
			embed.setColor('#ff0000');
		} else {
			embed.setTitle('Ocorreu um erro ao tirar o mute desse utilizador!');
			embed.setColor('#ff0000');
		}
		await interaction.editReply('Comando executado!');
		await interaction.followUp({ embeds: [embed] });
	};
}
