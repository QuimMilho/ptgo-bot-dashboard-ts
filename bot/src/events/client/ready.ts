import DiscordClient from '../../structs/Client';
import Event from '../../structs/Event';

export default class extends Event {
	constructor(client: DiscordClient) {
		super(client, { name: 'ready' });
	}

	run = () => {
		console.log(
			`O bot está pronto em ${this.client.guilds.cache.size} guilds!`
		);
	}
}
