import { menuArray } from "./data.js";

// console.log(menuArray);
const container = document.querySelector('article'); // our main content container
const cartEl = document.querySelector('aside');
// cartEl.innerHTML = 'TESTING';

let cart = [];
// container.innerHTML = '<h3>We will show our interactive menu here...';

document.addEventListener('click', function(e){
    // console.log(e.target.dataset.buy);
    e.target.dataset.buy && handleBuyClick(e.target.dataset.buy);
})

function renderMenu(){
    container.innerHTML = '';
    menuArray.forEach((item) => {
        container.innerHTML += `
            <section>
                <img src="./images/${item.image}" alt="${item.name} icon">
                <section>
                    <h3>${item.name}</h3>
                    <p>${item.ingredients.join(', ')}</p>
                    <h4>$${item.price}</h4>
                </section>
                <button data-buy="${item.id}">+</button>
            </section>`
    });
}


function handleBuyClick(id){
    // console.log(id, typeof id);
    id = Number(id);
    // console.log(id, typeof id);
    let item = menuArray.filter(item => item.id === id);
    // console.log(item);
    cart.push(...item);
    // console.log(cart);
    renderCart(cart);
}

function renderCart(cart){
    console.log('render cart');
    cartEl.innerHTML = `<h2>Your order</h2>`;
    cart.forEach(item => {
        cartEl.innerHTML += `
        <section>
            <h3>${item.name}</h3>
            <button>remove</button>
            <h4>$${item.price}</h4>
        <section>
        `;
    });
}

renderMenu();