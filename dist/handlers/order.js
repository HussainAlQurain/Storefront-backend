"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderHandler = void 0;
const order_1 = require("../models/order");
const store = new order_1.OrderStore();
class OrderHandler {
    async index(req, res) {
        try {
            const order = await store.indexOrders(parseInt(req.params.user_id));
            res.status(200).json(order);
        }
        catch (err) {
            res.status(500).json(err);
        }
    }
    async show(req, res) {
        try {
            const order = await store.showOrder(parseInt(req.params.id));
            if (order) {
                res.status(200).json(order);
            }
            else {
                res.status(404).json('order not found');
            }
        }
        catch (err) {
            res.status(500).json(err);
        }
    }
    async create(req, res) {
        try {
            const order = await store.createOrder(req.body);
            res.status(201).json(order);
        }
        catch (err) {
            res.status(500).json(err);
        }
    }
    async update(req, res) {
        try {
            const order = await store.editOrder({ id: parseInt(req.params.id), status: req.body.status, user_id: parseInt(req.body.user_id) });
            res.status(201).json(order);
        }
        catch (err) {
            res.status(500).json(err);
        }
    }
    async destroy(req, res) {
        try {
            const order = await store.deleteOrder(parseInt(req.params.id));
            res.status(200).json({ status: `Deleted ${order}` });
        }
        catch (err) {
            res.status(500).json(err);
        }
    }
}
exports.OrderHandler = OrderHandler;
