import crypto from 'crypto';
import validator from 'validator';
import dotenv from 'dotenv';

dotenv.config();

const secret = process.env.PEPER;
export const isVaildEmail = (email: string): boolean => validator.isEmail(email);
export const getrandomText = () => crypto.randomBytes(128).toString('base64')

export const authenticate = (password: string, salt: string) => {
    const hash = crypto.createHmac('SHA-256', [password, salt].join('/'));
    return hash.update(secret!.toString()).digest('hex');
}

export const getExpireDate = (): Date => {
    const currentDate = new Date();
    return new Date(currentDate.setDate(currentDate.getDate() + 5))
}