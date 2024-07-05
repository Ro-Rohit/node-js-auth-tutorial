import mongoose, { Document } from "mongoose";

interface User {
    username: string;
    email: string;
    authentication: Record<string, any>
}

const userSchema = new mongoose.Schema<User>({
    username: { type: String, require: true },
    email: { type: String, require: true },
    authentication: {
        password: { type: String, require: String, select: false },
        salt: { type: String, select: false },
        sessionToken: { type: String, select: false },
    }
})

const UserModel = mongoose.model<User>('users', userSchema);

const getAllUser = async () => await UserModel.find().select('+authentication.password +authentication.salt').exec();
const getuserById = async (id: string) => await UserModel.findById(id);
const getuserByEmail = async (email: string, showAllFields: boolean) => {
    return showAllFields
        ? await UserModel.findOne({ email }).select('+authentication.password +authentication.salt').exec()
        : await UserModel.findOne({ email })


}
const getUserBySessionToken = async (token: string) => await UserModel.findOne({ 'authentication.sessionToken': token })

const createUser = async (values: Record<string, any>) => await new UserModel(values).save().then((user) => user.toJSON());
const deleteUserById = async (id: string) => await UserModel.findByIdAndDelete(id);
const updateUserById = async (id: string, values: Record<string, any>) => await UserModel.findByIdAndUpdate(id, values);
const deleteAllUser = async () => await UserModel.deleteMany({});
export default {
    getAllUser,
    getuserById,
    getuserByEmail,
    getUserBySessionToken,
    createUser,
    deleteUserById,
    updateUserById,
    deleteAllUser
};