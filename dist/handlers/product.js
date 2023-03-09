"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductHandler = void 0;
const product_1 = require("../models/product");
const store = new product_1.ProductStore();
class ProductHandler {
    async index(req, res) {
        try {
            const product = await store.indexProducts();
            res.json(product);
        }
        catch (err) {
            res.status(400).json(err);
        }
    }
    async show(req, res) {
        try {
            const product = await store.showProduct(parseInt(req.params.id));
            if (product) {
                res.json(product);
            }
            else {
                res.status(404).json('product not found');
            }
        }
        catch (err) {
            res.json(err);
        }
    }
    async create(req, res) {
        try {
            const product = await store.createProduct(req.body);
            res.json(product);
        }
        catch (err) {
            res.json(err);
        }
    }
    async update(req, res) {
        try {
            const product = await store.editProduct({ id: parseInt(req.params.id), name: req.body.status, price: parseInt(req.body.user_id) });
            res.json(product);
        }
        catch (err) {
            res.json(err);
        }
    }
    async destroy(req, res) {
        try {
            const product = await store.deleteProduct(parseInt(req.params.id));
        }
        catch (err) {
            res.json(err);
        }
    }
}
exports.ProductHandler = ProductHandler;
