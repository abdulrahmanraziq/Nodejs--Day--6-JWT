import bcrypt from "bcryptjs";

import 'dotenv/config.js';

import jwt from "jsonwebtoken";

const hashPassword = async(password) => {
    try {
        let salt = await bcrypt.genSalt(Number(process.env.SALT));
        let hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword
    } catch (error) {
        throw error
    }
}

const comparePassword = async(password, comparePassword) => {
    try {
        return await bcrypt.compare(password, comparePassword);
    } catch (error) {
        throw error
    }
}

const createToken = async(payload) => {
    try {
        return await jwt.sign(payload, process.env.JWT_SECRET, {expiresIn:'1h'})
    } catch (error) {
        throw error
    }
}
export default {
    hashPassword,
    comparePassword,
    createToken
}