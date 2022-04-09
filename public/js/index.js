import { productService } from "./services/product-service.js";

const categorys = ['star+wars', 'consoles', 'diversos'];

for (let category of categorys) {
    const section = document.getElementById(category);
    const container = section.querySelector('.products__list');
    
    const numberOfProducts = 6;
    const products = await productService.getProducts(category, numberOfProducts);

    products.forEach(product => {
        const formatedPrice = product.price.toFixed(2).toString().replace('.', ',');

        const item = document.createElement('li');        

        item.classList.add('product')
        item.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product__img">
            <h3 class="product__name">${product.name}</h3>
            <p class="product__value">R$ ${formatedPrice}</p>
            <a href="produto?id=${product.id}" class="product__link">Ver produto</a>
        `

        container.appendChild(item);
    });
}