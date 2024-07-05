import { Request, Response } from "express";
import { getrandomText, authenticate, isVaildEmail, getExpireDate } from "../helper";
import userdb from '../db/users';
import dotenv from 'dotenv';

dotenv.config();

export const register = async (request: Request, response: Response) => {

    try {

        const { username, email, password } = request.body;

        if (!username || !password || !(email && isVaildEmail(email))) {
            return response.sendStatus(400);
        }

        const isUserExist = await userdb.getuserByEmail(email, false)

        if (isUserExist) {
            return response.status(400).send('User Already exists')
        }


        const salt = getrandomText();
        const newUser = await userdb.createUser({
            username,
            email,
            authentication: {
                salt,
                password: authenticate(password, salt)
            }
        })

        return response.status(200).json(newUser).end();


    } catch (error: any) {
        console.log(`[ERROR]: user register error! message: ${error}`)
        return response.sendStatus(500);
    }



}

export const login = async (request: Request, response: Response) => {
    try {
        const { email, password } = request.body;

        if (!email || !password) {
            return response.sendStatus(400);
        }

        const user = await userdb.getuserByEmail(email, true);

        if (!user) {
            return response.status(400).send('User doesnt exists')
        }

        const hashpassword = authenticate(password, user.authentication.salt)
        console.log(hashpassword, user.authentication);
        const isPasswordCorrect = user.authentication.password == hashpassword


        if (!isPasswordCorrect) {
            return response.status(403).send('wrong password')
        }


        const salt = getrandomText();
        const token = authenticate(salt, user.id);
        const updateUser = await userdb.updateUserById(user.id, {
            'authentication': {
                'sessionToken': token,
            }
        }
        )
        response.cookie(process.env.SESSION_KEY!, token, { expires: getExpireDate(), httpOnly: true, })

        return response.status(200).json(updateUser).end();
    } catch (error: any) {
        console.log(error)
        return response.sendStatus(500);
    }
}

