import supertest from 'supertest'
import app from '../../server'
import createTestDb from '../helpers/initializeDb'
import resetDb from '../helpers/resetDb'

const request = supertest(app)

describe('User Routes Suite', () => {
    beforeAll(() => {
        createTestDb();
    })
    afterAll(() => {
        resetDb();
    })
    it('/api/users/create should create a new user with the same attributes', async () => {
        const test = {
            first_name: 'user1',
            last_name: 'user2',
            username: 'testUser',
            password: 'asd123'
        }
        const response = await request.post('/api/users/create').send(test);
        delete response.body.password_digest;
        expect(response.status).toBe(201);
        expect(response.body).toEqual({id: 1, first_name: 'user1', last_name: 'user2', username: 'testUser'});
    })
    it('/api/users/create should return error for not providing password', async () => {
        const test = {
            first_name: 'user1',
            last_name: 'user2',
            username: 'testUser',
        }
        const response = await request.post('/api/users/create').send(test);
        expect(response.status).toBe(400);
        expect(response.body).toEqual('Please Provide a username and password');
    })
    it('/api/users should return all users', async () => {
        const response = await request.get('/api/users');
        expect(response.status).toBe(200);
    })
    it('/api/users/:id should return the user', async () => {
        const response = await request.get('/api/users/1');
        expect(response.status).toBe(200);
    })
    it('/api/users/:id should edit the user', async () => {
        const test = {
            first_name: 'user1',
            last_name: 'user2',
            username: 'testUser',
            password: '123321'
        }
        const response = await request.put('/api/users/1').send(test);
        expect(response.status).toBe(201);
    })
    it('/api/users/:id should delete the user', async () => {
        const response = await request.delete('/api/users/1');
        expect(response.status).toBe(200);
    })
})