const database = require('../database');
const bcrypt = require('bcrypt');

async function login(email, password) {
    return new Promise((resolve, reject) => {
        try {
            const sql = 'SELECT * FROM users WHERE email = ?';
            database.query(sql, [email], (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    if (result.length > 0) {
                        bcrypt.compare(password, result[0].password, (error, matchPassword) => {
                            if (error) {
                                reject(error);
                            } else {
                                if (matchPassword) {
                                    resolve({
                                        username: result[0].username,
                                        saldo: result[0].saldo,
                                        email: result[0].email
                                    });
                                } else {
                                    resolve({ status: "Password salah" });
                                }
                            }
                        });
                    } else {
                        resolve({ status: "Tidak ada email seperti itu" });
                    }
                }
            });
        } catch (error) {
            reject(error);
        }
    });
}

module.exports = { login }
