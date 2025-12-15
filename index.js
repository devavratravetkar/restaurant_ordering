import { menuArray } from "./data.js";
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

// console.log(menuArray);
const container = document.querySelector('article'); // our main content container
const cartEl = document.querySelector('aside');
const modal = document.querySelector('dialog');

const confirm = document.getElementById('confirmation');
const ourForm = document.getElementById('our-form');

ourForm.addEventListener('submit', function(e){
    e.preventDefault();

    const ourFormData = new FormData(ourForm);
    // console.log(ourFormData)
    const name = ourFormData.get('name');
    // console.log(name);

    //close modal
    modal.style.display = 'none';
    modal.close();
    this.reset();
    
    cart = []; // empty cart after payment done
    renderMenu(); //displays menu, sans cart - since cart emptied

    // console.log(`Thanks ${name}! Your order is on its way!`);
    confirm.innerHTML = `Thanks ${name}! Your order is on its way!`;
    confirm.style.display = 'flex';
});

// cartEl.innerHTML = 'TESTING';

let cart = [];
// container.innerHTML = '<h3>We will show our interactive menu here...';

document.addEventListener('click', function(e){
    // console.log(e.target.dataset.buy);
    e.target.dataset.buy && handleBuyClick(e.target.dataset.buy);
    e.target.dataset.remove && handleRemoveClick(e.target.dataset.remove);
    e.target.dataset.order && handleOrderClick(e.target.dataset.order);
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
    confirm.style.display = 'none'; //remove previous confirmation

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

function handleOrderClick(){
    console.log('show card payment details modal');

    modal.style.display = 'flex';
    modal.showModal();
}

function renderCart(cart){
    if(cart.length === 0){
        cartEl.style.display = 'none';
    } else if(cart.length !== 0){
        cartEl.style.display = 'flex';
    }
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

    cartEl.innerHTML += `
        <section id="total">
            <h3>Total Price:</h3>
            <h4>$${cart.reduce((acc, item) => acc + item.price, 0 )}</h4>
        </section>`;
    
    cartEl.innerHTML += "<button data-order='yes'>Complete order</button>"
}

renderMenu();