"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductHandler = void 0;
const product_1 = require("../models/product");
const store = new product_1.ProductStore();
class ProductHandler {
    async index(req, res) {
        try {
            const product = await store.indexProducts();
            res.status(200).json(product);
        }
        catch (err) {
            res.status(500).json(err);
        }
    }
    async show(req, res) {
        try {
            const product = await store.showProduct(parseInt(req.params.id));
            if (product) {
                res.status(200).json(product);
            }
            else {
                res.status(404).json('product not found');
            }
        }
        catch (err) {
            res.status(500).json(err);
        }
    }
    async create(req, res) {
        try {
            const product = await store.createProduct(req.body);
            res.status(201).json(product);
        }
        catch (err) {
            res.status(500).json(err);
        }
    }
    async update(req, res) {
        try {
            const product = await store.editProduct({ id: parseInt(req.params.id), name: req.body.status, price: parseInt(req.body.user_id) });
            res.status(201).json(product);
        }
        catch (err) {
            res.status(500).json(err);
        }
    }
    async destroy(req, res) {
        try {
            const product = await store.deleteProduct(parseInt(req.params.id));
            res.status(200).json({ status: `Deleted ${product}` });
        }
        catch (err) {
            res.status(500).json(err);
        }
    }
}
exports.ProductHandler = ProductHandler;
