import { Router } from "express";
import { register, login, } from "../controller/auth.controller";

export default (router: Router) => {
    router.post('/register', register)
    router.post('/login', login)
}