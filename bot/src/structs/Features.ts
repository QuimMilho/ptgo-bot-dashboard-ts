import { Guild } from 'discord.js';

import {
	AnunciosOptions,
	FormsOptions,
	GiveAwayOptions,
	JoinOptions,
	LeaveOptions,
	LevelOptions,
	LogOptions,
	MemberStatsOptions,
	ModeracaoOptions,
	PollsOptions,
	ReactionRolesOptions,
	ServersOptions,
	ServerStatsOptions,
	SettingsOptions,
	StaffOptions,
	TicketOptions,
} from '../types/features';
import DiscordClient from './Client';

export default class FeaturesManager {
	cache: SettingsOptions;
	public: boolean;

	guild: Guild;
	client: DiscordClient;

	constructor(client: DiscordClient, guild: Guild) {
		this.client = client;
		this.guild = guild;

		this.cache = {
			anuncios: undefined,
			forms: undefined,
			giveaway: undefined,
			join: undefined,
			leave: undefined,
			levels: undefined,
			logs: undefined,
			memberStats: undefined,
			moderacao: undefined,
			polls: undefined,
			reactRole: undefined,
			serverStats: undefined,
			servers: undefined,
			staffs: undefined,
			ticket: undefined,
		};
	}

	addFeature(feature: keyof SettingsOptions) {
		if (feature === 'anuncios') {
			let temp: AnunciosOptions = {
				managerRoles: [],
			};
			this.cache.anuncios = temp;
		} else if (feature === 'forms') {
			let temp: FormsOptions = {
				forms: [],
				logs: [],
				managerRoles: [],
			};
			this.cache.forms = temp;
		} else if (feature === 'giveaway') {
			let temp: GiveAwayOptions = {
				giveaways: [],
				logs: [],
				managerRoles: [],
			};
			this.cache.giveaway = temp;
		} else if (feature === 'join') {
			let temp: JoinOptions = {
				channels: {
					channel: [],
					invites: [],
				},
				messages: {
					image: '',
					imagem: false,
					inviteMessage: '',
					mensagem: '',
					noInvite: '',
					url: '',
				},
			};
			this.cache.join = temp;
		} else if (feature === 'leave') {
			let temp: LeaveOptions = {
				channels: {
					channel: [],
				},
				messages: {
					image: '',
					imagem: false,
					mensagem: '',
					url: '',
				},
			};
			this.cache.leave = temp;
		} else if (feature === 'levels') {
			let temp: LevelOptions = {
				channel: [],
				logs: [],
			};
			this.cache.levels = temp;
		} else if (feature === 'logs') {
			let temp: LogOptions = {
				chats: [],
				error: [],
				invites: [],
				members: [],
				mensagens: [],
				roles: [],
				user: [],
			};
			this.cache.logs = temp;
		} else if (feature === 'memberStats') {
			let temp: MemberStatsOptions = {
				logs: [],
				roles: [],
			};
			this.cache.memberStats = temp;
		} else if (feature === 'moderacao') {
			let temp: ModeracaoOptions = {
				automod: {
					discordInvites: true,
					duplicatedMessages: true,
					links: false,
					massemoji: 3,
					massmention: 3,
				},
				banRoles: false,
				bannedRoles: [],
				logs: [],
				moderator: [],
				mutedRoles: [],
				warns: {
					expires: 3,
					max: 3,
					muteTime: 1440,
				},
			};
			this.cache.moderacao = temp;
		} else if (feature === 'polls') {
			let temp: PollsOptions = {
				logs: [],
				managerRoles: [],
			};
			this.cache.polls = temp;
		} else if (feature === 'reactRole') {
			let temp: ReactionRolesOptions = {
				messages: [],
			};
			this.cache.reactRole = temp;
		} else if (feature === 'serverStats') {
			let temp: ServerStatsOptions = {
				onServer: '',
				online: '',
			};
			this.cache.serverStats = temp;
		} else if (feature === 'servers') {
			let temp: ServersOptions = {
				messages: [],
				servers: [],
			};
			this.cache.servers = temp;
		} else if (feature === 'staffs') {
			let temp: StaffOptions = {
				messages: [],
				staff: [],
			};
			this.cache.staffs = temp;
		} else if (feature === 'ticket') {
			let temp: TicketOptions = {
				createChannel: {
					above: '',
					below: '',
					categoty: '',
				},
				logs: {
					channel: [],
					transctipts: [],
				},
			};
			this.cache.ticket = temp;
		}
	}

	removeFeature(feature: keyof SettingsOptions) {
		this.cache[feature] = undefined;
	}

	getDefaultSettings(feature: keyof SettingsOptions) {
		return undefined;
	}

	loadFeatures() {}

	loadFeature() {}
}
