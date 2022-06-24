import { ApplicationCommandOptionData } from "discord.js";
import { FeatureList } from "./Features";

export interface CommandOptions {
    name: string;
    description: string;
    options: ApplicationCommandOptionData[];
    defaultPermission: boolean;
    category: FeatureList;
}