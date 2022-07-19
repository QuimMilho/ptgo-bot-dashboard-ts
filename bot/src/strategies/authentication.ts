import { Request, Response } from 'express';

export function authenticated(req: Request, res: Response, next: Function) {
	req.user ? next() : res.sendStatus(401);
}
