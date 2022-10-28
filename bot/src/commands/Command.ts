import {
	APIInteractionGuildMember,
	ChatInputCommandInteraction,
	CommandInteraction,
	EmbedBuilder,
	GuildMember,
	GuildMemberRoleManager,
	SlashCommandBuilder,
} from 'discord.js';
import ExtendedClient from '../client/ExtendedClient';
import { hasRoles } from '../strategies/permissions';
import { CommandOptions, CustomCommandOptions } from '../types/Commands';
import { FeatureList } from '../types/Features';

export default class Command {
	client: ExtendedClient;
	name: string;
	command: SlashCommandBuilder;
	category: FeatureList;

	constructor(client: ExtendedClient, options: CommandOptions) {
		this.client = client;
		this.name = options.name;
		const command = new SlashCommandBuilder()
			.setName(options.name)
			.setDescription(options.description)
			//.setDefaultMemberPermissions(options.defaultMemberPermissions)
			.setDMPermission(options.dmPermission);
		this.command = addOptions(command, options.options);
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

export function addOptions(
	command: SlashCommandBuilder,
	options: CustomCommandOptions[]
) {
	for (let i = 0; i < options.length; i++) {
		const option = options[i];
		switch (option.type) {
			case 'Attachment':
				command.addAttachmentOption((opt) =>
					opt
						.setName(option.name)
						.setDescription(option.description)
						.setRequired(option.required)
				);
				break;
			case 'Boolean':
				command.addBooleanOption((opt) =>
					opt
						.setName(option.name)
						.setDescription(option.description)
						.setRequired(option.required)
				);
				break;
			case 'Channel':
				command.addChannelOption((opt) =>
					opt
						.setName(option.name)
						.setDescription(option.description)
						.setRequired(option.required)
				);
				break;
			case 'Integer':
				command.addIntegerOption((opt) => {
					opt
						.setName(option.name)
						.setDescription(option.description)
						.setRequired(option.required);
					if (option.minValue) opt.setMinValue(option.minValue);
					if (option.maxValue) opt.setMaxValue(option.maxValue);
					return opt;
				});
				break;
			case 'Mentionable':
				command.addMentionableOption((opt) =>
					opt
						.setName(option.name)
						.setDescription(option.description)
						.setRequired(option.required)
				);
				break;
			case 'Number':
				command.addNumberOption((opt) => {
					opt
						.setName(option.name)
						.setDescription(option.description)
						.setRequired(option.required);
					if (option.minValue) opt.setMinValue(option.minValue);
					if (option.maxValue) opt.setMaxValue(option.maxValue);
					return opt;
				});
				break;
			case 'Role':
				command.addRoleOption((opt) =>
					opt
						.setName(option.name)
						.setDescription(option.description)
						.setRequired(option.required)
				);
				break;
			case 'String':
				command.addStringOption((opt) => {
					opt
						.setName(option.name)
						.setDescription(option.description)
						.setRequired(option.required);
					if (option.minLength) opt.setMinLength(option.minLength);
					if (option.maxLength) opt.setMaxLength(option.maxLength);
					return opt;
				});
				break;
			case 'Subcommand':
				command.addSubcommand((opt) =>
					opt.setName(option.name).setDescription(option.description)
				);
				break;
			case 'SubcommandGroup':
				command.addSubcommandGroup((opt) =>
					opt.setName(option.name).setDescription(option.description)
				);
				break;
			case 'User':
				command.addUserOption((opt) =>
					opt
						.setName(option.name)
						.setDescription(option.description)
						.setRequired(option.required)
				);
				break;
		}
	}
	return command;
}

export function noPermission(
	interaction: ChatInputCommandInteraction,
	member: GuildMember,
	roles: string[]
): boolean {
	if (!hasRoles(member, roles)) {
		interaction.editReply({ content: 'Não tens permissão!' });
		return true;
	}
	return false;
}
