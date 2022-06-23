import { ConnectionOptions } from 'mysql';

export interface ClientConfig {
	token: string;
	app_id: string;
	secret: string;
	mysql: ConnectionOptions;
	api: APIConfig;
	memoryTrack: boolean;
}

export interface APIConfig {
	port: number;
	https: boolean;
	secret: string;
	callbackURL: string;
}
