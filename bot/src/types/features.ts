import {
	Collection,
	EmojiResolvable,
	Snowflake,
} from 'discord.js';

export interface FeaturesString {
	feature:
		| 'moderacao'
		| 'logs'
		| 'join'
		| 'leave'
		| 'levels'
		| 'ticket'
		| 'serverStats'
		| 'memberStats'
		| 'reactRole'
		| 'anuncios'
		| 'giveaway'
		| 'polls'
		| 'forms'
		| 'servers'
		| 'staffs';
}

export interface SettingsOptions {
	moderacao: ModeracaoOptions | undefined;
	logs: LogOptions | undefined;
	join: JoinOptions | undefined;
	leave: LeaveOptions | undefined;
	levels: LevelOptions | undefined;
	ticket: TicketOptions | undefined;
	serverStats: ServerStatsOptions | undefined;
	memberStats: MemberStatsOptions | undefined;
	reactRole: ReactionRolesOptions | undefined;
	anuncios: AnunciosOptions | undefined;
	giveaway: GiveAwayOptions | undefined;
	polls: PollsOptions | undefined;
	forms: FormsOptions | undefined;
	servers: ServersOptions | undefined;
	staffs: StaffOptions | undefined;
}

export interface ModeracaoOptions {
	automod: AutoModOptions;
	warns: WarnOptions;
	mutedRoles: string[];
	bannedRoles: string[];
	banRoles: boolean;
	moderator: string[];
	logs: string[];
}

export interface AutoModOptions {
	massemoji: number;
	massmention: number;
	discordInvites: boolean;
	links: boolean;
	duplicatedMessages: boolean;
}

export interface WarnOptions {
	max: number;
	muteTime: number;
	expires: number;
}

export interface LogOptions {
	user: string[];
	chats: string[];
	mensagens: string[];
	roles: string[];
	invites: string[];
	members: string[];
	error: string[];
}

export interface JoinOptions {
	channels: JoinChannelOptions;
	messages: JoinMessagesOptions;
}

export interface JoinChannelOptions {
	channel: string[];
	invites: string[];
}

export interface JoinMessagesOptions {
	image: string;
	url: string;
	mensagem: string;
	imagem: boolean;
	inviteMessage: string;
	noInvite: string;
}

export interface LeaveOptions {
	channels: LeaveChannelOptions;
	messages: LeaveMessagesOptions;
}

export interface LeaveChannelOptions {
	channel: string[];
}

export interface LeaveMessagesOptions {
	image: string;
	url: string;
	mensagem: string;
	imagem: boolean;
}

export interface LevelOptions {
	channel: string[];
	logs: string[];
}

export interface TicketOptions {
	createChannel: TicketCreateChannelOptions;
	logs: TicketLogsOptions;
}

export interface TicketCreateChannelOptions {
	categoty: string;
	above: string;
	below: string;
}

export interface TicketLogsOptions {
	channel: string[];
	transctipts: string[];
}

export interface ServerStatsOptions {
	online: string;
	onServer: string;
}

export interface MemberStatsOptions {
	roles: string[];
	logs: string[];
}

export interface ReactionRolesOptions {
	messages: ReactionRolesMessageOptions[];
}

export interface ReactionRolesMessageOptions {
	messageId: string;
	channelId: string;
	reactions: Collection<EmojiResolvable, string[]>;
}

export interface AnunciosOptions {
	managerRoles: string[];
}

export interface GiveAwayOptions {
	managerRoles: string[];
	logs: string[];
	giveaways: GiveAway[];
}

export interface GiveAway {}

export interface PollsOptions {
	managerRoles: string[];
	logs: string[];
}

export interface FormsOptions {
	logs: string[];
	managerRoles: string[];
	forms: Forms[];
}

export interface Forms {
	id: string;
	name: string;
	authorUrlQuestion: string;
	descriptionQuestion: string;
	questions: string[];
	delay: 1;
	delayAfterAnswer: 1;
	responseChat: ResponseChatOptions;
	responseColor: string;
	questionCOlor: string;
	introColor: string;
	buttons: ButtonsOptions[];
	emojis: boolean;
	bockedRoles: string[];
}

export interface ResponseChatOptions {
	guild: ResponseChatGuildOptions;
	channel: ResponseChatChannelOptions;
}

export interface ResponseChatGuildOptions {
	id: string;
	name: string;
}

export interface ResponseChatChannelOptions {
	id: string;
	name: string;
}

export interface ButtonsOptions {
	function: 'DM' | 'EMBED_DM' | 'SEND_MESSAGE' | 'SEND_EMBED' | 'SEND_FORM';
	message: CustomEmbed | string;
	id: string;
	text: string;
	tipo: 'PRIMARY' | 'SECONDARY' | 'SUCCESS' | 'DANGER' | 'LINK';
	link: string;
	index: number;
	roles: string[];
	deleteAfter: boolean;
	channel: string;
	color: string;
	changeColor: boolean;
}

export interface CustomEmbed {
	title: string;
	url: string;
	description: string;
	footer: string;
	timeStamp: boolean;
	fields: CustomField[];
	color: string;
}

export interface CustomField {
	index: number;
	name: string;
	value: string;
	inLine: boolean;
}

export interface ServersOptions {
	servers: ServersServerInfo[];
	messages: MessagesInfo[];
}

export interface ServersServerInfo {
	ip: string;
	name: string;
}

export interface StaffOptions {
	staff: StaffInfo[];
	messages: MessagesInfo[];
}

export interface StaffInfo {
	id: string;
	cargo: string;
	extras: string[];
}

export interface MessagesInfo {
	channelId: string;
	messageId: string;
}
