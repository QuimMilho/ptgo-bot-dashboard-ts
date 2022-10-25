import { Guild } from 'discord.js';
import { Router } from 'express';
import { UserRequest } from '.';
import ExtendedClient from '../client/ExtendedClient';
import { authenticated } from '../strategies/authentication';
import { getMemberPerms } from '../strategies/permissions';
import { ChannelInfo, GuildInfo, MemberInfo, RoleInfo } from '../types/API';

const router = Router();

router.get('/info/:id', authenticated, async (req: UserRequest, res) => {
	const { id } = req.params;
	const client: ExtendedClient = (await import('..')).default;

	const guild = await client.guilds.fetch(id).catch(console.log);
	if (!guild) return res.sendStatus(404);

	const channels: ChannelInfo[] = await getChannels(guild);
	const members: MemberInfo[] = await getMembers(guild);
	const roles: RoleInfo[] = await getRoles(guild);

	const data: GuildInfo = {
		id: guild.id,
		icon: guild.iconURL(),
		memberCount: guild.memberCount,
		channels: channels,
		members: members,
		premiumSubscriptionCount: guild.premiumSubscriptionCount,
		roles: roles,
		name: guild.name,
	};
	res.status(200).send(data);
});

router.get('/features/:id', authenticated, async (req: UserRequest, res) => {
	const { id } = req.params;
	const client: ExtendedClient = (await import('..')).default;

	const guild = await client.guilds.fetch(id).catch(console.log);
	if (!guild) return res.sendStatus(404);

	const member = await guild.members
		.fetch(req.user.clientId)
		.catch(console.log);
	if (!member) return res.sendStatus(403);

	if (!getMemberPerms(client, guild, member).includes('ADMINISTRATOR'))
		return res.sendStatus(403);

	const features = client.guildManager.getFeatures(guild.id);
	if (!features) return res.sendStatus(404);

	res.status(200).send(features);
});

router.post('/features/:id', authenticated, async (req: UserRequest, res) => {
	const { id } = req.params;
	const client: ExtendedClient = (await import('..')).default;

	const guild = await client.guilds.fetch(id).catch(console.log);
	if (!guild) return res.sendStatus(404);

	const member = await guild.members
		.fetch(req.user.clientId)
		.catch(console.log);
	if (!member) return res.sendStatus(403);

	if (!getMemberPerms(client, guild, member).includes('ADMINISTRATOR'))
		return res.sendStatus(403);

	client.guildManager.setFeatures(guild, req.body);
});

export default router;

export async function getChannels(guild: Guild) {
	const channelList: ChannelInfo[] = [];

	const channels = await guild.channels.fetch().catch(console.log);
	if (!channels) return null;

	for (let i = 0; i < channels.size; i++) {
		const channel = channels.at(i);

		channelList.push({
			id: channel.id,
			name: channel.name,
			parent: channel.parent
				? {
						id: channel.parent.id,
						name: channel.parent.name,
						parent: null,
						type: getChannelType(channel.parent.type),
				  }
				: null,
			type: getChannelType(channel.type),
		});
	}
	return channelList;
}

export async function getMembers(guild: Guild) {
	const memberList: MemberInfo[] = [];

	const members = await guild.members.fetch().catch(console.log);
	if (!members) return null;

	for (let i = 0; i < members.size; i++) {
		const member = members.at(i);

		memberList.push({
			createdTimeStamp: member.user.createdTimestamp,
			discriminator: member.user.discriminator,
			displayAvatarURL: member.displayAvatarURL(),
			displayName: member.displayName,
			id: member.id,
			username: member.user.username,
		});
	}
	return memberList;
}

export async function getRoles(guild: Guild) {
	const roleList: RoleInfo[] = [];

	const roles = await guild.roles.fetch().catch(console.log);
	if (!roles) return null;

	for (let i = 0; i < roles.size; i++) {
		const role = roles.at(i);

		roleList.push({
			colorHex: role.hexColor,
			id: role.id,
			name: role.name,
		});
	}

	return roleList;
}

export function getChannelType(channelType: number) {
	switch (channelType) {
		case 0:
			return 'GuildText';
		case 1:
			return 'DM';
		case 2:
			return 'GuildVoice';
		case 3:
			return 'GroupDM';
		case 4:
			return 'GuildCategory';
		case 5:
			return 'GuildAnnouncement';
		case 10:
			return 'AnnouncementThread';
		case 11:
			return 'PublicThread';
		case 12:
			return 'PrivateThread';
		case 13:
			return 'GuildStageVoice';
		case 14:
			return 'GuildDirectory';
		case 15:
			return 'GuildForum';
	}
	return '';
}
