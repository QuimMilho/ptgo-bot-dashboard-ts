import { Collection } from 'discord.js';
import ExtendedClient from '../client/ExtendedClient';
import Event from './Event';
import fs from 'fs';

export default class EventManager {
	client: ExtendedClient;
	events: Collection<String, Event>;

	constructor(client: ExtendedClient) {
		this.client = client;
		this.events = new Collection();
		this.loadEvents();
	}

	async loadEvents() {
		const path = `${__dirname}/eventList/`;

		const categories = fs.readdirSync(path);

		for (let i = 0; i < categories.length; i++) {
			const category = categories[i];

			const events = fs.readdirSync(`${path}/${category}`);

			for (let h = 0; h < events.length; h++) {
				const eventFile = events[h];
				const eventClass = (await import(`${path}/${category}/${eventFile}`))
					.default;

				const event: Event = new eventClass(this.client);

				this.events.set(event.name, event);
				this.client.on(event.name, event.run);

				console.log(`Event ${event.name} registered!`);
			}
		}
	}
}
