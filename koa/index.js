const Koa = require('koa');
const Router = require('koa-router');
const bodyparser = require('koa-bodyparser');
const config = require('./config');
const app = new Koa();
app.context.db = require('./libs/database');
app.context.config = config
app.use(bodyparser())
const router = new Router();
router.use('/api', require('./router/user'));
app.use(router.routes());
app.listen(3000);