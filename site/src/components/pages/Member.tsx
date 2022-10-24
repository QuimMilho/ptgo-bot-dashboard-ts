import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import APIURL from '../../index';
import { ExtendedMemberInfo } from '../../types/API';

function Member(props: any) {
	const { guildId, memberId } = useParams();
	const memberInfo: { status: number; member: ExtendedMemberInfo | undefined } =
		{ status: 0, member: undefined };
	const [member, setMember] = useState(memberInfo);
	useEffect(() => {
		getMember(setMember, memberId ? memberId : '0', guildId ? guildId : '0');
	}, [guildId, memberId]);
	const navigate = useNavigate();
	return (
		<div className="guildProfile">
			<div className="guildProfileInfoContainer">
				<img
					src={
						member.member?.displayAvatarURL
							? member.member.displayAvatarURL
							: '/logo.png'
					}
					alt={'Imagem do membro'}
				/>
				<div className="guildProfileInfo">
					<h1>{member.member?.displayName}</h1>
					<span>
						Conta criada em:{' '}
						{new Date(
							member.member?.createdTimeStamp
								? member.member?.createdTimeStamp
								: 0
						).toLocaleString()}
					</span>
					<br />
					<span>
						Username#Discriminador:{' '}
						{`${member.member?.username}#${member.member?.discriminator}`}
					</span>
					<br />
					{member.member?.premium ? (
						<span>
							Discord nitro desde: {member.member.premium.toLocaleString()}
						</span>
					) : undefined}
				</div>
			</div>
			<div className="guildProfileButtons">
				<button onClick={() => navigate(`/member/${guildId}/${memberId}/bans`)}>
					Mutes e Bans
				</button>
				<button
					onClick={() => navigate(`/member/${guildId}/${memberId}/tickets`)}
				>
					Tickets
				</button>
				<button
					onClick={() => navigate(`/member/${guildId}/${memberId}/stats`)}
				>
					Estatísticas
				</button>
			</div>
		</div>
	);
}

export default Member;

async function getMember(
	setMember: Function,
	memberId: string,
	guildId: string
) {
	const info = await axios({
		method: 'GET',
		url: `${APIURL}/api/user/info/${guildId}/${memberId}`,
		withCredentials: true,
	});
	setMember({ status: info.status, members: info.data });
}
