import React from 'react';
import { APIDiscordUserInfo } from '../../types/API';
import '../../styles/nav.scss';
import LoginButton from '../login/LoginButton';
import { useNavigate } from 'react-router-dom';

function Navigation(props: { user: APIDiscordUserInfo | undefined }) {
	const navigate = useNavigate();
	return (
		<div className="navBar">
			<a href="https://ptgo.pt">
				<img src="/ptgo.png" />
			</a>
			<button onClick={() => navigate('/')}>Home</button>
			<button onClick={() => navigate('/guild')}>Guilds</button>
			<LoginButton user={props.user} />
		</div>
	);
}

export default Navigation;
