const http = require('http');
const mysql = require('mysql');
const co = require('co-mysql');
const md5 = require('md5-node');


//连接数据库
let db = mysql.createPool({
    host:'121.36.1.100',
    user:'root',
    password:'123456',
    database:'shop'
});
let conn = co(db);
//同一个url下不同的请求
const app = http.createServer(async (req, res)=>{
    const {method, url} = req;
    if(method === 'POST'){
        if(url === '/user'){
            let arr = [];
            req.on('data',async (data)=>{
                arr.push(data)
            });
            req.on('end', async ()=>{
                // console.log(arr);
                let buffer = Buffer.concat(arr);
                // console.log(buffer.toString());

                let {username, password} = JSON.parse(buffer.toString());
                // console.log(username, password);
                let sql = `select id from users where name = '${username}' and password = '${password}'`;
                console.log(sql);
                let data = await conn.query(sql);
                console.log(data);
                if(data.length>0){
                    res.end(
                        JSON.stringify({
                            status:200,
                            'message':'用户名已经注册'
                        })
                    );
                }else{
                    //写入数据库
                    password = md5(password);
                    let sql = `insert into users (name, password) values ('${username}', '${password}')`;
                    console.log(sql);
                    await conn.query(sql);
                    res.end(JSON.stringify({
                        status:200,
                        'message':'注册成功'
                    }))
                }

            })

            // res.sendEncoding('utf-8');
            // res.end(JSON.stringify({'message':'对user接口发送了post请求'}))
        }
    }else if(method === 'GET'){
        if(url === '/user'){
            let sql = `select id from users`;
            let data = await conn.query(sql);

            // res.sendEncoding('utf-8');
            res.end(JSON.stringify(data));
        }

        
    }
});
app.listen(3000);