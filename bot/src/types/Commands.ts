import { ApplicationCommandOptionData } from "discord.js";

export interface CommandOptions {
    name: string;
    description: string;
    options: ApplicationCommandOptionData[];
    defaultPermission: boolean;
    category: string;
}