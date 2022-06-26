import { Guild } from 'discord.js';
import { Router } from 'express';
import ExtendedClient from '../client/ExtendedClient';
import { authenticated } from '../strategies/authentication';
import { ChannelInfo, GuildInfo, MemberInfo, RoleInfo } from '../types/API';

const router = Router();

router.get('/info/:id', authenticated, async (req, res) => {
	const { id } = req.params;
	const client: ExtendedClient = (await import('..')).default;
	const guild: Guild = await client.guilds.fetch(id);

	const channels: ChannelInfo[] = await getChannels(guild);
	const members: MemberInfo[] = await getMembers(guild);
	const roles: RoleInfo[] = await getRoles(guild);

	const data: GuildInfo = {
		id: guild.id,
		memberCount: guild.memberCount,
		channels: channels,
		members: members,
		premiumSubscriptionCount: guild.premiumSubscriptionCount,
		roles: roles,
	};
	res.status(200).send(data);
});

export default router;

async function getChannels(guild: Guild) {
	const channelList: ChannelInfo[] = [];
	const channels = await guild.channels.fetch();
	for (let i = 0; i < channels.size; i++) {
		const channel = channels.at(i);

		channelList.push({
			id: channel.id,
			name: channel.name,
			parent: {
				id: channel.parent.id,
				name: channel.parent.name,
				parent: null,
				type: channel.parent.type,
			},
			type: channel.type,
		});
	}
	return channelList;
}

async function getMembers(guild: Guild) {
	const memberList: MemberInfo[] = [];
	const members = await guild.members.fetch();
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

async function getRoles(guild: Guild) {
	const roleList: RoleInfo[] = [];
	const roles = await guild.roles.fetch();
	for (let i = 0; i < roles.size; i++) {
		const role = roles.at(i);

		roleList.push({ colorHex: role.hexColor, id: role.id, name: role.name });
	}
	return roleList;
}
