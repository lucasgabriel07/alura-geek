import { productService } from './services/product-service.js';
import { getSimilarProducts } from './similar-products.js'; 

const url = new URL(window.location);
const id = url.searchParams.get('id');

const product = await productService.getProduct(id);
const formatedPrice = product.price.toFixed(2).toString().replace('.', ',');

const container = document.querySelector('.product-description');

container.innerHTML = `
    <img src="${product.image}" alt="${product.name}" class="product-description__img">
    <article class="description">
        <h1 class="description__title">${product.name}</h1>
        <p class="description__value">R$ ${formatedPrice}</p>
        <p class="description__text">${product.description}</p>
    </article>
`

// Produtos similares

const similarProductsContainer = document.querySelector('.products__list');
const similarProducts = await getSimilarProducts(product);

similarProducts.forEach(product => {
    const formatedPrice = product.price.toFixed(2).toString().replace('.', ',');

    const item = document.createElement('li');
    item.classList.add('product');
    item.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="product__img">
        <h3 class="product__name">${product.name}</h3>
        <p class="product__value">R$ ${formatedPrice}</p>
        <a href="?id=${product.id}" class="product__link">Ver produto</a>
    `
    similarProductsContainer.appendChild(item);
});