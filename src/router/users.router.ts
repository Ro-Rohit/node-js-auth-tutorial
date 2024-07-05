import { Router } from "express";
import { deleteAllUser, deleteUser, getAllUsers, updateUser } from "../controller/user.controller";
import { isAuthenticated, isOwner } from "../middleware";


export default (router: Router) => {
    router.get('/', getAllUsers)
    router.delete('/:id', isAuthenticated, deleteUser)
    router.delete('/', isAuthenticated, isOwner, deleteAllUser)
    router.put('/:id', isAuthenticated, updateUser)
}