import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ExtendedMemberInfo } from '../../types/API';
import APIURL from '../../index';
import Loading from '../pages/Loading';
import Error from '../pages/Error';
import NoPermission from '../pages/NoPermission';
import GuildMember from './GuildMember';
import SmallText from '../input/SmallText';

function GuildMembers(props: { guildId: string }) {
	let memberList: { status: number; members: ExtendedMemberInfo[] } = {
		status: 0,
		members: [],
	};
	const [members, setMembers] = useState(memberList);
	const interval = 50;
	const [showing, setShowing] = useState(interval);
	const [search, setSearch] = useState<string | null>(null);
	useEffect(() => {
		getMembers(setMembers, props.guildId);
	}, [props.guildId]);
	if (members.status === 0) {
		return <Loading />;
	} else if (members.status === 200) {
		return (
			<div className="content">
				<div className="white">
					Pesquisa:{' '}
					<SmallText value={search} onChange={setSearch} label={undefined} />
				</div>
				<div className="list">
					{[...members.members]
						.filter(
							(m) =>
								search?.length === 0 ||
								m.displayName
									.toLowerCase()
									.includes(search ? search.toLowerCase() : '') ||
								m.username
									.toLowerCase()
									.includes(search ? search.toLowerCase() : '') ||
								m.id.includes(search ? search : '')
						)
						.slice(
							0,
							showing > members.members.length
								? members.members.length
								: showing
						)
						.map((m) => (
							<GuildMember member={m} guildId={props.guildId} key={m.id} />
						))}
					{members.members.length > showing ? (
						<button onClick={() => setShowing(showing + interval)}>
							Carregar mais
						</button>
					) : undefined}
				</div>
			</div>
		);
	} else if (members.status === 500) {
		return <Error />;
	} else {
		return <NoPermission />;
	}
}

export default GuildMembers;

async function getMembers(setMembers: Function, id: string) {
	const info = await axios({
		method: 'GET',
		url: `${APIURL}/api/user/info/${id}`,
		withCredentials: true,
	});
	setMembers({ status: info.status, members: info.data });
}
