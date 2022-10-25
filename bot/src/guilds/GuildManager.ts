import {
	Collection,
	Embed,
	EmbedBuilder,
	Guild,
	Message,
	Snowflake,
	TextChannel,
} from 'discord.js';
import ExtendedClient from '../client/ExtendedClient';
import { FeatureList, Features } from '../types/Features';
import fs from 'fs';

export default class GuildManager {
	client: ExtendedClient;
	private guilds: Collection<string, Features>;

	constructor(client: ExtendedClient) {
		this.client = client;
		this.guilds = new Collection();
	}

	loadGuild(guildId: Snowflake) {
		if (!fs.existsSync(process.cwd() + `/config/guilds/${guildId}.json`))
			return false;
		const feature: Features = JSON.parse(
			fs
				.readFileSync(process.cwd() + `/config/guilds/${guildId}.json`)
				.toString()
		);
		this.guilds.set(guildId, feature);
		console.log(`Config da guild com id ${guildId} carregada!`);
		return true;
	}

	createGuild(guildId: Snowflake) {
		const features: Features = {
			anouncements: { managerRoles: [], active: false },
			forms: { forms: [], logs: [], managerRoles: [], active: false },
			giveaway: { active: false, managerRoles: [] },
			joinmessage: {
				channels: { invites: [], logs: [] },
				messages: {
					imagem: false,
					imageMessage: '',
					inviteMessage: '',
					message: '',
					noInviteMessage: '',
				},
				active: false,
			},
			leavemessage: {
				logs: [],
				messages: { imagem: false, imageMessage: '', message: '' },
				active: false,
			},
			level: {
				channel: [],
				logs: [],
				multipliers: [],
				rolesPerLevel: [],
				active: false,
			},
			logs: {
				chat: [],
				invite: [],
				member: [],
				message: [],
				role: [],
				user: [],
				active: false,
			},
			memberstats: { logs: [], roles: [], active: false },
			moderation: {
				automod: {
					discordInvites: true,
					duplicatedMessages: true,
					links: false,
					massEmoji: 3,
					massMention: 3,
					autoDeleteMessages: [],
				},
				active: false,
				bannedRoles: [],
				banRoles: true,
				logs: [],
				moderators: [],
				mutedRoles: [],
				timedPunitions: true,
				warns: { maxWarnings: 3, muteTime: 24, warnExpires: 3 },
			},
			polls: { active: false, managerRoles: [] },
			public: { active: false },
			reactionroles: { messages: [], active: false },
			serverlist: { messages: [], servers: [], active: false },
			serverstats: { inServer: '', online: '', active: false },
			stafflist: { cargos: [], messages: [], active: false },
			ticket: {
				createChannel: { category: '', channel: '', selected: 'END' },
				active: false,
				openMessage: {
					button: { label: 'Fechar', style: 'Danger' },
					embed: {
						author: null,
						color: null,
						description:
							'Se não responderes em uma hora, o ticket será fechado!',
						fields: [],
						image: null,
						thumbnail: null,
						timeStamp: null,
						title: null,
						url: null,
						footer: null,
					},
					message:
						'Boas $mention$, espera que um $moderator$ venha aqui falar contigo!',
				},
				roles: { forbiden: [], moderator: [], staff: [] },
			},
			general: { active: true },
		};
		this.guilds.set(guildId, features);
		if (!fs.existsSync(process.cwd() + '/config/guilds'))
			fs.mkdirSync(process.cwd() + '/config/guilds');
		fs.writeFileSync(
			process.cwd() + `/config/guilds/${guildId}.json`,
			JSON.stringify(features, null, 4)
		);
		console.log(`Criada config file para a guild com id ${guildId}`);
	}

	hasFeature(guildId: Snowflake, feature: FeatureList) {
		const temp: Features = this.guilds.get(guildId);
		if (temp[feature.name].active) return true;
		return false;
	}

	getFeatures(guildId: Snowflake) {
		const temp: Features = this.guilds.get(guildId);
		return temp;
	}

	setFeatures(guild: Guild, features: Features) {
		const oldFeatures = this.guilds.get(guild.id);
		let commands = false;

		if (
			oldFeatures.anouncements.active != features.anouncements.active ||
			oldFeatures.forms.active != features.forms.active ||
			oldFeatures.general.active != features.general.active ||
			oldFeatures.giveaway.active != features.giveaway.active ||
			oldFeatures.joinmessage.active != features.joinmessage.active ||
			oldFeatures.leavemessage.active != features.leavemessage.active ||
			oldFeatures.level.active != features.level.active ||
			oldFeatures.logs.active != features.logs.active ||
			oldFeatures.memberstats.active != features.memberstats.active ||
			oldFeatures.moderation.active != features.moderation.active ||
			oldFeatures.polls.active != features.polls.active ||
			oldFeatures.public.active != features.public.active ||
			oldFeatures.reactionroles.active != features.reactionroles.active ||
			oldFeatures.serverlist.active != features.serverlist.active ||
			oldFeatures.serverstats.active != features.serverstats.active ||
			oldFeatures.stafflist.active != features.stafflist.active ||
			oldFeatures.ticket.active != features.ticket.active
		)
			commands = true;
		this.guilds.set(guild.id, features);

		fs.writeFileSync(
			process.cwd() + `/config/guilds/${guild.id}.json`,
			JSON.stringify(features, null, 4)
		);
		console.log(`Alterada config file para a guild ${guild.name}`);

		if (commands) this.client.commandManager.setCommands(guild);
	}

	async logSnowflake(
		guild: Guild,
		channels: string[],
		content: string | null,
		embeds?: Embed[] | EmbedBuilder[] | null
	) {
		for (let i = 0; i < channels.length; i++) {
			const channelId = channels[i];
			const channel = (await guild.channels.fetch(channelId)) as TextChannel;
			channel.send({ content, embeds });
		}
	}

	log(
		channels: TextChannel[],
		content: string | null,
		embeds?: Embed[] | EmbedBuilder[] | null
	) {
		for (let i = 0; i < channels.length; i++) {
			const channel = channels[i];
			channel.send({ content, embeds });
		}
	}
}
