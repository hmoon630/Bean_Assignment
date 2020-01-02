import * as dotenv from 'dotenv';
dotenv.config()

import Koa from 'koa';
import helmet from 'koa-helmet'; 
import cors from '@koa/cors';
import logger from 'koa-logger';
import bodyParser from 'koa-bodyparser';

import { router } from './router';

const app = new Koa();
const port = process.env.PORT || 4000;

app.use(helmet())
    .use(cors())
    .use(logger())
    .use(bodyParser())
    .use(router.routes()).use(router.allowedMethods())

app.listen(port, () => {
    console.log(`Bean API Server Started.. with port ${port}`);
})
