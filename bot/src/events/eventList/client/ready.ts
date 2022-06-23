import ExtendedClient from '../../../client/ExtendedClient';
import Event from '../../Event';

export default class extends Event {
	constructor(client: ExtendedClient) {
		super(client, { name: 'ready' });
	}

	run = async () => {
		console.log(`Bot is ready in ${this.client.guilds.cache.size} guilds!`);
		for (let i = 0; i < this.client.guilds.cache.size; i++) {
			const guild = await this.client.guilds.fetch(
				this.client.guilds.cache.at(i).id
			);
			if (!this.client.guildManager.loadGuild(guild.id))
				this.client.guildManager.createGuild(guild.id);
			await this.client.commandManager.setCommands(guild).catch(console.log);
			console.log(`Commandos registados na guild ${guild.name}`);
		}
	};
}
