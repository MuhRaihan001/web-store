const database = require('../database');
const bcrypt = require('bcrypt');
const isUsernameAndEMailExist = (username, email) => {
    return new Promise((resolve, reject) => {
      const check = 'SELECT * FROM users WHERE username=? OR email=?';
      database.query(check, [username, email], (error, results) => {
        if (error) {
          console.log(error);
          reject(error);
        } else {
          resolve(results.length > 0);
        }
      });
    });
};

async function createAccount(username, email, password){

        const isExist = await isUsernameAndEMailExist(username, email);
        if(isExist){
            return 'Gagal login, username atau email itu sudah dipakai'
        }
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const generatePassword = await bcrypt.hash(password, salt);
        return new Promise((resolve, reject) =>{
            const sql = 'INSERT INTO users (username, email, password, salt) VALUES (?, ?, ?, ?)';
            database.query(sql, [username, email, generatePassword, salt], (error, result) =>{
                if(error){
                    reject(error);
                }else{
                    resolve("Akun berhasil dibuat")
                }
            });
        })
}

module.exports = { createAccount }