import ExtendedClient from '../client/ExtendedClient';
import express, { Request, Response } from 'express';
import { Express } from 'express-serve-static-core';

import MySQLStore from 'express-mysql-session';
import * as session from 'express-session';
import passport, { PassportStatic } from 'passport';
import DiscordStrategy from '../strategies/discordOAuth';
import apiRouter from '../api';
import https from 'https';
import fs from 'fs';

export default class Server {
	app: Express;
	client: ExtendedClient;
	passport: PassportStatic;
	port: number;

	constructor(client: ExtendedClient) {
		this.app = express();
		this.client = client;

		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: true }));

		const MySQLSessionStore = MySQLStore(session);
		const sessionStore = new MySQLSessionStore(
			{
				createDatabaseTable: true,
				schema: {
					tableName: 'sessions',
					columnNames: {
						session_id: 'sessionId',
						data: 'data',
						expires: 'expires',
					},
				},
			},
			this.client.mysql
		);

		this.app.use(
			session.default({
				secret: this.client.config.api.secret,
				saveUninitialized: true,
				resave: false,
				cookie: { maxAge: 60000 * 60 * 12 },
				store: sessionStore,
			})
		);

		this.passport = passport;

		this.app.use(passport.initialize());
		this.app.use(passport.session());

		DiscordStrategy(this.client, this.passport); //Por acabar!

		this.port = this.client.config.api.port || 3000;

		this.app.use('/api', apiRouter);
		this.app.get('/', this.sendIndexHTML);
		this.app.get('*', this.sendPublicFiles);

		this.client.config.api.https ? this.startHTTPS() : this.startHTTP();
	}

	private startHTTPS() {
		console.log(this.port);
		const certs = {
			cert: fs.readFileSync(process.cwd() + '/certs/ssl.pem'),
			key: fs.readFileSync(process.cwd() + '/certs/key.pem'),
		};
		https.createServer(certs, this.app).listen(this.port, () => {
			console.log(`Server listening to https://localhost:${this.port}!`);
		});
	}

	private startHTTP() {
		this.app.listen(this.port, () =>
			console.log(`Server listening to http://localhost:${this.port}`)
		);
	}

	private sendPublicFiles(req: Request, res: Response) {
		const path = process.cwd() + `/public/${req.params[0]}`;
		if (!fs.existsSync(path)) return res.sendStatus(401);
		res.status(200).sendFile(path);
	}

	private sendIndexHTML(req: Request, res: Response) {
		res.sendFile(process.cwd() + `/public/index.html`);
	}
}
