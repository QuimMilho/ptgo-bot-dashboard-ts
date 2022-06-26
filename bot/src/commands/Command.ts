import { ApplicationCommandOptionData, CommandInteraction, MessageEmbed } from "discord.js";
import ExtendedClient from "../client/ExtendedClient";
import { CommandOptions } from "../types/Commands";
import { FeatureList } from "../types/Feature";

export default class Command {
    client: ExtendedClient;
    name: string;
    description: string;
    options: ApplicationCommandOptionData[];
    defaultPermission: boolean;
    category: FeatureList;

    constructor(client: ExtendedClient, options: CommandOptions) {
        this.client = client;
        this.name = options.name;
        this.description = options.description;
        this.options = options.options;
        this.defaultPermission = options.defaultPermission;
        this.category = options.category;
    }

    run(interaction: CommandInteraction) {
        const embed = new MessageEmbed()
            .setTitle("Comando padrão!")
            .setColor([0, 255, 255])
            .setTimestamp();
        interaction.reply({embeds: [embed], ephemeral: true});
    }
}