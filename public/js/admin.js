import { productService } from './services/product-service.js'
import { userService } from './services/user-service.js'

const userIsActive = await userService.userIsActive();

if (!userIsActive) {
    window.location.href = 'login';
}

const button = document.querySelector('.header__logout-button');
button.addEventListener('click', userService.logout);

const container = document.querySelector('.products__list');

const products = await productService.getProducts();

products.forEach(product => {
    const formatedPrice = product.price.toFixed(2).toString().replace('.', ',');

    const item = document.createElement('li');        

    item.classList.add('list__item')
    item.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="product__img">
        <div class="product__buttons">
            <span class="product__button" id="delete-button"></span>
            <span class="product__button" id="edit-button"></span>
        </div>
        <h3 class="product__name">${product.name}</h3>
        <p class="product__value">R$ ${formatedPrice}</p>
        <p class="product__id">#${product.id}</p>
    `
    container.appendChild(item);
});