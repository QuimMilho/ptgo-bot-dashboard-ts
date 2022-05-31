import {
	Collection,
	Guild,
	GuildMember,
	Invite,
	InviteGuild,
	Snowflake,
	User,
} from 'discord.js';
import { SimpleId } from '../types/invites';
import DiscordClient from './Client';

export interface SmallInvite {
	guild: Guild | InviteGuild;
	code: string;
	url: string;
	uses: number;
	maxUses: number;
	maxAge: number;
	createdTimeStamp: number;
	inviter: User;
}

export interface UsedInvite {
	code: string;
	inviter: User;
	inviterInvites: number;
}

export default class InviteManager {
	client: DiscordClient;
	guildCache: Collection<Snowflake, Collection<string, SmallInvite>>;

	constructor(client: DiscordClient) {
		this.client = client;

		this.guildCache = new Collection();

		for (let i = 0; i < this.client.guilds.cache.size; i++) {
			const guild = this.client.guilds.cache.at(i);
			this.fetchGuildInvites(guild);
		}
	}

	getInviteInfo(invite: Invite) {
		const smallInvite: SmallInvite = {
			guild: invite.guild,
			code: invite.code,
			url: invite.url,
			uses: invite.uses,
			maxUses: invite.maxUses,
			maxAge: invite.maxAge,
			createdTimeStamp: invite.createdTimestamp,
			inviter: invite.inviter,
		};
		return smallInvite;
	}

	async fetchGuildInvites(guild: Guild) {
		let inviteCache = new Collection<string, SmallInvite>();
		const invites = await guild.invites.fetch();

		for (let i = 0; i < invites.size; i++) {
			const invite: SmallInvite = this.getInviteInfo(invites.at(i));
			inviteCache.set(invite.code, invite);
		}

		this.guildCache.set(guild.id, inviteCache);
	}

	createInvite(invite: Invite) {
		const inviteCache = this.guildCache.get(invite.guild.id);
		inviteCache.set(invite.code, this.getInviteInfo(invite));
	}

	deleteInvite(invite: Invite) {
		const inviteCache = this.guildCache.get(invite.guild.id);
		const tempInvite = inviteCache.get(invite.code);
		inviteCache.delete(invite.code);
		return tempInvite;
	}

	async getUsedInvite(member: GuildMember) {
		const inviteCache = this.guildCache.get(member.guild.id);
		const guildInvites = await member.guild.invites.fetch();
		for (let i = 0; i < guildInvites.size; i++) {
			const invite = guildInvites.at(i);
			const cachedInvite = inviteCache.get(invite.code);
			if (cachedInvite.uses < invite.uses) {
				await this.client.mysql.query(
					'INSERT INTO invites (guildId, clientId, inviterId, inviteCode) VALUES (?, ?, ?, ?)',
					[member.guild.id, member.id, invite.inviter.id, invite.code]
				);
				const results: SimpleId[] = await this.client.mysql.query(
					'SELECT id FROM invites WHERE guildId LIKE ? AND inviterId LIKE ?',
					[member.guild.id, invite.inviter.id]
				)[0];
				cachedInvite.uses = invite.uses;
                const usedInvite: UsedInvite = {
					code: invite.code,
					inviter: invite.inviter,
					inviterInvites: results.length,
				}
				return usedInvite;
			}
		}
		return undefined;
	}

    removeUserInvite(member: GuildMember) {
		this.client.mysql.query(
			'DELETE FROM invites WHERE guildId LIKE ? AND clientId LIKE ?',
			[member.guild.id, member.id]
		);
	}
}
