import { Request, Response } from "express";
import userdb from "../db/users";
import { authenticate, getrandomText } from "../helper";

export const getAllUsers = async (request: Request, response: Response) => {
    try {
        const users = await userdb.getAllUser();
        return response.status(200).json(users).end();

    } catch (error: any) {
        return response.sendStatus(500);

    }
}

export const deleteUser = async (request: Request, response: Response) => {
    try {
        const { id } = request.params;
        const deletedUser = await userdb.deleteUserById(id);
        if (!deletedUser) {
            return response.sendStatus(403);
        }
        return response.status(200).json(deletedUser);

    } catch (error: any) {
        return response.sendStatus(500);

    }
}

export const deleteAllUser = async (request: Request, response: Response) => {
    try {
        const deletedUser = await userdb.deleteAllUser();
        return response.status(200).json(deletedUser).end();

    } catch (error: any) {
        return response.sendStatus(500);

    }
}


export const updateUser = async (request: Request, response: Response) => {
    try {
        const { id } = request.params;
        const { username, password } = request.body;

        if (!username && !password) {
            return response.status(400);
        }


        const user = await userdb.getuserById(id);

        if (!user) {
            return response.status(400);
        }

        user.username = username;
        if (password) {
            const salt = getrandomText();
            user.authentication.salt = salt;
            user.authentication.password = authenticate(password, salt);
        }
        await user.save();


        return response.status(200).json(user).end();

    } catch (error: any) {
        return response.sendStatus(500);

    }
}