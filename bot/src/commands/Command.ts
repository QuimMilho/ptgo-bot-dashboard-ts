import {
	ApplicationCommandOptionData,
	ApplicationCommandType,
	CommandInteraction,
	EmbedBuilder,
	PermissionResolvable,
} from 'discord.js';
import ExtendedClient from '../client/ExtendedClient';
import { CommandOptions } from '../types/Commands';
import { FeatureList } from '../types/Features';

export default class Command {
	client: ExtendedClient;
	name: string;
	description: string;
	type: ApplicationCommandType.ChatInput;
	options: ApplicationCommandOptionData[];
	defaultMemberPermissions: PermissionResolvable;
	dmPermission: boolean;
	category: FeatureList;

	constructor(client: ExtendedClient, options: CommandOptions) {
		this.client = client;
		this.name = options.name;
		this.description = options.description;
		this.type = ApplicationCommandType.ChatInput;
		this.options = [];
		this.defaultMemberPermissions = options.defaultMemberPermissions;
		this.dmPermission = options.dmPermission;
		this.category = options.category;
	}

	run(interaction: CommandInteraction) {
		const embed = new EmbedBuilder()
			.setTitle('Comando padrão!')
			.setColor([0, 255, 255])
			.setTimestamp();
		interaction.editReply({ embeds: [embed] });
	}
}
