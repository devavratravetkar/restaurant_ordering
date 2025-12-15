import { menuArray } from "./data.js";

// console.log(menuArray);
const container = document.querySelector('article'); // our main content container

// container.innerHTML = '<h3>We will show our interactive menu here...';

menuArray.forEach((item) => {
    container.innerHTML += `
        <section id="${item.id}">
            <img src="./images/${item.image}" alt="${item.name} icon">
            <section>
                <h3>${item.name}</h3>
                <p>${item.ingredients.join(', ')}</p>
                <h4>$${item.price}</h4>
            </section>
            <button>+</button>
        </section>`
});