import { Router } from 'express';
import { UserRequest } from '.';
import ExtendedClient from '../client/ExtendedClient';
import { authenticated } from '../strategies/authentication';
import { getMemberPerms, getUserPerms } from '../strategies/permissions';
import {
	ChannelInfo,
	ExtendedMemberInfo,
	GuildInfo,
	MemberInfo,
	RoleInfo,
	APIUserInfo,
} from '../types/API';
import { getChannels, getMembers, getRoles } from './guilds';

const router = Router();

router.get('/info/:guildId', authenticated, async (req: UserRequest, res) => {
	const { guildId } = req.params;
	const client: ExtendedClient = (await import('..')).default;
	const guild = await client.guilds.fetch(guildId).catch(console.log);
	if (!guild) return res.sendStatus(404);

	const user = req.user.clientId;
	const gMember = await guild.members.fetch(user).catch(console.log);
	if (!gMember) return res.sendStatus(404);

	const memberInfo: ExtendedMemberInfo[] = [];
	const members = await guild.members.fetch().catch(console.log);
	if (!members) return res.sendStatus(400);

	for (let i = 0; i < members.size; i++) {
		const member = members.at(i);
		const role = member.roles.highest;
		memberInfo.push({
			createdTimeStamp: member.user.createdTimestamp,
			discriminator: member.user.discriminator,
			displayAvatarURL: member.displayAvatarURL(),
			displayName: member.displayName,
			id: member.id,
			username: member.user.username,
			permissions: getMemberPerms(client, guild, member),
			highestRole: role
				? {
						colorHex: role.hexColor,
						id: role.id,
						name: role.name,
				  }
				: null,
			premium: member.premiumSince,
		});
	}
	memberInfo.sort((a, b) => {
		if (
			members.get(a.id).roles.highest.position >
			members.get(b.id).roles.highest.position
		)
			return -1;
		return 1;
	});
	res.status(200).send(memberInfo);
});

router.get('/info/:guildId/:id', authenticated, async (req: UserRequest, res) => {
	const { guildId, id } = req.params;
	const client: ExtendedClient = (await import('..')).default;
	const guild = await client.guilds.fetch(guildId).catch(console.log);
	if (!guild) return res.sendStatus(404);

	const member = await guild.members.fetch(id).catch(console.log);
	if (!member) return res.sendStatus(404);

	let memberInfo: ExtendedMemberInfo;
	const role = member.roles.highest;
	if (member) {
		memberInfo = {
			createdTimeStamp: member.user.createdTimestamp,
			discriminator: member.user.discriminator,
			displayAvatarURL: member.displayAvatarURL(),
			displayName: member.displayName,
			id: member.id,
			username: member.user.username,
			permissions: getMemberPerms(client, guild, member),
			highestRole: role
				? {
						colorHex: role.hexColor,
						id: role.id,
						name: role.name,
				  }
				: null,
			premium: member.premiumSince,
		};
	} else {
		const user = await client.users.fetch(id).catch(console.log);
		if (!user) return res.sendStatus(404);

		memberInfo = {
			createdTimeStamp: user.createdTimestamp,
			discriminator: user.discriminator,
			displayAvatarURL: user.displayAvatarURL(),
			displayName: user.username,
			id: user.id,
			username: user.username,
			permissions: await getUserPerms(client, guild, user),
			highestRole: null,
			premium: undefined,
		};
	}
	res.status(200).send(memberInfo);
});

router.get('/tickets/:guildId', (req: UserRequest, res) => {});

router.get('/tickets/:guildId/:id', (req: UserRequest, res) => {});

router.get('/punitions/:guildId', (req: UserRequest, res) => {});

router.get('/punitions/:guildId/:id', (req: UserRequest, res) => {});

router.get('/', authenticated, async (req: UserRequest, res) => {
	const client: ExtendedClient = (await import('..')).default;
	const guilds = await client.guilds.fetch().catch(console.log);
	const user = await client.users.fetch(req.user.clientId).catch(console.log);
	if (!user) return res.sendStatus(404);
	const data: APIUserInfo = {
		servers: [],
		user: {
			avatarURL: user.displayAvatarURL(),
			discriminator: user.discriminator,
			username: user.username,
		},
	};
	if (!guilds) return res.send(500);
	for (let i = 0; i < guilds.size; i++) {
		const guild = await guilds.at(i).fetch().catch(console.log);
		if (!guild) continue;
		const member = await guild.members
			.fetch(req.user.clientId)
			.catch(console.log);
		if (
			!member &&
			!client.guildManager.hasFeature(guild.id, { name: 'public' })
		)
			continue;
		const channels: ChannelInfo[] = await getChannels(guild);
		const members: MemberInfo[] = await getMembers(guild);
		const roles: RoleInfo[] = await getRoles(guild);

		const info: GuildInfo = {
			id: guild.id,
			memberCount: guild.memberCount,
			channels: channels,
			members: members,
			premiumSubscriptionCount: guild.premiumSubscriptionCount,
			roles: roles,
			name: guild.name,
			icon: guild.icon,
		};

		let memberInfo: ExtendedMemberInfo;
		const user = member
			? member.user
			: await client.users.fetch(req.user.clientId);
		if (member) {
			const role = member.roles.highest;
			memberInfo = {
				createdTimeStamp: user.createdTimestamp,
				discriminator: user.discriminator,
				displayAvatarURL: member.displayAvatarURL(),
				displayName: member.displayName,
				highestRole: role
					? { colorHex: role.hexColor, id: role.id, name: role.name }
					: null,
				id: member.id,
				permissions: getMemberPerms(client, guild, member),
				username: user.username,
				premium: member.premiumSince,
			};
		} else {
			memberInfo = {
				createdTimeStamp: user.createdTimestamp,
				discriminator: user.discriminator,
				displayAvatarURL: user.displayAvatarURL(),
				displayName: user.username,
				highestRole: null,
				id: user.id,
				permissions: await getUserPerms(client, guild, user),
				username: user.username,
				premium: undefined,
			};
		}

		data.servers.push({ guild: info, member: memberInfo });
	}
	res.status(200).send(data);
});

export default router;
