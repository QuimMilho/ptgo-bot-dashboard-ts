import DiscordClient from './Client';

interface EventOptions {
	name: string;
}

export default class Event {
	client: DiscordClient;
	name: string;

	constructor(client: DiscordClient, options: EventOptions) {
		this.client = client;
		this.name = options.name;
	}
}
