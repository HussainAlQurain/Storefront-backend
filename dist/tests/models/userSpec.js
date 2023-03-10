"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../../models/user");
const initializeDb_1 = __importDefault(require("../helpers/initializeDb"));
const resetDb_1 = __importDefault(require("../helpers/resetDb"));
const store = new user_1.UserStore();
describe('User Model Suite', () => {
    beforeAll(() => {
        (0, initializeDb_1.default)();
    });
    afterAll(() => {
        (0, resetDb_1.default)();
    });
    it('Expects store.createUser(u) to create a new user', async () => {
        const result = await store.createUser({ first_name: 'hussain', last_name: 'qurain', username: 'rayleigh50', password_digest: 'test123' });
        expect(result.username).toEqual('rayleigh50');
    });
    it('Expects store.indexUsers to return users', async () => {
        const result = await store.indexUsers();
        expect(result.length).toBeGreaterThanOrEqual(1);
    });
    it('Expects store.editUser to update user', async () => {
        const users = await store.indexUsers();
        const userId = users[0].id;
        const result = await store.editUser({
            id: userId,
            first_name: "ray",
            last_name: "qurain",
            username: "rayleigh50",
            password_digest: "test1233"
        });
        expect(result.first_name).toEqual('ray');
    });
    it('Expects store.showUser to return user', async () => {
        const users = await store.indexUsers();
        const userId = users[0].id;
        const result = await store.showUser(userId ? userId : 1);
        expect(result.first_name).toEqual('ray');
    });
    it('Expects store.authenticate to return user', async () => {
        const users = await store.indexUsers();
        const pass = users[0].password_digest;
        const result = await store.authenticate('rayleigh50', 'test1233');
        console.log(users[0]);
        expect(result?.password_digest).toEqual(pass);
    });
    it('Expects store.deleteUser to delete the user', async () => {
        let users = await store.indexUsers();
        const userId = users[0].id;
        const length_before = users.length;
        const result = await store.deleteUser(userId ? userId : 1);
        users = await store.indexUsers();
        expect(users.length).toEqual(length_before - 1);
    });
});
