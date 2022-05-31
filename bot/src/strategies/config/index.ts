import fs from 'fs';

import { AppOptions } from '../../types/options';

export function loadConfig() {
	const options = readJsonSync('/config/bot.json');

	return options;
}

export function readJsonSync(path: string) {
	const fullPath = process.cwd() + path;

	const data = fs.readFileSync(fullPath, 'utf-8');

	const json: AppOptions = JSON.parse(data);

	return json;
}
