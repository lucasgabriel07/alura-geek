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

async function getRelatedProducts(id, limit) {
    const responseProduct = await fetch (`/api/products/${id}`);
    const product = await responseProduct.json();
    const category = product.category;
    const response = await fetch(
        `/api/products?category=${category}&_limit=${limit+1}`
    );
    const result = await response.json();

    // Removendo o próprio produto do resultado
    const relatedProducts = result.filter(product => product.id != id).slice(0, limit);
    
    return relatedProducts;
}

function addProduct(product) {
    return fetch('/api/products/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
    });
}

async function search(search) {
    const response = await fetch(`/api/products?q=${search}`)
    return response.json();
}

export const productService = {
    getProducts,
    getProduct,
    getRelatedProducts,
    addProduct,
    search
}