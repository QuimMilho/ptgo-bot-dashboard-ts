import { CustomEmbed, CustomSmallButton, Messages } from './Messages';

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
	mutedRoles: string[];
	banRoles: boolean;
	bannedRoles: string[];
	moderators: string[];
	logs: string[];
}

export interface AutoModOptions {
	massEmoji: number;
	massMention: number;
	discordInvites: boolean;
	links: boolean;
	duplicatedMessages: boolean;
	autoDeleteMessages: string[];
}

export interface WarningsOptions {
	maxWarnings: number;
	muteTime: number;
	warnExpires: number;
}

/* Logs */

export interface LogsOptions extends Feature {
	user: string[];
	chat: string[];
	message: string[];
	role: string[];
	invite: string[];
	member: string[];
}

/* Join Message */

export interface JoinMessageOptions extends Feature {
	channels: JoinMessageChannelOptions;
	messages: JoinMessageMessageOptions;
}

export interface JoinMessageChannelOptions {
	logs: string[];
	invites: string[];
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
	logs: string[];
	messages: LeaveMessageMessageOptions;
}

export interface LeaveMessageMessageOptions {
	message: string;
	imagem: boolean;
	imageMessage: string;
}

/* Levels */

export interface LevelOptions extends Feature {
	channel: string[];
	logs: string[];
	multipliers: MultiplierOptions[];
	rolesPerLevel: [];
}

export interface MultiplierOptions {
	id: string;
	mult: number;
}

export interface LevelRolesOptions {
	id: string;
	level: number;
}

/* Tickets */

export interface TicketOptions extends Feature {
	createChannel: CreateTicketChannelOptions;
	roles: TicketRolesOptions;
	openMessage: OpenMessageTicketOptions;
}

export interface CreateTicketChannelOptions {
	category: string;
	selected: 'END' | 'ABOVE' | 'BELOW';
	channel: string;
}

export interface TicketRolesOptions {
	moderator: string[];
	staff: string[];
	forbiden: string[];
}

export interface OpenMessageTicketOptions {
	message: string;
	embed: CustomEmbed;
	button: CustomSmallButton;
}

/* Server Stats */

export interface ServerStatsOptions extends Feature {
	online: string;
	inServer: string;
}

/* Member Stats */

export interface MemberStatsOptions extends Feature {
	roles: string[];
	logs: string[];
}

/* Reaction Roles */

export interface ReactionRoleOptions extends Feature {
	messages: ReactionRoleMessageOptions[];
}

export interface ReactionRoleMessageOptions {
	message: string;
	emojis: ReactionRoleEmojisOptions[];
}

export interface ReactionRoleEmojisOptions {
	emoji: string;
	role: string;
}

/* Anouncements */

export interface AnounceOptions extends Feature {
	managerRoles: string[];
}

/* Giveaways */

export interface GiveAwayOptions extends Feature {
	managerRoles: string[];
}

/* Polls */

export interface PollOptions extends Feature {
	managerRoles: string[];
}

/* Forms */

export interface FormOptions extends Feature {
	logs: string[];
	managerRoles: string[];
	forms: FormsOptions[];
}

export interface FormsOptions {
	id: string;
	name: string;
	questions: FormQuestionsOptions[];
	delay: number;
	answerDelay: number;
	responseChat: ResponseChatFormOptions;
	responseColor: string;
	questionColor: string;
	introColor: string;
	buttons: FormButtonOptions[];
	emojis: boolean;
	blockedRoles: string[];
}

export interface FormQuestionsOptions {
	index: number;
	question: string;
	type: 'STRING' | 'URL';
}

export interface ResponseChatFormOptions {
	guild: {
		id: string;
		name: string;
	};
	channel: {
		id: string;
		name: string;
	};
}

export interface FormButtonOptions {
	function: 'SEND_DM' | 'SEND_MESSAGE' | 'SEND_FORM';
	message: Messages;
	label: string;
	type: 'SUCCESS' | 'PRIMARY' | 'SECONDARY' | 'DANGER';
	roles: string[];
	deleteAfter: boolean;
	disableAfter: boolean;
	channel: string;
	color: string;
	index: number;
}

/* Server List */

export interface ServerListOptions extends Feature {
	servers: ServerOptions[];
	messages: string[];
}

export interface ServerOptions {
	ip: string;
	name: string;
}

/* Staff list */

export interface StaffListOptions extends Feature {
	cargos: CargoOptions[];
	messages: string[];
}

export interface CargoOptions {
	id: string;
	staffs: StaffOptions[];
}

export interface StaffOptions {
	id: string;
	secondCargos: string[];
}
