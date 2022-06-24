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
		| 'stafflist'
		| 'general';
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
	general: Feature;
}

export interface Feature {
	active: boolean;
}

/* Public */

export interface PublicOptions extends Feature {}

/* Moderation */

export interface ModerationOptions extends Feature {
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

export interface LogsOptions extends Feature {
	user: Snowflake[];
	chat: Snowflake[];
	message: Snowflake[];
	role: Snowflake[];
	invite: Snowflake[];
	member: Snowflake[];
}

/* Join Message */

export interface JoinMessageOptions extends Feature {
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

export interface LeaveMessageOptions extends Feature {
	logs: Snowflake[];
	messages: LeaveMessageMessageOptions;
}

export interface LeaveMessageMessageOptions {
	message: string;
	imagem: boolean;
	imageMessage: string;
}

/* Levels */

export interface LevelOptions extends Feature {
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

export interface TicketOptions extends Feature {
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

export interface ServerStatsOptions extends Feature {
	online: Snowflake;
	inServer: Snowflake;
}

/* Member Stats */

export interface MemberStatsOptions extends Feature {
	roles: Snowflake[];
	logs: Snowflake[];
}

/* Reaction Roles */

export interface ReactionRoleOptions extends Feature {
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

export interface AnounceOptions extends Feature {
	managerRoles: Snowflake[];
}

/* Giveaways */

export interface GiveAwayOptions extends Feature {}

/* Polls */

export interface PollOptions extends Feature {}

/* Forms */

export interface FormOptions extends Feature {
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

export interface ServerListOptions extends Feature {
	servers: ServerOptions[];
	messages: Snowflake[];
}

export interface ServerOptions {
	ip: string;
	name: string;
}

/* Staff list */

export interface StaffListOptions extends Feature {
	cargos: CargoOptions[];
	messages: Snowflake[];
}

export interface CargoOptions {
	id: Snowflake;
	staffs: StaffOptions[];
}

export interface StaffOptions {
	id: Snowflake;
	secondCargos: Snowflake[];
}
