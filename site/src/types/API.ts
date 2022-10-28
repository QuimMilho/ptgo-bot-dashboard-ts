export interface BotInfo {
	nServers: number;
	upTime: number;
}

export interface GuildInfo {
	id: string;
	icon: string;
	memberCount: number;
	premiumSubscriptionCount: number;
	channels: ChannelInfo[];
	members: MemberInfo[];
	roles: RoleInfo[];
	name: string;
}

export interface ChannelInfo {
	id: string;
	name: string;
	type:
		| 'AnnouncementThread'
		| 'DM'
		| 'GroupDM'
		| 'GuildAnnouncement'
		| 'GuildCategory'
		| 'GuildDirectory'
		| 'GuildForum'
		| 'GuildStageVoice'
		| 'GuildText'
		| 'GuildVoice'
		| 'PrivateThread'
		| 'PublicThread'
		| string;
	parent: ChannelInfo | null;
}

export interface MemberInfo {
	id: string;
	displayName: string;
	displayAvatarURL: string;
	username: string;
	discriminator: string;
	createdTimeStamp: number;
}

export interface RoleInfo {
	id: string;
	name: string;
	colorHex: string;
}

export interface ExtendedMemberInfo {
	id: string;
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
