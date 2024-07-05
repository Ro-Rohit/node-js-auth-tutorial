import { Request, Response, NextFunction } from "express";
import userdb from "../db/users";
import { merge, get } from "lodash";

export const isAuthenticated = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const sessionToken = request.cookies[process.env.SESSION_KEY!];
        const user = await userdb.getUserBySessionToken(sessionToken);

        if (!user) {
            return response.status(400).send("Please Login first");
        }

        merge(request, { identity: user });

        return next();
    } catch (error) {
        console.log(error);
        return response.sendStatus(500);
    }

}

export const isOwner = async (request: Request, response: Response, next: NextFunction) => {
    try {

        const { id } = request.params;

        const currentUserId = get(request, 'identity._id');

        if (!currentUserId) {
            return response.status(400).send("Please Login first");
        }

        if (currentUserId != id) {
            return response.sendStatus(403);
        }

        return next();
    } catch (error) {
        console.log(error);
        return response.sendStatus(500);
    }

}