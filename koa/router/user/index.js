const Router = require('koa-router');
const md5 = require('md5-node');
const router = new Router();
router.get('/user', async ctx=>{
    ctx.body = '主页';
})
router.post('/user', async ctx =>{
    let {username, password} = ctx.request.body;
    console.log(username);
    ctx.body = {
        username,
        password
    }

})
module.exports = router.routes();