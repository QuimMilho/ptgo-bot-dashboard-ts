import { Snowflake } from 'discord.js';

export interface BotInfo {
	nServers: number;
	upTime: number;
}

export interface GuildInfo {
	id: Snowflake;
	icon: string;
	memberCount: number;
	premiumSubscriptionCount: number;
	channels: ChannelInfo[];
	members: MemberInfo[];
	roles: RoleInfo[];
	name: string;
}

export interface ChannelInfo {
	id: Snowflake;
	name: string;
	type: string;
	parent: ChannelInfo | null;
}

export interface MemberInfo {
	id: Snowflake;
	displayName: string;
	displayAvatarURL: string;
	username: string;
	discriminator: string;
	createdTimeStamp: number;
}

export interface RoleInfo {
	id: Snowflake;
	name: string;
	colorHex: string;
}

export interface ExtendedMemberInfo {
	id: Snowflake;
	displayName: string;
	displayAvatarURL: string;
	username: string;
	discriminator: string;
	createdTimeStamp: number;
	highestRole: RoleInfo | null;
	permissions: (
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
	)[];
	premium: Date | undefined;
}

export interface APIUserInfo {
	servers: APIUserGuildsInfo[];
	user: APIDiscordUserInfo;
}

export interface APIDiscordUserInfo {
	username: string | null;
	discriminator: string | null;
	avatarURL: string | null;
}

export interface APIUserGuildsInfo {
	guild: GuildInfo;
	member: ExtendedMemberInfo;
}
