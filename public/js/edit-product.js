import { productService } from './services/product-service.js';
import { userService } from './services/user-service.js';

const userIsActive = await userService.userIsActive();

if (userIsActive) {
    const url = new URL(window.location);
    const id = url.searchParams.get('id');

    if (id) {
        const button = document.querySelector('.header__logout-button');
        button.addEventListener('click', userService.logout);
        
        let priceInput = document.getElementById('product-price');
        const nameInput = document.getElementById('product-name');
        const descriptionInput = document.getElementById('product-description');
        const dropZone = document.querySelector('.form__drop');
        
        const args = {
            allowNegative: false,
            negativeSignAfter: false,
            prefix: 'R$ ',
            suffix: '',
            fixed: true,
            fractionDigits: 2,
            decimalSeparator: ',',
            thousandsSeparator: '.',
            cursor: 'move'
        };
        
        priceInput = SimpleMaskMoney.setMask(priceInput, args)
        
        // Carregando produto

        const product = await productService.getProduct(id);
        const formatedPrice = product.price.toFixed(2).toString().replace('.', ',');
        dropZone.style.backgroundImage = `url(${product.image})`;
        nameInput.value = product.name;
        priceInput.value = `R$ ${formatedPrice}`;
        descriptionInput.value = product.description;
    
        const form = document.querySelector('.add-product__form');
        
        form.addEventListener('submit', async (event) => {
            event.preventDefault();

            let image =  dropZone.style.backgroundImage.slice(4, -1).replace(/"/g, "");
            
            if (!image) {
                image = 'assets/default-image.png'
            }
            
            const newProduct = {
                id: id,
                name: nameInput.value,
                price: priceInput.formatToNumber(),
                description: descriptionInput.value,
                image: image
            }
            
            await productService.editProduct(newProduct);
            window.location.href = 'admin';
        });

    } else {
        window.location.href = '../';
    }

} else {
    window.location.href = 'login';
}