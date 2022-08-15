import React from 'react';
import LoginButton from '../login/LoginButton';

function NotLoggedIn() {
	return (
		<div className="content error">
			<h1>Precisas de fazer login para aceder a esta página!</h1>
			<LoginButton user={undefined} />
		</div>
	);
}

export default NotLoggedIn;
