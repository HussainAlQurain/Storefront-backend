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
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJ0ZXN0VXNlciIsImlhdCI6MTY3ODQ2MzgzOX0.EpXJIqbMgMwvumizAUekjOtGyP7WpP5Agc5ugSRn4c0';
describe('User Routes Suite', () => {
    beforeAll(() => {
        (0, initializeDb_1.default)();
    });
    afterAll(() => {
        (0, resetDb_1.default)();
    });
    it('/api/users/create should create a new user and return jwt token', async () => {
        const test = {
            first_name: 'user1',
            last_name: 'user2',
            username: 'testUser',
            password: 'asd123'
        };
        const response = await request.post('/api/users/create').send(test);
        delete response.body.password_digest;
        expect(response.status).toBe(201);
        //check for jwt token
        expect(response.body.split('.').length).toEqual(3);
    });
    it('/api/users/create should return error for not providing password', async () => {
        const test = {
            first_name: 'user1',
            last_name: 'user2',
            username: 'testUser',
        };
        const response = await request.post('/api/users/create').send(test);
        expect(response.status).toBe(400);
        expect(response.body).toEqual('Please Provide a username and password');
    });
    it('/api/users should return all users', async () => {
        const response = await request.get('/api/users').set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
    });
    it('/api/users/:id should return the user', async () => {
        const response = await request.get('/api/users/1').set('Authorization', `Bearer ${token}`);
        delete response.body.password_digest;
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ id: 1, first_name: 'user1', last_name: 'user2', username: 'testUser' });
    });
    it('/api/users/:id should edit the user', async () => {
        const test = {
            first_name: 'user1',
            last_name: 'user2',
            username: 'testUser',
            password: '123321'
        };
        const response = await request.put('/api/users/1').send(test).set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(201);
    });
    it('/api/users/:id should delete the user', async () => {
        const response = await request.delete('/api/users/1').set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
    });
});
