import React from 'react';
import { useNavigate } from 'react-router-dom';
import { APIUserGuildsInfo } from '../../types/API';
import NotFound from '../pages/NotFound';

function GuildProfile(props: { guild: APIUserGuildsInfo | undefined }) {
	const navigate = useNavigate();
	if (!props.guild) return <NotFound />;
	return (
		<div className="guildProfile">
			<div className="guildProfileInfoContainer">
				<img
					src={props.guild.guild.icon ? props.guild.guild.icon : '/logo.png'}
				/>
				<div className="guildProfileInfo">
					<h1>{props.guild.guild.name}</h1>
					<span>Número de membros: {props.guild.guild.memberCount}</span>
					<br />
					<span>
						Nível do servidor:{' '}
						{props.guild.guild.premiumSubscriptionCount < 2
							? 0
							: props.guild.guild.premiumSubscriptionCount < 7
							? 1
							: props.guild.guild.premiumSubscriptionCount < 14
							? 2
							: 3}
					</span>
					<br />
					<span>
						Número de server boosts:{' '}
						{props.guild.guild.premiumSubscriptionCount}
					</span>
				</div>
			</div>
			<div className="guildProfileButtons">
				<button
					onClick={() => navigate(`/guild/${props.guild?.guild.id}/members`)}
				>
					Membros
				</button>
				<button
					onClick={() => navigate(`/guild/${props.guild?.guild.id}/bans`)}
				>
					Mutes e bans
				</button>
				<button
					onClick={() => navigate(`/guild/${props.guild?.guild.id}/features`)}
				>
					Administração
				</button>
				<button
					onClick={() => navigate(`/guild/${props.guild?.guild.id}/tickets`)}
				>
					Tickets
				</button>
			</div>
		</div>
	);
}

export default GuildProfile;
