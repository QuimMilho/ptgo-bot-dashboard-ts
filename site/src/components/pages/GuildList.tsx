import React from 'react';
import { useNavigate } from 'react-router-dom';
import { APIUserGuildsInfo } from '../../types/API';
import '../../styles/list.scss';
import NotLoggedIn from './NotLoggedIn';

function GuildList(props: { guilds: APIUserGuildsInfo[] | undefined }) {
	if (props.guilds) {
		if (props.guilds.length === 0) {
			return <NoGuildFound />;
		} else {
			return <List guilds={props.guilds} />;
		}
	} else {
		return <NotLoggedIn />;
	}
}

export default GuildList;

function List(props: { guilds: APIUserGuildsInfo[] }) {
	return (
		<div className="content">
			{props.guilds.map((g) => (
				<GuildElement guild={g} key={g.guild.id} />
			))}
		</div>
	);
}

function GuildElement(props: { guild: APIUserGuildsInfo }) {
	const navigate = useNavigate();
	return (
		<div className="listElement">
			<div className="firstLine">
				<span>{props.guild.guild.name}</span>
				<button onClick={() => navigate(`/guild/${props.guild.guild.id}`)}>
					Aceder
				</button>
			</div>
			<div className="secondLine">
				{props.guild.member.permissions.map((p) => (
					<PermsElement permName={p} />
				))}
			</div>
		</div>
	);
}

function PermsElement(props: { permName: string }) {
	return <span className="perms">{props.permName}</span>;
}

function NoGuildFound() {
	return <div className="content"></div>;
}
