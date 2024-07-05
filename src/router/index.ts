import express, { Router } from "express";
import auth from "./auth.router";
import users from "./users.router";

const authRouter: Router = express.Router();
const userRouter: Router = express.Router();

const routeList = [
    { route: '/auth', router: authRouter },
    { route: '/user', router: userRouter },
];


export default () => {
    auth(authRouter);
    users(userRouter);
    return routeList;
}