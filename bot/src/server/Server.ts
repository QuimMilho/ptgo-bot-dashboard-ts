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
				schema: {
					tableName: 'sessions',
					columnNames: {
						session_id: 'session_id',
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

		DiscordStrategy(this.client, this.passport);

		this.port = this.client.config.api.port || 3000;

		this.app.use(
			'/api',
			(req, res, next) => {
				if (client.serverReady) {
					next();
				} else {
					res.sendStatus(425);
				}
			},
			apiRouter
		);
		this.app.get(
			'/',
			(req, res, next) => {
				if (client.serverReady) {
					next();
				} else {
					res.sendStatus(425);
				}
			},
			this.sendIndexHTML
		);
		this.app.get(
			'*',
			(req, res, next) => {
				if (client.serverReady) {
					next();
				} else {
					res.sendStatus(425);
				}
			},
			this.sendPublicFiles,
			this.sendIndexHTML
		);

		this.client.config.api.https ? this.startHTTPS() : this.startHTTP();
	}

	private startHTTPS() {
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

	private sendPublicFiles(req: Request, res: Response, next: Function) {
		const path = process.cwd() + `/public/${req.params[0]}`;
		console.log(path);
		if (!fs.existsSync(path)) return next();
		res.status(200).sendFile(path);
	}

	private sendIndexHTML(req: Request, res: Response) {
		const path = process.cwd() + `/public/${req.params[0]}`;
		console.log(path);
		res.sendFile(process.cwd() + `/public/index.html`);
	}
}
