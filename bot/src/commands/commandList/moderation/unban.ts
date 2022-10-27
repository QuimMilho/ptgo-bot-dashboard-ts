import { EmbedBuilder } from 'discord.js';
import { ChatInputCommandInteraction, User } from 'discord.js';
import ExtendedClient from '../../../client/ExtendedClient';
import { unban } from '../../../strategies/moderation/ban';
import { unmute } from '../../../strategies/moderation/mute';
import Command from '../../Command';

export default class Unmute extends Command {
	constructor(client: ExtendedClient) {
		super(client, {
			category: { name: 'moderation' },
			defaultMemberPermissions: 'ModerateMembers',
			description: 'Retira o ban a um utilizador',
			dmPermission: false,
			options: [
				{
					description: 'User a remover o ban',
					name: 'user',
					required: true,
					type: 'User',
				},
				{
					description: 'Motivo do unban',
					name: 'motivo',
					required: false,
					type: 'String',
					maxLength: 100,
				},
			],
			name: 'unban',
		});
	}

	run = async (interaction: ChatInputCommandInteraction) => {
		const user = interaction.options.getUser('user');
		const motivo = interaction.options.getString('motivo');
		const unbanned = await unban(
			this.client,
			interaction.guild,
			user,
			interaction.member.user as User,
			motivo
		);
		const embed = new EmbedBuilder().setFooter({
			text: `memberId:${user.id} adminId:${interaction.member.user.id}`,
		});
		if (unbanned === 'DBUnbanned') {
			embed.setTitle('Ban removido da base de dados!');
			embed.setColor('#ff9933');
			embed.addFields([
				{ name: 'User', value: `<@${user.id}>`, inline: true },
				{
					name: 'Admin',
					value: `<@${interaction.member.user.id}>`,
					inline: true,
				},
				{ name: 'Motivo', value: motivo ? motivo : 'Sem motivo', inline: true },
			]);
		} else if (unbanned === 'NotBanned') {
			embed.setTitle('Esse utilizador não está banido!');
			embed.setColor('#ff0000');
		} else if (unbanned === 'Unbanned') {
			embed.setTitle('Ban removido!');
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
		} else {
			embed.setTitle('Ocorreu um erro ao executares esse comando!');
			embed.setColor('#ff0000');
			embed.setFooter(null);
		}
		await interaction.editReply('Comando executado!');
		await interaction.followUp({ embeds: [embed] });
	};
}
