import { FeatureList } from './Features';

export interface CommandOptions {
	name: string;
	description: string;
	options: CustomCommandOptions[];
	defaultMemberPermissions:
		| 'AddReactions'
		| 'Administrator'
		| 'AttachFiles'
		| 'BanMembers'
		| 'ChangeNickname'
		| 'Connect'
		| 'CreateInstantInvite'
		| 'CreatePrivateThreads'
		| 'CreatePublicThreads'
		| 'DeafenMembers'
		| 'EmbedLinks'
		| 'KickMembers'
		| 'ManageChannels'
		| 'ManageEmojisAndStickers'
		| 'ManageEvents'
		| 'ManageGuild'
		| 'ManageMessages'
		| 'ManageNicknames'
		| 'ManageRoles'
		| 'ManageThreads'
		| 'ManageWebhooks'
		| 'MentionEveryone'
		| 'ModerateMembers'
		| 'MoveMembers'
		| 'MuteMembers'
		| 'PrioritySpeaker'
		| 'ReadMessageHistory'
		| 'RequestToSpeak'
		| 'SendMessages'
		| 'SendMessagesInThreads'
		| 'Speak'
		| 'Stream'
		| 'UseApplicationCommands'
		| 'UseEmbeddedActivities'
		| 'UseExternalEmojis'
		| 'UseExternalStickers'
		| 'UseVAD'
		| 'ViewAuditLog'
		| 'ViewChannel'
		| 'ViewGuildInsights'
		| null;
	dmPermission: boolean;
	category: FeatureList;
}

export interface CustomCommandOptions {
	type:
		| 'Attachment'
		| 'Boolean'
		| 'Channel'
		| 'Integer'
		| 'Mentionable'
		| 'Number'
		| 'Role'
		| 'String'
		| 'Subcommand'
		| 'SubcommandGroup'
		| 'User';
	name: string;
	description: string;
	required: boolean;
	choices: number | string | null;
	channelTypes:
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
		| string
		| null;
	minValue: number | null;
	maxValue: number | null;
	minLength: number | null;
	maxLength: number | null;
}
