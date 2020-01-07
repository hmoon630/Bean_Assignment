import * as Router from 'koa-router';

import { Register } from 'controllers/auth';

const auth = new Router();

auth.post('/register', Register);


const router = new Router();

router.use('/auth', auth.routes());


export { router };