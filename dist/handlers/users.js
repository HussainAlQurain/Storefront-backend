"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserHandler = void 0;
const user_1 = require("../models/user");
const store = new user_1.UserStore();
class UserHandler {
    async index(_req, res) {
        try {
            const users = await store.indexUsers();
            res.json(users);
        }
        catch (err) {
            res.status(400).json(err);
        }
    }
    async show(req, res) {
        try {
            const user = await store.showUser(parseInt(req.params.id));
            if (user) {
                res.json(user);
            }
            else {
                res.status(404).json('User not found');
            }
        }
        catch (err) {
            res.json(err);
        }
    }
    async create(req, res) {
        try {
            const user = await store.createUser(req.body);
            res.json(user);
        }
        catch (err) {
            res.json(err);
        }
    }
    async update(req, res) {
        try {
            const user = await store.editUser({ id: parseInt(req.params.id), first_name: req.body.first_name, last_name: req.body.last_name, username: req.body.username, password_digest: req.body.password });
            res.json(user);
        }
        catch (err) {
            res.json(err);
        }
    }
    async destroy(req, res) {
        try {
            const user = await store.deleteUser(parseInt(req.params.id));
        }
        catch (err) {
            res.json(err);
        }
    }
    async authenticate(req, res) {
        try {
            const user = await store.authenticate(req.body.username, req.body.password);
        }
        catch (err) {
            res.json(err);
        }
    }
}
exports.UserHandler = UserHandler;
