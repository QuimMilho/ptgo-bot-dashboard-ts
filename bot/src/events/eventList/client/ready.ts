import ExtendedClient from '../../../client/ExtendedClient';
import Event from '../../Event';

export default class extends Event {
	constructor(client: ExtendedClient) {
		super(client, { name: 'ready' });
	}

	run = async () => {
		const guilds = await (this.client.guilds.fetch().catch(console.log));
		if (!guilds) {
			console.log('Ocorreu um erro ao inicializar as guilds!')
			process.exit(-1);
		}

		console.log(`Bot is ready in ${guilds.size} guilds!`);

		for (let i = 0; i < guilds.size; i++) {
			const guild = await (guilds.at(i).fetch().catch(console.log));
			if (!guild) {
				console.log(`Ocorreu um erro ao ler a guild ${guilds.at(i).id}!`);
				continue;
			}

			if (!this.client.guildManager.loadGuild(guild.id))
				this.client.guildManager.createGuild(guild.id);

			await this.client.commandManager.setCommands(guild).catch(console.log);
			
			console.log(`Commandos registados na guild ${guild.name}`); 
		}
	};
}
