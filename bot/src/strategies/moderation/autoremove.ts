import { Guild, User } from 'discord.js';
import ExtendedClient from '../../client/ExtendedClient';
import { BDPunitions } from '../../types/Database';
import { unban } from './ban';
import { unmute } from './mute';

export async function autoremoveMod(client: ExtendedClient) {
	const puns: BDPunitions[] = await client.query(
		'SELECT * FROM PUNICOES WHERE EXPIRES IS NOT NULL AND EXPIRED = FALSE AND ' +
			'NOW() > EXPIRES',
		[]
	);
	for (let i = 0; i < puns.length; i++) {
		const pun = puns[i];
		const guild = await client.guilds.fetch(pun.guildId).catch(console.log);
		const user = await client.users.fetch(pun.clientId).catch(console.log);
		if (!guild || !user) {
			console.log(
				'Ocorreu um erro ao remover um ban! User ou Guild não existem!',
				pun
			);
			continue;
		}
		if (pun.tipo === 'ban') {
			const unbanned = await unban(
				client,
				guild,
				user,
				client.user,
				'Expirado'
			);
			if (unbanned === 'DBUnbanned') {
				console.log('Ban removido da base de dados! UserId:' + user.id);
			} else if (unbanned === 'Unbanned') {
				console.log('Ban removido! UserId:' + user.id);
			} else if (unbanned === 'NotBanned') {
				console.log('Esse utilizador não está banido! UserId:' + user.id);
			} else {
				console.log('Ocorreu um erro ao retirar um ban! UserId:' + user.id);
			}
		} else if (pun.tipo === 'mute') {
			const unmuted = await unmute(
				client,
				guild,
				user,
				client.user,
				'Expirado'
			);
			if (unmuted === 'DBUnmuted') {
				console.log('Mute removido da base de dados! UserId:' + user.id);
			} else if (unmuted === 'Unmuted') {
				console.log('Mute removido! UserId:' + user.id);
			} else if (unmuted === 'NotMuted') {
				console.log('Esse utilizador não está mutado! UserId:' + user.id);
			} else {
				console.log('Ocorreu um erro ao retirar um mute! UserId:' + user.id);
			}
		} else if (pun.tipo === 'warning') {
		}
	}
}

export async function autoremoveRoles(client: ExtendedClient) {}

export function registerInTimerModeration(client: ExtendedClient) {
	client.timeManager.register(() => autoremoveMod(client));
	client.timeManager.register(() => autoremoveRoles(client));
	console.log('Timers de moderação adicionados!');
}
