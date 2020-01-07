import * as Koa from 'koa';
import * as Joi from 'joi';
import * as dotenv from 'dotenv'
dotenv.config();

import { User } from 'models';
import {
    INVALID_REQUEST_BODY_FORMAT, EXISTING_ID
} from 'constants/error';
import * as crypto from 'crypto';

export const Register = async (ctx: Koa.Context) => {
    const bodyFormat = Joi.object().keys({
        id : Joi.string().min(5).max(20).required(),
        password : Joi.string().min(8).max(30).required()
    })

    const joiError = Joi.validate(ctx.request.body, bodyFormat);

    if (joiError.error) {
        throw INVALID_REQUEST_BODY_FORMAT;
    }

    const account = await User.findOne({
        where: {
            id: ctx.request.body.id
        }
    })

    if (account) {
        throw EXISTING_ID;
    }

    const password = await crypto.createHmac('sha256', String(process.env.PASSWORD_KEY)).update(ctx.request.body.password).digest('hex');

    await User.create({
        id : ctx.request.body.id,
        password : password
    });
    
    ctx.status = 200;
    ctx.body = {
        "id" : ctx.request.body.id
    }
}

