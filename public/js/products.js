import { productService } from './services/product-service.js';

const url = new URL(window.location);
const category = url.searchParams.get('category');
const search = url.searchParams.get('search');

const container = document.querySelector('.products__list');
const title = document.querySelector('.products-page__title')

const addProducts = function(products) {
    products.forEach(product => {
        const formatedPrice = product.price.toFixed(2).toString().replace('.', ',');

        const item = document.createElement('li');        

        item.classList.add('list__item')
        item.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product__img">
            <h3 class="product__name">${product.name}</h3>
            <p class="product__value">R$ ${formatedPrice}</p>
            <a href="produto.html?id=${product.id}" class="product__link">Ver produto</a>
        `
        container.appendChild(item);
    });
}

if (category) {
    title.innerText = category;
    const products = await productService.getProducts(category);
    addProducts(products);
}

else if (search) {
    const products = await productService.search(search);
    if (products.length === 0) {
        title.innerText = 'Não foram encontrados produtos correspondentes'
    } else if (products.length === 1) {
        title.innerText = `1 resultado para "${search}"`;
        addProducts(products);
    } else {
        title.innerText = `${products.length} resultados para "${search}"`;
        addProducts(products);
    }
}

else {
    title.innerText = 'Todos os produtos';
    const products = await productService.getProducts();
    addProducts(products);
}