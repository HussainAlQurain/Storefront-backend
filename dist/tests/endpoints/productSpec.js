"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
const initializeDb_1 = __importDefault(require("../helpers/initializeDb"));
const resetDb_1 = __importDefault(require("../helpers/resetDb"));
const request = (0, supertest_1.default)(server_1.default);
describe('Product Routes Suite', () => {
    beforeAll(() => {
        (0, initializeDb_1.default)();
    });
    afterAll(() => {
        (0, resetDb_1.default)();
    });
    it('/api/products/create should return a newly created product', async () => {
        const test = {
            name: 'coffee',
            price: 5,
        };
        const response = await request.post('/api/products/create').send(test);
        expect(response.status).toBe(201);
        expect(response.body).toEqual({ id: 1, name: 'coffee', price: 5 });
    });
    it('/api/products should return all products', async () => {
        const response = await request.get('/api/products');
        expect(response.status).toBe(200);
    });
    it('/api/products/:id should return the product', async () => {
        const response = await request.get('/api/products/1');
        expect(response.status).toBe(200);
    });
    it('/api/products/:id should edit the products', async () => {
        const test = {
            name: 'moccha',
            price: 6,
        };
        const response = await request.put('/api/products/1').send(test);
        expect(response.status).toBe(201);
    });
    it('/api/products/:id should delete the product', async () => {
        const response = await request.delete('/api/products/1');
        expect(response.status).toBe(200);
    });
});
