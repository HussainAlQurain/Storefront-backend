"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
const initializeDb_1 = __importDefault(require("../helpers/initializeDb"));
const resetDb_1 = __importDefault(require("../helpers/resetDb"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const request = (0, supertest_1.default)(server_1.default);
const token = jsonwebtoken_1.default.sign({ user: 'test' }, process.env.TOKEN_SECRET);
describe('Order Routes Suite', () => {
    beforeAll(async () => {
        (0, initializeDb_1.default)();
        await request.post('/api/users/create').send({
            first_name: 'user1',
            last_name: 'user2',
            username: 'testUser',
            password: 'asd123'
        });
    });
    afterAll(() => {
        (0, resetDb_1.default)();
    });
    it('api/orders/create should return a newly created order', async () => {
        const test = {
            status: 'active',
            user_id: 1
        };
        const response = await request.post('/api/orders/create').set('Authorization', `Bearer ${token}`).send(test);
        expect(response.status).toBe(201);
        expect(response.body).toEqual({ id: 1, status: 'active', user_id: '1' });
    });
    it('api/orders should return all orders', async () => {
        const response = await request.get('/api/orders/user_id/1').set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
    });
    it('api/orders/:id should return the order', async () => {
        const response = await request.get('/api/orders/1').set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
    });
    it('api/orders/:id should edit the orders', async () => {
        const test = {
            status: 'complete',
            user_id: 1,
        };
        const response = await request.put('/api/orders/1').set('Authorization', `Bearer ${token}`).send(test);
        expect(response.status).toBe(201);
    });
    it('api/orders/:id should delete the order', async () => {
        const response = await request.delete('/api/orders/1').set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
    });
});
