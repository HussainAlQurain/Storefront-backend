"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_1 = require("../handlers/users");
const authorization_1 = __importDefault(require("../middleware/authorization"));
const UserRouter = (0, express_1.Router)();
const Handler = new users_1.UserHandler();
UserRouter.get('/', authorization_1.default, Handler.index);
UserRouter.get('/:id', authorization_1.default, Handler.show);
UserRouter.post('/create', Handler.create);
UserRouter.post('/login', Handler.authenticate);
UserRouter.put('/:id', authorization_1.default, Handler.update);
UserRouter.delete('/:id', authorization_1.default, Handler.destroy);
exports.default = UserRouter;
