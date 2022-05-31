export interface AppOptions {
	token: string;
	appId: string;
	secret: string;
	mysql: MySQLOptions;
	api: APIOptions;
    memoryTrack: boolean;
}

export interface MySQLOptions {
	host: string;
	database: string;
	user: string;
	password: string;
}

export interface APIOptions {
	port: number;
	https: boolean;
	cors: CorsOptions;
	secret: string;
	callbackURL: string;
}

export interface CorsOptions {
	origin: string;
}
