import ExtendedClient from '../client/ExtendedClient';
import { EventOptions } from '../types/Events';

export default class Event {
	name: string;
	client: ExtendedClient;

	constructor(client: ExtendedClient, options: EventOptions) {
		this.client = client;
		this.name = options.name;
	}

	run (args1: any, args2: any, args3: any, args4: any) {
		console.log(`Default event message for event ${this.name}!`);
	}

}
