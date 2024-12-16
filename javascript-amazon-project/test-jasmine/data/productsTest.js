import { Product, Appliance, Clothing } from "../../data/products.js"
const product = {
    id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    image: "images/products/athletic-cotton-socks-6-pairs.jpg",
    name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
    rating: {
      stars: 4.5,
      count: 87
    },
    priceCents: 1090,
    keywords: [
      "socks",
      "sports",
      "apparel"
    ],
    type: 'clothing'
}

describe('Test suite: Product class', () => {
    it('Creates a product using class', () => {
        const product1 = new Product(product);
        expect(product1.id).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
        expect(product1.name).toEqual("Black and Gray Athletic Cotton Socks - 6 Pairs");
        expect(product1.priceCents).toEqual(1090);
        expect(product1.extraInfoHtml()).toEqual('');
    })
})

