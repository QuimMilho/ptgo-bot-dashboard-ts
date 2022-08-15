import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ExtendedMemberInfo } from '../../types/API';

function GuildMember(props: { member: ExtendedMemberInfo; guildId: string }) {
	const navigate = useNavigate();
	return (
		<div className="listElement">
			<div className="firstLine">
				<span>
					{props.member.displayName
						? `${props.member.displayName} (${props.member.username}` +
						  `#${props.member.discriminator})`
						: `${props.member.username}#${props.member.discriminator}`}
				</span>
				<button
					onClick={() => navigate(`/member/${props.guildId}/${props.member.id}`)}
				>
					Aceder
				</button>{' '}
				<br />
				{props.member.premium ? <img src="/booster.png" className='listBoosterImage' /> : undefined}
				{props.member.premium ? (
					<span>
						Server booster desde: {props.member.premium.toLocaleString()}
					</span>
				) : undefined}
			</div>
			<div className="secondLine">
				{props.member.permissions.map((p) => (
					<PermsElement permName={p} />
				))}
			</div>
		</div>
	);
}

export default GuildMember;

function PermsElement(props: { permName: string }) {
	return <span className="perms">{props.permName}</span>;
}
