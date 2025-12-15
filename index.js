import { menuArray } from "./data.js";
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

// console.log(menuArray);
const container = document.querySelector('article'); // our main content container
const cartEl = document.querySelector('aside');
// cartEl.innerHTML = 'TESTING';

let cart = [];
// container.innerHTML = '<h3>We will show our interactive menu here...';

document.addEventListener('click', function(e){
    // console.log(e.target.dataset.buy);
    e.target.dataset.buy && handleBuyClick(e.target.dataset.buy);
    e.target.dataset.remove && handleRemoveClick(e.target.dataset.remove);
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
    renderCart(cart);
}


function handleBuyClick(id){
    // console.log(id, typeof id);
    id = Number(id);
    // console.log(id, typeof id);
    let item = menuArray.filter(item => item.id === id);
    let uniqItem = {name: item[0].name, price: item[0].price};
    uniqItem.uuid = uuidv4();
    // console.log(uniqItem.uuid);
    cart.push(uniqItem);
    // console.log(cart);
    // renderCart(cart);
    renderMenu()
}

function handleRemoveClick(uuid){
    // console.log(`Item to remove is ${uuid}`);
    // console.log("Items to remain are:");
    cart = cart.filter(item => item.uuid !== uuid);
    // renderCart(cart);
    renderMenu();
}

function renderCart(cart){
    // console.log('render cart');
    cartEl.innerHTML = `<h2>Your order</h2>`;
    cart.forEach(item => {
        cartEl.innerHTML += `
        <section>
        <h3>${item.name}</h3>
        <button data-remove="${item.uuid}">remove</button>
        <h4>$${item.price}</h4>
        <section>
        `;
    });
    
    if(cart.length === 0){
        cartEl.style.display = 'none';
    } else if(cart.length !== 0){
        cartEl.style.display = 'flex';
    }
}

renderMenu();