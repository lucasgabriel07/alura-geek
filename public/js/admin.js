import { productService } from './services/product-service.js'
import { userService } from './services/user-service.js'

const userIsActive = await userService.userIsActive();

if (userIsActive) {
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
                <span class="product__button product__button--delete" data-id="${product.id}"></span>
                <span class="product__button product__button--edit" data-id="${product.id}"></span>
            </div>
            <h3 class="product__name">${product.name}</h3>
            <p class="product__value">R$ ${formatedPrice}</p>
            <p class="product__id">#${product.id}</p>
        `
        container.appendChild(item);
    });

    const deleteButtons = document.querySelectorAll('.product__button--delete');
    const editButtons = document.querySelectorAll('.product__button--edit');

    deleteButtons.forEach(button => {
        button.addEventListener('click', async () => {
            const id = button.dataset.id;
            const confirm = window.confirm('Essa ação excluirá permanentemente o produto. Deseja continuar?');
            if (confirm) {
                await productService.deleteProduct(id);
                window.location.reload();
            }
        });
    });

} else {
    window.location.href = 'login';
}