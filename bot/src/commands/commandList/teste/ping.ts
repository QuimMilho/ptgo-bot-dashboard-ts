import ExtendedClient from '../../../client/ExtendedClient';
import Command from '../../Command';

export default class extends Command {
	constructor(client: ExtendedClient) {
		super(client, {
			name: 'ping',
			category: 'teste',
			defaultPermission: false,
			description: 'Comando teste',
			options: [],
		});
	}
}
