import React, { useState } from 'react';
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
import Warning from './components/pages/Warning';

let done = false;

export let warn: (title: string, text?: string | undefined) => void;

function App(): JSX.Element {
	const [user, setUser] = useState<APIUserInfo | undefined>({
		servers: [],
		user: { avatarURL: null, discriminator: null, username: null },
	});

	const [warning, setWarning] = useState<{
		text: string;
		title: string;
		opened: boolean;
	}>({ text: '', title: '', opened: false });

	warn = (title: string, text?: string | undefined) => {
		setWarning({ title, text: text ? text : '', opened: true });
	};

	if (!done) {
		loadUser(setUser);
		done = true;
	}

	return (
		<Router>
			<Navigation user={user?.user} />
			<Warning
				clicked={() => {
					setWarning({ ...warning, opened: false });
				}}
				opened={warning.opened}
				text={warning.text}
				title={warning.title}
			/>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/guild" element={<GuildList guilds={user?.servers} />} />
				<Route path="/guild/:id" element={<Guild guilds={user?.servers} />} />
				<Route
					path="/guild/:id/:page"
					element={<Guild guilds={user?.servers} />}
				/>
				<Route path="/member/:guildId/:memberId" element={<Member />} />
				<Route path="/*" element={<NotFound />} />
			</Routes>
		</Router>
	);
}

export default App;

async function loadUser(setInfo: Function) {
	console.log(APIURL);
	const info = await axios({
		method: 'GET',
		withCredentials: true,
		url: `${APIURL}/api/user`,
	}).catch(console.log);
	setInfo(info?.data);
}
