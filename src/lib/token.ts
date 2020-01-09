import * as dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';

dotenv.config();

const jwtSecret = process.env.JWT_KEY;

export const generateToken = (payload: string) => {
    return new Promise(
        (resolve, reject) => {
            jwt.sign(
                payload,
                jwtSecret,
                (error, token) => {
                    if (error) { reject(error); }
                    resolve(token);
                },
            );
        },
    );
};

export const decodeToken = (token: string) => {
    return new Promise(
        (resolve, reject) => {
            jwt.verify(token, jwtSecret, (error, decoded) => {
                if (error) { reject(error); }
                resolve(decoded);
            });
        },
    );
};
