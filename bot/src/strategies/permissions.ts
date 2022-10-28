import { APIInteractionGuildMember, Guild, GuildMember, Snowflake, User } from 'discord.js';
import ExtendedClient from '../client/ExtendedClient';
import { DBPermaRoles } from '../types/Database';
import { Features } from '../types/Features';

export function getMemberPerms(
	client: ExtendedClient,
	guild: Guild,
	member: GuildMember
): (
	| 'ADMINISTRATOR'
	| 'MODERATOR'
	| 'TICKET_STAFF'
	| 'TICKET_MOD'
	| 'TICKET_FORBIDEN'
	| 'ANOUNCEMENTS'
	| 'GIVEAWAY'
	| 'POLLS'
	| 'FORMS'
	| 'MUTED'
	| 'BANNED'
)[] {
	if (member.permissions.has('Administrator')) return ['ADMINISTRATOR'];
	const features: Features = client.guildManager.getFeatures(guild.id);
	let perms: (
		| 'ADMINISTRATOR'
		| 'MODERATOR'
		| 'TICKET_STAFF'
		| 'TICKET_MOD'
		| 'TICKET_FORBIDEN'
		| 'ANOUNCEMENTS'
		| 'GIVEAWAY'
		| 'POLLS'
		| 'FORMS'
		| 'MUTED'
		| 'BANNED'
	)[] = [];
	if (features.moderation.active) {
		if (hasRoles(member, features.moderation.moderators)) {
			perms.push('MODERATOR');
		}
		if (hasRoles(member, features.moderation.bannedRoles)) {
			perms.push('BANNED');
		}
		if (hasRoles(member, features.moderation.mutedRoles)) {
			perms.push('MUTED');
		}
	}
	if (features.ticket.active) {
		if (hasRoles(member, features.ticket.roles.moderator)) {
			perms.push('TICKET_MOD');
		}
		if (hasRoles(member, features.ticket.roles.staff)) {
			perms.push('TICKET_STAFF');
		}
		if (hasRoles(member, features.ticket.roles.forbiden)) {
			perms.push('TICKET_FORBIDEN');
		}
	}
	if (features.anouncements.active) {
		if (hasRoles(member, features.anouncements.managerRoles)) {
			perms.push('ANOUNCEMENTS');
		}
	}
	if (features.giveaway.active) {
		if (hasRoles(member, features.giveaway.managerRoles)) {
			perms.push('GIVEAWAY');
		}
	}
	if (features.polls.active) {
		if (hasRoles(member, features.polls.managerRoles)) {
			perms.push('POLLS');
		}
	}
	if (features.forms.active) {
		if (hasRoles(member, features.forms.managerRoles)) {
			perms.push('FORMS');
		}
	}
	return perms;
}

export async function getUserPerms(
	client: ExtendedClient,
	guild: Guild,
	user: User
): Promise<('TICKET_FORBIDEN' | 'MUTED' | 'BANNED')[]> {
	let perms: ('TICKET_FORBIDEN' | 'MUTED' | 'BANNED')[] = [];
	const features: Features = client.guildManager.getFeatures(guild.id);
	if (features.moderation.active) {
		if (
			await hasPermaRole(client, guild.id, user.id, features.moderation.bannedRoles)
		) {
			perms.push('BANNED');
		}
		if (
			await hasPermaRole(client, guild.id, user.id, features.moderation.mutedRoles)
		) {
			perms.push('MUTED');
		}
	}
	if (features.ticket.active) {
		if (
			await hasPermaRole(client, guild.id, user.id, features.ticket.roles.forbiden)
		) {
			perms.push('TICKET_FORBIDEN');
		}
	}
	return perms;
}

export function hasRole(member: GuildMember, role: Snowflake): boolean {
	for (let i = 0; i < member.roles.cache.size; i++) {
		if (member.roles.cache.at(i).id === role) return true;
	}
	return false;
}

export function hasRoles(member: GuildMember, roles: Snowflake[]): boolean {
	for (let i = 0; i < member.roles.cache.size; i++) {
		if (roles.includes(member.roles.cache.at(i).id)) return true;
	}
	return false;
}

export async function hasPermaRole(
	client: ExtendedClient,
	guildId: Snowflake,
	userId: Snowflake,
	roles: Snowflake[]
): Promise<boolean> {
	const results: DBPermaRoles[] = await client.query(
		'SELECT roleId FROM permaRoles WHERE expired = false AND guildId LIKE ? AND clientId LIKE ?',
		[guildId, userId]
	);
	for (let i = 0; i < results.length; i++) {
		const result = results[i];
		if (roles.includes(result.roleId)) return true;
	}
	return false;
}
