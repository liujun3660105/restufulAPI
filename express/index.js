const express = require('express');
const mysql = require('mysql');
const co = require('co-mysql');
const md5 = require('md5-node');
const bodyparser = require('body-parser')

const app = express();
let db = mysql.createPool({
    host: '121.36.1.100',
    user: 'root',
    password: '123456',
    database: 'shop'
});
let conn = co(db);
app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(bodyparser.json());
app.post('/user', async (req, res) => {
    let { username, password } = req.body;
    //检测是否存在
    let sql = `select id from users where name = '${username}' and password = '${password}'`;
    let data = await conn.query(sql);
    if (data.length > 0) {
        res.send(
            JSON.stringify({
                status: 200,
                'message': '用户名已经注册'
            })
        );
    } else {
        //写入数据库
        password = md5(password);
        let sql = `insert into users (name, password) values ('${username}', '${password}')`;
        await conn.query(sql);
        res.end(JSON.stringify({
            status: 200,
            'message': '注册成功'
        }))
    }
})
app.get('/user/:id', (req, res) => {
    res.send(req.params.id);
    //去数据库查询
    //....
});
app.listen(3000);