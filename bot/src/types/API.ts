import { Snowflake } from 'discord.js';

export interface BotInfo {
	nServers: number;
	upTime: number;
}

export interface GuildInfo {
	id: Snowflake;
	memberCount: number;
	premiumSubscriptionCount: number;
	channels: ChannelInfo[];
	members: MemberInfo[];
	roles: RoleInfo[];
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
