import React from 'react';
import { APIDiscordUserInfo } from '../../types/API';
import '../../styles/nav.scss';
import { FaDiscord } from 'react-icons/fa';

import { useNavigate } from 'react-router-dom';
import APIURL from '../..';

function LoginButton(props: { user: APIDiscordUserInfo | undefined }) {
	if (props.user) {
		return (
			<div className="logout">
				<span>
					{props.user.username}#{props.user.discriminator}
				</span>
				<button
					onClick={() => {
						window.location.href = `${APIURL}/api/auth/logout`;
					}}
				>
					Sair
				</button>
			</div>
		);
	} else {
		return (
			<button
				className="login loginButton"
				onClick={() => {
					window.location.href = `${APIURL}/api/auth/login`;
				}}
			>
				<FaDiscord size={20} className="loginIcon" />
				<span>Entrar com o Discord</span>
			</button>
		);
	}
}

export default LoginButton;
