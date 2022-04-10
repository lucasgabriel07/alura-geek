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

function addProduct(product) {
    const token = localStorage.getItem('token');
    if (token) {
        return fetch('/api/products/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(product)
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
    search
}