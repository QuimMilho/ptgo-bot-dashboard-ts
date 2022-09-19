import React from 'react';
import { useParams } from 'react-router-dom';
import { APIUserGuildsInfo } from '../../types/API';
import GuildProfile from '../guild/GuildProfile';
import NotFound from './NotFound';
import '../../styles/guild.scss';
import GuildMembers from '../guild/GuildMembers';
import GuildFeatures from '../guild/GuildFeatures';

function Guild(props: { guilds: APIUserGuildsInfo[] | undefined }) {
	const { id, page } = useParams();
	if (
		page &&
		page !== 'tickets' &&
		page !== 'bans' &&
		page !== 'members' &&
		page !== 'features'
	)
		return <NotFound />;
	if (!props.guilds) return <NotFound />;
	const guild = props.guilds.find((g) => g.guild.id === id);
	if (!guild) return <NotFound />;
	return (
		<div>
			<GuildProfile guild={guild} />
			{page === 'tickets' ? <div>tickets</div> : undefined}
			{page === 'bans' ? <div>bans</div> : undefined}
			{page === 'members' ? <GuildMembers guildId={guild.guild.id} /> : undefined}
			{page === 'features' ? <GuildFeatures guild={guild} /> : undefined}
		</div>
	);
}

export default Guild;
