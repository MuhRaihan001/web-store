const database = require('../database');

async function showCart(username){
    return new Promise((resolve, reject) =>{
        try{
            const sql = 'SELECT * FROM cart WHERE user = ?';
            database.query(sql, [username], (error, result) =>{
                if(error){
                    reject(error);
                }else{
                    resolve(result);
                }
            })
        }catch(error){
            reject(error);
        }
    })
}

module.exports = { showCart }