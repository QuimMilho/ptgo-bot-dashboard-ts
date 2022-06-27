export interface ClientConfig {
	token: string;
	app_id: string;
	secret: string;
	mysql: MySQLConfig;
	api: APIConfig;
	memoryTrack: boolean;
}

export interface MySQLConfig {
	host: string;
	user: string;
	password: string;
	database: string;
	port: number;
}

export interface APIConfig {
	port: number;
	https: boolean;
	secret: string;
	callbackURL: string;
}
