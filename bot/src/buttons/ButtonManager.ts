import { ButtonInteraction, Collection } from 'discord.js';
import ExtendedClient from '../client/ExtendedClient';
import Button from './Button';
import fs from 'fs';

export default class ButtonManager {
	client: ExtendedClient;
	buttons: Collection<string, Collection<string, Button>>;

	constructor(client: ExtendedClient) {
		this.client = client;
		this.buttons = new Collection();

		this.loadButtons();
	}

	async loadButtons() {
		const path = `${__dirname}/buttonList/`;

		const categories = fs.readdirSync(path);

		for (let i = 0; i < categories.length; i++) {
			const category = categories[i];

			const buttons = fs.readdirSync(`${path}/${category}`);

			for (let h = 0; h < buttons.length; h++) {
				const buttonFile = buttons[h];
				const buttonClass = (await import(`${path}/${category}/${buttonFile}`))
					.default;

				const button: Button = new buttonClass(this.client);
				const buttonCategory = this.buttons.get(button.category);

				if (buttonCategory) {
				} else {
					this.buttons.set(button.category, new Collection());
					this.buttons.get(button.category).set(button.command, button);
				}

				console.log(
					`Botão na categoria ${button.category} e comando ${button.command} carregado!`
				);
			}
		}
	}

    async executeButton(interaction: ButtonInteraction) {
        await interaction.deferReply({ephemeral: true});
        const parts = interaction.customId.split('-');
        this.buttons.get(parts[0]).get(parts[1]).run(interaction, parts[2]);
    }
}
