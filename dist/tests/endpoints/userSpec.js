"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
const request = (0, supertest_1.default)(server_1.default);
describe('User Routes Suite', () => {
    it('api/users/create should return a newly created user', () => {
        const test = {
            first_name: 'user1',
            last_name: 'user2',
            username: 'testUser',
            password: 'asd123'
        };
        request.post('/api/users/create').send(test).expect(201).expect({ id: 1, first_name: 'user1', last_name: 'user2', username: 'testUser' });
    });
    it('api/users/create should return error for not providing password', () => {
        const test = {
            first_name: 'user1',
            last_name: 'user2',
            username: 'testUser',
        };
        request.post('/api/users/create').send(test).expect(400);
    });
    it('api/users should return all users', () => {
        request.get('api/users').expect(200);
    });
    it('api/users/:id should return the user', () => {
        request.get('api/users/1').expect(200);
    });
    it('api/users/:id should edit the user', () => {
        const test = {
            first_name: 'user1',
            last_name: 'user2',
            username: 'testUser',
            password: '123321'
        };
        request.put('/api/users/1').send(test).expect(200);
    });
    it('api/users/:id should delete the user', () => {
        request.delete('/api/users/1').expect(200);
    });
});
