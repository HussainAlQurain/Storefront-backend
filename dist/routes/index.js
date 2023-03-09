"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("./user"));
const order_1 = __importDefault(require("./order"));
const product_1 = __importDefault(require("./product"));
const routes = express_1.default.Router();
routes.get('/', (req, res) => {
    res.status(200).send('Welcome to my Store');
});
routes.use('/users', user_1.default);
routes.use('/products', product_1.default);
routes.use('/orders', order_1.default);
exports.default = routes;
