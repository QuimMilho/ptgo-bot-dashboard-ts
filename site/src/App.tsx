import React, { useEffect, useState } from 'react';
import './styles/global.scss';
import axios from 'axios';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './components/pages/Home';
import Navigation from './components/pages/Navigation';
import { APIUserInfo } from './types/API';
import GuildList from './components/pages/GuildList';
import APIURL from './index';
import Guild from './components/pages/Guild';
import NotFound from './components/pages/NotFound';
import Member from './components/pages/Member';

let done = false;

function App(): JSX.Element {
	const [user, setUser] = useState<APIUserInfo>({
		servers: [],
		user: { avatarURL: null, discriminator: null, username: null },
	});

	if (!done) {
		loadUser(setUser);
		done = true;
	}

	return (
		<Router>
			<Navigation user={user?.user} />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/guild" element={<GuildList guilds={user.servers} />} />
				<Route path="/guild/:id" element={<Guild guilds={user.servers} />} />
				<Route path="/guild/:id/:page" element={<Guild guilds={user.servers} />} />
				<Route path="/member/:guildId/:memberId" element={<Member />} />
				<Route path="/*" element={<NotFound />} />
			</Routes>
		</Router>
	);
}

export default App;

async function loadUser(setInfo: Function) {
	const info = await axios({
		method: 'GET',
		withCredentials: true,
		url: `${APIURL}/api/user`,
	}).catch(console.log);
	setInfo(info?.data);
}
