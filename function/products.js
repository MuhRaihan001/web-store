const database = require('./database');

async function showProduct(){
    return new Promise((resolve, reject) =>{
        try{
            const sql = 'SELECT * FROM product';
            database.query(sql, [], (error, result) =>{
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

async function insertProducts(product_name, description, image_url, price){
    return new Promise((resolve, reject) =>{
        try{
            const sql = 'INSERT INTO product (product_name, product_picture, price, description) VALUES (?, ?, ?, ?)';
            database.query(sql, [product_name, image_url, price, description], (error, result)=>{
                if(error){
                    reject(error);
                }else{
                    const insertedProductId = result.insertId;
                    console.log('Product berhasil di masukan dengan id:', insertedProductId);
                    resolve(JSON.stringify({status: "Berhasil mengupload produk"}))
                }
            })
        }catch(error){
            reject(error);
        }
    })
}

async function findProduct(product_name){
    return new Promise((resolve, reject) =>{
        try{
            const sql = 'SELECT * FROM product WHERE product_name = ?';
            database.query(sql, [product_name], (error, result) =>{
                if(error){
                    reject(error);
                }else{
                    resolve(result)
                }
            })
        }catch(error){
            console.log(error);
        }
    })
}

module.exports = { showProduct, insertProducts, findProduct }