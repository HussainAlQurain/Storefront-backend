"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = require("../../models/product");
const store = new product_1.ProductStore();
describe('Product Model Suite', () => {
    it('Expects store.createProduct(p) to create a new product', async () => {
        const result = await store.createProduct({ name: 'LiS', price: 20 });
        expect(result.name).toEqual('LiS');
    });
    it('Expects store.indexProducts to return products', async () => {
        const result = await store.indexProducts();
        expect(result.length).toBe(1);
    });
    it('Expects store.editProduct to update product', async () => {
        const products = await store.indexProducts();
        const productId = products[0].id;
        const result = await store.editProduct({
            id: productId,
            name: "Life is Strange",
            price: 30,
        });
        expect(result.price).toEqual(30);
    });
    it('Expects store.showProduct to return product', async () => {
        const products = await store.indexProducts();
        const productId = products[0].id;
        const result = await store.showProduct(productId ? productId : 1);
        expect(result.name).toEqual('Life is Strange');
    });
    it('Expects store.deleteProduct to delete the product', async () => {
        let products = await store.indexProducts();
        const productId = products[0].id;
        const result = await store.deleteProduct(productId ? productId : 1);
        products = await store.indexProducts();
        expect(products.length).toEqual(0);
    });
});
