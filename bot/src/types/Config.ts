import { ConnectionOptions } from 'mysql2';

export interface ClientConfig {
	token: string;
	app_id: string;
	secret: string;
	mysql: ConnectionOptions;
	api: APIConfig;
	memoryTrack: boolean;
}

export interface APIConfig {
	port: string;
	https: boolean;
	secret: string;
	callbackURL: string;
}
