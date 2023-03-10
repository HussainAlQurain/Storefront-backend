"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_1 = require("../handlers/product");
const authorization_1 = __importDefault(require("../middleware/authorization"));
const ProductRouter = (0, express_1.Router)();
const Handler = new product_1.ProductHandler();
ProductRouter.get('/', Handler.index);
ProductRouter.get('/:id', Handler.show);
ProductRouter.post('/create', authorization_1.default, Handler.create);
ProductRouter.put('/:id', authorization_1.default, Handler.update);
ProductRouter.delete('/:id', authorization_1.default, Handler.destroy);
exports.default = ProductRouter;
