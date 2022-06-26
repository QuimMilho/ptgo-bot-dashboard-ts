import { ApplicationCommandOptionData } from "discord.js";
import { FeatureList } from "./Feature";

export interface CommandOptions {
    name: string;
    description: string;
    options: ApplicationCommandOptionData[];
    defaultPermission: boolean;
    category: FeatureList;
}