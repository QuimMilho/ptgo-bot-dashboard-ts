import React from 'react';
import Embed from './components/messages/Embed';
import { CustomEmbed } from './types/Messages';
import './styles/global.scss';

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

	return (
		<div>
			<Embed embed={embed} />
		</div>
	);
}

export default App;
