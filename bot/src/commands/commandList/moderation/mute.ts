import {
	ChatInputCommandInteraction,
	CommandInteraction,
	EmbedBuilder,
	User,
} from 'discord.js';
import ExtendedClient from '../../../client/ExtendedClient';
import { mute } from '../../../strategies/moderation/mute';
import Command from '../../Command';

export default class Mute extends Command {
	constructor(client: ExtendedClient) {
		super(client, {
			category: { name: 'moderation' },
			defaultMemberPermissions: null,
			description: 'Muta um utilizador por tempo indeterminado',
			dmPermission: false,
			name: 'mute',
			options: [
				{
					description: 'Utilizador a mutar',
					name: 'user',
					required: true,
					type: 'User',
				},
				{
					description: 'Motivo do mute',
					name: 'motivo',
					required: false,
					type: 'String',
				},
			],
		});
	}

	run = async (interaction: ChatInputCommandInteraction) => {
		const user = interaction.options.getUser('user');
		const motivo = interaction.options.getString('motivo');
		const muted = await mute(
			this.client,
			interaction.guild,
			user,
			interaction.member.user as User,
			motivo
		).catch((err) => console.log(err));
		let embed = new EmbedBuilder();
		if (!muted) {
			return interaction.editReply(
				'Ocorreu um erro ao executares esse comando!'
			);
		} else if (muted === 'Muted') {
			embed.setTitle('User mutado!');
			embed.setFooter({
				text: `memberId:${user.id} adminId:${interaction.member.user.id}`,
			});
			embed.setColor('#00ff00');
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
		} else if (muted === 'AlreadyMuted') {
			embed.setTitle('User já mutado!');
			embed.setColor('#ff0000');
			embed.setFooter({
				text: `memberId:${user.id} adminId:${interaction.member.user.id}`,
			});
		} else {
			embed.setTitle('Ocorreu um erro ao executar esse comando!');
			embed.setColor('#ff0000');
		}
		await interaction.editReply('Comando executado!');
		await interaction.followUp({ embeds: [embed] });
	};
}
