"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../../models/user");
const store = new user_1.UserStore();
describe('User Model Suite', () => {
    it('Expects store.createUser(u) to create a new user', async () => {
        const result = await store.createUser({ first_name: 'hussain', last_name: 'qurain', username: 'rayleigh50', password_digest: 'test123' });
        expect(result.username).toEqual('rayleigh50');
    });
});
