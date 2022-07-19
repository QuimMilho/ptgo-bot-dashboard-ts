import React, { useState } from 'react';
import { CustomEmbed } from './types/Messages';
import { APIUserInfo, GuildInfo } from './types/API';
import './styles/global.scss';
import axios from 'axios';
import MultipleRoleSelect from './components/selects/multiple/MultipleRoleSelect';
import RoleSelect from './components/selects/single/RoleSelect';
import MultipleRoleMemberSelect from './components/selects/multiple/MultipleRoleMemberSelect';

let done = false;

function App(): JSX.Element {
	const embed: CustomEmbed = {
		author: {
			iconURL:
				'https://play-lh.googleusercontent.com/0oO5sAneb9lJP6l8c6DH4aj6f85qNpplQVHmPmbbBxAukDnlO7DarDW0b-kEIHa8SQ',
			name: 'Autor',
			url: 'https://ptgo.pt',
		},
		color: '#ffffff',
		description:
			'aaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaav\naaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\naaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
		fields: [],
		footer: {
			iconURL:
				'https://play-lh.googleusercontent.com/0oO5sAneb9lJP6l8c6DH4aj6f85qNpplQVHmPmbbBxAukDnlO7DarDW0b-kEIHa8SQ',
			text: 'rodape :)',
		},
		image:
			'https://play-lh.googleusercontent.com/0oO5sAneb9lJP6l8c6DH4aj6f85qNpplQVHmPmbbBxAukDnlO7DarDW0b-kEIHa8SQ',
		thumbnail:
			'https://play-lh.googleusercontent.com/0oO5sAneb9lJP6l8c6DH4aj6f85qNpplQVHmPmbbBxAukDnlO7DarDW0b-kEIHa8SQ',
		timeStamp: new Date(0),
		title: 'TESTE DO KRL MEN',
		url: 'https://ptgo.pt',
	};

	const guildInfo: GuildInfo = {
		channels: [],
		id: '0',
		memberCount: 0,
		members: [],
		premiumSubscriptionCount: 0,
		roles: [],
		name: 'idk',
	};
	const userInfo: APIUserInfo[] = [];
	const [guild, setGuild] = useState(guildInfo);
	const [user, setUser] = useState(userInfo);
	const [multi1, setMulti1] = useState([]);
	const [role, setRole] = useState(null);
	const [multi2, setMulti2] = useState([]);

	if (!done) {
		done = true;
		loadGuild(setGuild);
		loadUser(setUser);
	}

	return (
		<div>
			<RoleSelect
				clearable={true}
				onChange={setRole}
				roles={guild.roles}
				value={role}
			/>
			<MultipleRoleSelect
				roles={guild.roles}
				clearable={true}
				onChange={setMulti1}
				value={multi1}
			/>
			<MultipleRoleMemberSelect
				clearable={true}
				members={guild.members}
				onChange={setMulti2}
				roles={guild.roles}
				value={multi2}
			/>
		</div>
	);
}

export default App;

async function loadGuild(setGuild: Function) {
	const guild = await axios({
		method: 'GET',
		withCredentials: true,
		url: 'http://localhost/api/guild/info/963134261332951120',
	}).catch((err) => {});
	setGuild(guild?.data);
}

async function loadUser(setInfo: Function) {
	const info = await axios({
		method: 'GET',
		withCredentials: true,
		url: 'http://localhost/api/user/',
	}).catch(console.log);
	setInfo(info?.data);
}
