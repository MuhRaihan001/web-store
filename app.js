const express = require('express');
const bodyParser = require('body-parser');
const { showProduct, insertProducts, findProduct } = require('./function/products');
const { buyProduct } = require('./function/order');
const { createAccount } = require('./function/user/register');
const { login } = require('./function/user/login');
const { showCart } = require('./function/user/cart');

require('./function/database');

const app = express();
app.use(express.static('public'));
app.use(bodyParser.json());

app.post('/register', async (req, res) =>{
    try{
        const username = req.body.username;
        const email = req.body.email;
        const password = req.body.password;
        const create = await createAccount(username, email, password);
        res.send(create)
    }catch(error){
        console.log(error);
    }
});

app.post('/login', async (req, res) =>{
    try{
        const email = req.body.email;
        const password = req.body.password;
        const loginn = await login(email, password);
        res.send(loginn)
    }catch(error){
        console.log(error);
    }
})

app.get('/product', async (req, res) =>{
    try{
        const list = await showProduct();
        res.send(list);
    }catch(error){
        console.log(error);
    }
});

app.post('/find', async (req, res) =>{
    try{
        const productName = req.body.product_name;
        const result = await findProduct(productName);
        res.send(result)
    }catch(error){
        console.log(error);
    }
})

app.post('/uploadProduct', async (req, res) =>{
    try{
        const name = req.body.productName;
        const price = req.body.price;
        const decs = req.body.decs;
        const image = req.body.image;
        const upload = await insertProducts(name, decs, image, price);
        res.send(upload)
    }catch(error){
        console.log(error);
    }
});

app.post('/buy', async (req, res) =>{
    try{
        const id = req.body.id;
        const from = req.body.from;
        const detail = req.body.detail;
        const buy = await buyProduct(from, id, detail);
        res.send(buy)
    }catch(error){
        console.log(error);
    }
})

app.post('/cart', async (req, res) =>{
    try{
        const username = req.body.name;
        const cart = await showCart(username);
        res.send(cart)
    }catch(error){
        console.log('Error:', error);
    }
})

app.listen('80', () =>{
    console.log('website online')
})