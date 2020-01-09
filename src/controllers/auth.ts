import * as dotenv from 'dotenv';
import * as Joi from 'joi';
import * as Koa from 'koa';
dotenv.config();

import {
    AUTH_REQUIRED, EXISTING_ID, INVALID_ACCOUNT, INVALID_REQUEST_BODY_FORMAT, INVALID_TOKEN,
} from 'constants/error';
import * as crypto from 'crypto';
import { decodeToken, generateToken } from 'lib/token';
import { User } from 'models';

export const Register = async (ctx: Koa.Context) => {
    const bodyFormat = Joi.object().keys({
        id : Joi.string().min(5).max(20).required(),
        password : Joi.string().min(8).max(30).required(),
    });

    const joiError = Joi.validate(ctx.request.body, bodyFormat);

    if (joiError.error) {
        throw INVALID_REQUEST_BODY_FORMAT;
    }

    const account = await User.findOne({
        where: {
            id: ctx.request.body.id,
        },
    });

    if (account) {
        throw EXISTING_ID;
    }

    const password = await crypto.createHmac('sha256', String(process.env.PASSWORD_KEY)).update(ctx.request.body.password).digest('hex');

    await User.create({
        id : ctx.request.body.id,
        password,
    });

    ctx.status = 200;
    ctx.body = {
        id : ctx.request.body.id,
    };
};

export const Login = async (ctx: Koa.Context) => {
    const bodyFormat = Joi.object().keys({
        id: Joi.string().min(5).max(20).required(),
        password: Joi.string().min(8).max(30).required(),
    });

    const joiError = Joi.validate(ctx.request.body, bodyFormat);

    if (joiError.error) {
        throw INVALID_REQUEST_BODY_FORMAT;
    }

    const password = await crypto.createHmac('sha256', String(process.env.PASSWORD_KEY)).update(ctx.request.body.password).digest('hex');

    const account = await User.findOne({
        where: {
            id: ctx.request.body.id,
            password,
        },
    });

    if (!account) {
        throw INVALID_ACCOUNT;
    }

    const token = await generateToken(account.id);

    ctx.status = 200;
    ctx.body = {
        token,
    };
};

export const checkUser = async (ctx: Koa.Context) => {
    const token: string = ctx.header.token;

    if (!token) {
        throw AUTH_REQUIRED;
    }

    let resolved: string;

    try {
        resolved = String(await decodeToken(token));
    } catch (error) {
        throw INVALID_TOKEN;
    }

    ctx.status = 200;
    ctx.body = {
        id : resolved,
    };
};
