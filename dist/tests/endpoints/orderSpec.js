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
describe('Order Routes Suite', () => {
    beforeAll(() => {
        (0, initializeDb_1.default)();
    });
    afterAll(() => {
        (0, resetDb_1.default)();
    });
    it('api/orders/create should return a newly created order', () => {
        const test = {
            status: 'active',
            user_id: 1
        };
        request.post('/api/orders/create').send(test).expect(201).expect({ status: 'active', user_id: 1 });
    });
    it('api/orders should return all orders', () => {
        request.get('api/orders').expect(200);
    });
    it('api/orders/:id should return the order', () => {
        request.get('api/orders/1').expect(200);
    });
    it('api/orders/:id should edit the orders', () => {
        const test = {
            status: 'complete',
            user_id: 1,
        };
        request.put('/api/orders/1').send(test).expect(200);
    });
    it('api/orders/:id should delete the order', () => {
        request.delete('/api/orders/1').expect(200);
    });
});
