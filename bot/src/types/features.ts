import {
	ColorResolvable,
	EmojiResolvable,
	MessageEmbed,
	Snowflake,
} from 'discord.js';
import { CustomEmbed } from './Messages';

export interface FeatureList {
	name:
		| 'public'
		| 'moderation'
		| 'logs'
		| 'joinmessage'
		| 'leavemessage'
		| 'level'
		| 'ticket'
		| 'serverstats'
		| 'memberstats'
		| 'reactionroles'
		| 'anouncements'
		| 'giveaway'
		| 'polls'
		| 'forms'
		| 'serverlist'
		| 'stafflist';
}

export interface Features {
	public: PublicOptions;
	moderation: ModerationOptions;
	logs: LogsOptions;
	joinmessage: JoinMessageOptions;
	leavemessage: LeaveMessageOptions;
	level: LevelOptions;
	ticket: TicketOptions;
	serverstats: ServerStatsOptions;
	memberstats: MemberStatsOptions;
	reactionroles: ReactionRoleOptions;
	anouncements: AnounceOptions;
	giveaway: GiveAwayOptions;
	polls: PollOptions;
	forms: FormOptions;
	serverlist: ServerListOptions;
	stafflist: StaffListOptions;
}

/* Public */

export interface PublicOptions {
	public: boolean;
}

/* Moderation */

export interface ModerationOptions {
	active: boolean;
	automod: AutoModOptions;
	warns: WarningsOptions;
	timedPunitions: boolean;
	mutedRoles: Snowflake[];
	banRoles: boolean;
	bannedRoles: Snowflake[];
	moderators: Snowflake[];
	logs: Snowflake[];
}

export interface AutoModOptions {
	massEmoji: number;
	massMention: number;
	discordInvites: boolean;
	links: boolean;
	duplicatedMessages: boolean;
	autoDeleteMessages: Snowflake[];
}

export interface WarningsOptions {
	maxWarnings: number;
	muteTime: number;
	warnExpires: number;
}

/* Logs */

export interface LogsOptions {
	active: boolean;
	user: Snowflake[];
	chat: Snowflake[];
	message: Snowflake[];
	role: Snowflake[];
	invite: Snowflake[];
	member: Snowflake[];
}

/* Join Message */

export interface JoinMessageOptions {
	active: boolean;
	channels: JoinMessageChannelOptions;
	messages: JoinMessageMessageOptions;
}

export interface JoinMessageChannelOptions {
	logs: Snowflake[];
	invites: Snowflake[];
}

export interface JoinMessageMessageOptions {
	message: string;
	imagem: boolean;
	imageMessage: string;
	inviteMessage: string;
	noInviteMessage: string;
}

/* Leave Message */

export interface LeaveMessageOptions {
	active: boolean;
	logs: Snowflake[];
	messages: LeaveMessageMessageOptions;
}

export interface LeaveMessageMessageOptions {
	message: string;
	imagem: boolean;
	imageMessage: string;
}

/* Levels */

export interface LevelOptions {
	active: boolean;
	channel: Snowflake[];
	logs: Snowflake[];
	multipliers: MultiplierOptions[];
	rolesPerLevel: [];
}

export interface MultiplierOptions {
	id: Snowflake;
	mult: number;
}

export interface LevelRolesOptions {
	id: Snowflake;
	level: number;
}

/* Tickets */

export interface TicketOptions {
	active: boolean;
	createChannel: CreateTicketChannelOptions;
	roles: TicketRolesOptions;
	openMessage: OpenMessageTicketOptions;
}

export interface CreateTicketChannelOptions {
	category: Snowflake;
	selected: 'END' | 'ABOVE' | 'BELOW';
	channel: Snowflake;
}

export interface TicketRolesOptions {
	moderator: Snowflake[];
	staff: Snowflake[];
	forbiden: Snowflake[];
}

export interface OpenMessageTicketOptions {
	message: string;
	embed: CustomEmbed;
	button: OpenMessageButtonTicketOptions;
}

export interface OpenMessageButtonTicketOptions {
	label: string;
	color: 'PRIMARY' | 'SECUNDARY' | 'DANGER' | 'SUCCESS';
}

/* Server Stats */

export interface ServerStatsOptions {
	active: boolean;
	online: Snowflake;
	inServer: Snowflake;
}

/* Member Stats */

export interface MemberStatsOptions {
	active: boolean;
	roles: Snowflake[];
	logs: Snowflake[];
}

/* Reaction Roles */

export interface ReactionRoleOptions {
	active: boolean;
	messages: ReactionRoleMessageOptions[];
}

export interface ReactionRoleMessageOptions {
	message: Snowflake;
	emojis: ReactionRoleEmojisOptions[];
}

export interface ReactionRoleEmojisOptions {
	emoji: EmojiResolvable;
	role: Snowflake;
}

/* Anouncements */

export interface AnounceOptions {
	active: boolean;
	managerRoles: Snowflake[];
}

/* Giveaways */

export interface GiveAwayOptions {
	active: boolean;
}

/* Polls */

export interface PollOptions {
	active: boolean;
}

/* Forms */

export interface FormOptions {
	active: boolean;
	logs: Snowflake[];
	managerRoles: Snowflake[];
	forms: FormsOptions[];
}

export interface FormsOptions {
	id: string;
	name: string;
	questions: FormQuestionsOptions[];
	delay: number;
	answerDelay: number;
	responseChat: ResponseChatFormOptions;
	responseColor: ColorResolvable;
	questionColor: ColorResolvable;
	introColor: ColorResolvable;
	buttons: [];
	emojis: boolean;
	blockedRoles: Snowflake[];
}

export interface FormQuestionsOptions {
	index: number;
	question: string;
	type: 'STRING' | 'URL';
}

export interface ResponseChatFormOptions {
	guild: {
		id: Snowflake;
		name: string;
	};
	channel: {
		id: Snowflake;
		name: string;
	};
}

export interface FormButtonOptions {
	id: string;
	function: 'DM' | 'EMBED_DM' | 'SEND_MESSAGE' | 'SEND_EMBED' | 'SEND_FORM';
	message: string | CustomEmbed;
	label: string;
	type: 'SUCCESS' | 'PRIMARY' | 'SECONDARY' | 'DANGER';
	roles: Snowflake[];
	deleteAfter: boolean;
	channel: Snowflake;
	color: ColorResolvable;
}

/* Server List */

export interface ServerListOptions {
	active: boolean;
	servers: ServerOptions[],
	messages: Snowflake[]
}

export interface ServerOptions {
	ip: string;
	name: string;
}

/* Staff list */

export interface StaffListOptions {
	active: boolean;
	cargos: CargoOptions[],
	messages: Snowflake[]
}

export interface CargoOptions {
	id: Snowflake;
	staffs: StaffOptions[];
}

export interface StaffOptions {
	id: Snowflake;
	secondCargos: Snowflake[];
}