const product = document.querySelector('.product-list');
const loginPage = document.querySelector('#login-page');
const registerPage = document.querySelector('#register-page');
const register = document.querySelector('#register');
const login = document.querySelector('#login');
const user_info = document.querySelector('.user-information');

const savedEmail = getCookie('email');
const savedPassword = getCookie('password');

let Username = null;

const changeFormPage = (page) =>{
    document.querySelectorAll('.login-form, .register-form').forEach(elemen =>{
        elemen.style.display = 'none';
        page.style.display = 'block'
    })
};

const loginUser = async (email, password) =>{
    try{
        const response = await fetch('/login', {
            method: 'POST',
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email: email, password: password})
        })
        const data = await response.json();
        if(data.status === "Tidak ada email seperti itu"){
            alert('Email tidak valid')
            deleteCookie('email');
            deleteCookie('password');
            window.location.reload();
        }
        console.log(data);
        console.log('Berhasil login');
        Username = data.username;
        displaySaldo(data.saldo);
        await showCart('TsumuX')
        document.querySelector('.login-form').style.display = 'none';
        document.querySelector('.register-form').style.display = 'none';
        document.querySelector('.saldo-user').style.display = 'flex';
        document.querySelector('.first-page').style.display = 'flex';
        document.querySelector('.product').style.display = 'flex';
        await showProduct();
    }catch(error){
        console.log(error);
    }
}

const displaySaldo = (saldoUser) =>{
    document.querySelector('.saldo-user').display = 'flex'
    const saldo = document.querySelector('#saldo');
    if(saldoUser === 0){
        saldo.innerHTML = 'Anda belum mengisi saldo'
    }else{
        saldo.innerHTML = saldoUser + 'K';
    }
}

const showCart = async (user) => {
    try {
        const response = await fetch('/cart', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name: user })
        });
        const data = await response.json();
        const list_cart = document.querySelector('.order-list');
        
        if (data.length === 0) {
            list_cart.innerHTML = 'Anda belum memesan apapun';
        } else {
            data.forEach(cart => {
                const cartItem = document.createElement('div');
                cartItem.innerHTML = `
                    <h3>${cart.product_name}</h3>
                    <p>Status pesanan: ${cart.status}</p>
                    <img src="${cart.url}">
                `;
                list_cart.appendChild(cartItem);
            });
        }
    } catch (error) {
        console.error(error);
        alert('Terjadi kesalahan, harap reload atau laporkan ke developer');
    }
}


const showProduct = async () => {
    try {
        document.querySelector('.product-list').style.display = 'flex';
        const response = await fetch('/product');
        const data = await response.json();

        const product_list = document.createElement('div');
        product_list.classList.add('product-list');
        if(data.length === 0){
            const productItem = document.createElement('div');
            productItem.classList.add('product-item');

            productItem.innerHTML = `
                Kosong
            `;
            product_list.appendChild(productItem);
        }
        data.forEach(product => {
            const productItem = document.createElement('div');
            productItem.classList.add('product-item');

            productItem.innerHTML = `
                <h2>${product.product_name}</h2>
                <p>${product.description}</p>
                <img src="${product.product_picture}">
                <p>Price: Rp.${product.price}K</p>
                <input type="text" id="order-detail-${product.id}" placeholder="request ke seller">
                <button id="${product.id}" data-confirm="Yakin ingin memesan produk ini?">order</button>
            `;
            product_list.appendChild(productItem);
        });

        product.appendChild(product_list);
    } catch (error) {
        console.log(error);
    }
}

register.addEventListener('submit', async (event) =>{
    event.preventDefault();
    const username = document.querySelector('#username').value;
    const email = document.querySelector('#userEmail').value;
    const password = document.querySelector('#userPassword').value;
    if(!username || !email || !password){
        alert('Harap mengisi semua input')
    }else{
        try{
            const data = await fetch('/register',{
                method: 'POST',
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: username, email: email, password: password
                })
            });
            const response = await data.text();
            alert(response);
            const login_page = document.querySelector('.login-form');
            changeFormPage(login_page)
        }catch(error){
            console.log(error)
        }
    }
});

login.addEventListener('submit', async (event) =>{
    event.preventDefault();
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    setCookie('email', email, 10);
    setCookie('password', password, 10);
    window.location.reload();
})

loginPage.addEventListener('click', () =>{
    const login = document.querySelector('.login-form');
    changeFormPage(login)
});

registerPage.addEventListener('click', () =>{
    const register = document.querySelector('.register-form');
    changeFormPage(register);
})

product.addEventListener('click', async (event) => {
    if (event.target && event.target.tagName === 'BUTTON') {
        const confirmationMessage = event.target.getAttribute('data-confirm');
        if (confirm(confirmationMessage)) {
            try {
                console.log(username);
                const productId = event.target.id;
                const orderDetail = document.querySelector(`#order-detail-${productId}`).value;
                const response = await fetch('/buy', {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        id: productId,
                        from: Username,
                        detail: orderDetail
                    })
                })
                const data = await response.json();
                alert(data.status);
                window.location.reload();
                console.log(`Ordered product with ID: ${productId}`);
            } catch (error) {
                console.log(error);
            }
        }
    }
});

if (savedEmail && savedPassword) {
    loginUser(savedEmail, savedPassword);
}

function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getCookie(name) {
    const cname = name + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');
    for (let i = 0; i < cookieArray.length; i++) {
        let c = cookieArray[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(cname) === 0) {
            return c.substring(cname.length, c.length);
        }
    }
    return "";
}

function deleteCookie(name) {
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}
