import * as Router from 'koa-router';

import { Register, Login, checkUser } from 'controllers/auth';

const auth = new Router();

auth.post('/register', Register);
auth.post('/login', Login);

auth.get('/check-user', checkUser);


const router = new Router();

router.use('/auth', auth.routes());


export { router };