"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
const request = (0, supertest_1.default)(server_1.default);
describe('Product Routes Suite', () => {
    it('api/products/create should return a newly created product', () => {
        const test = {
            name: 'coffee',
            price: 5,
        };
        request.post('/api/products/create').send(test).expect(201).expect({ id: 1, name: 'coffee', price: 5 });
    });
    it('api/products should return all products', () => {
        request.get('api/products').expect(200);
    });
    it('api/products/:id should return the product', () => {
        request.get('api/products/1').expect(200);
    });
    it('api/products/:id should edit the products', () => {
        const test = {
            name: 'moccha',
            price: 6,
        };
        request.put('/api/products/1').send(test).expect(200);
    });
    it('api/products/:id should delete the product', () => {
        request.delete('/api/products/1').expect(200);
    });
});