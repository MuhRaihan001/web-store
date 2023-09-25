const database = require('./database');

async function buyProduct(name, product_id, detail) {
    try{
        const sql = 'SELECT * FROM product WHERE id = ?';
        const result = await new Promise((resolve, reject) => {
            database.query(sql, [product_id], (error, result) => {
                if(error){
                    reject(error);
                }else{
                    resolve(result);
                }
            });
        });
        const userSql = 'SELECT * FROM users WHERE username = ?';
        const Userdata = await new Promise((resolve, reject) =>{
            database.query(userSql, [name], (error, result) =>{
                if(error){
                    reject(error);
                }else{
                    resolve(result);
                }
            })
        });
        if(Userdata[0].saldo < result[0].price){
            return JSON.stringify({status: "Anda tidak memiliki saldo yang cukup untuk membeli produk ini"})
        }
        const user = 'UPDATE users SET saldo = saldo - ? WHERE username = ?';
        await database.query(user, [result[0].price, name]);

        const insert_product = 'INSERT INTO list_order (from_user, product_id, product_name, price, detail) VALUES (?, ?, ?, ?, ?)';
        await database.query(insert_product, [name, result[0].id, result[0].product_name, result[0].price, detail]);

        const insert_cart = 'INSERT INTO cart (user, product_id, product_name, status, url) VALUES (?, ?, ?, ?, ?)'
        await database.query(insert_cart, [name, result[0].id, result[0].product_name, 'Dalam Proses', result[0].product_picture]);

        console.log('Pesanan berhasil dibuat');
        return JSON.stringify({status: "Product berhasil di order, harap tunggu proses"});
    }catch (error){
        console.error('Gagal menulis ke file JSON:', error);
        throw error;
    }
}

module.exports = { buyProduct }
