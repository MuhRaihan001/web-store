const mysql = require('mysql');
const config = require('../config.json');

const database = mysql.createConnection({
    host: config.mysql.host,
    user: config.mysql.user,
    password : config.mysql.password,
    database: config.mysql.database
});

database.connect((err) =>{
    if(err){
        console.log('Gagal terhubung ke database', err.message)
    }else{
        console.log('Berhasil terhubung ke database: ' + database.config.database)
    }
})

module.exports = database