async function getProducts(category, limit) {
    let url = 'http://localhost:3000/products'

    if (category && limit) {
        url += `/${category}/${limit}`
    } else if (category) {
        url += `/${category}`
    } else if (limit) {
        url += `?_limit=${limit}`
    }

    const response = await fetch(url)
    return response.json();
}

async function getProduct(id) {
    const response = await fetch(`http://localhost:3000/products/${id}`);
    return response.json();
}

function addProduct(product) {
    return fetch('http://localhost:3000/products/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
    })
}

export const productService = {
    getProducts,
    getProduct,
    addProduct
}