"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const order_1 = require("../handlers/order");
const authorization_1 = __importDefault(require("../middleware/authorization"));
const OrderRouter = (0, express_1.Router)();
const Handler = new order_1.OrderHandler();
OrderRouter.use(authorization_1.default);
OrderRouter.get('/user_id/:user_id', Handler.index);
OrderRouter.get('/:id', Handler.show);
OrderRouter.post('/create', Handler.create);
OrderRouter.put('/:id', Handler.update);
OrderRouter.delete('/:id', Handler.destroy);
OrderRouter.post('/:id/products', Handler.addProductToOrder);
exports.default = OrderRouter;
