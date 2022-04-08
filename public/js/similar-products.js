import { productService } from "./services/product-service.js";

function getProductKeywords(product) {
    // Retorna um array com palavras relacionadas ao produto

    const keywords = [];

    for (let attribute of Object.keys(product)) {
        const value = product[attribute];
        if (typeof value === "string") {
            keywords.push(...product[attribute].split(' '));
        }
    }

    return keywords;
}

export async function getSimilarProducts(product) {
    // Retorna os produtos mais relevantes de acordo com as palavras-chave

    let products = await productService.getProducts()
    products = products.filter(item => item.id !== product.id);

    const keywords = getProductKeywords(product);

    const relevance = {};

    for (let item of products) {
        const kw = getProductKeywords(item);
        const id = item.id;

        for (let word of kw) {
            if (keywords.includes(word)) {
                if (Object.keys(relevance).includes(id.toString())) {
                    relevance[id]++;
                } else {
                    relevance[id] = 1;
                }
            }
        }
    }

    const similarProductsIds = Object.entries(relevance)
        .sort(([,a],[,b]) => b - a)
        .reduce((list, [id,]) => [...list, id], [])
        .slice(0, 6);

    const similarProducts = products.filter(item => {
        return similarProductsIds.includes(item.id.toString());
    });

    return similarProducts;
}