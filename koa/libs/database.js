const mysql = require('mysql');
const co = require('co-mysql');
const config = require('../config');
const db = mysql.createPool({...config});


const conn = co(db);

module.exports = conn;
