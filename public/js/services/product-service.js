async function getProducts(category, limit) {
    let url = '/api/products';

    if (category && limit) {
        url += `/?category=${category}&_limit=${limit}`;
    } else if (category) {
        url += `/?category=${category}`;
    } else if (limit) {
        url += `/?_limit=${limit}`;
    }

    const response = await fetch(url)
    return response.json();
}

async function getProduct(id) {
    const response = await fetch(`/api/products/${id}`);
    return response.json();
}

async function addProduct(product) {
    const token = localStorage.getItem('token');
    if (token) {
        const res = await fetch('/api/products/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(product)
        });

        const createdProduct = await res.json();
        const file = createdProduct.image;
        const id = createdProduct.id;

        // Salvando imagem no server
        
        const response = await fetch('/products/upload-file', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    file: file,
                    productId: id
                })
            }
        );
        
        // Atualizando url da imagem
        
        const newPath = await response.text();
        
        await fetch(`/products/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                image: newPath
            })
        });
    }       
}

function deleteProduct(id) {
    const token = localStorage.getItem('token');
    if (token) {
        return fetch(`/api/products/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    }
}

async function search(search) {
    const response = await fetch(`/api/products?q=${search}`)
    return response.json();
}

export const productService = {
    getProducts,
    getProduct,
    addProduct,
    deleteProduct,
    search
}