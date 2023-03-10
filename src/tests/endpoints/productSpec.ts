import supertest from 'supertest'
import app from '../../server'
import createTestDb from '../helpers/initializeDb';
import resetDb from '../helpers/resetDb';
const request = supertest(app)
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJ0ZXN0VXNlciIsImlhdCI6MTY3ODQ2MzgzOX0.EpXJIqbMgMwvumizAUekjOtGyP7WpP5Agc5ugSRn4c0'
describe('Product Routes Suite', () => {
    beforeAll(() => {
        createTestDb();
    })

    afterAll(() => {
        resetDb();
    })
    it('/api/products/create should return a newly created product', async () => {
        const test = {
            name: 'coffee',
            price: 5,
        }
        const response = await request.post('/api/products/create').set('Authorization', `Bearer ${token}`).send(test);
        expect(response.status).toBe(201);
        expect(response.body).toEqual({id: 1, name: 'coffee', price: 5});
    })
    it('/api/products should return all products', async () => {
        const response = await request.get('/api/products');
        expect(response.status).toBe(200);
    })
    it('/api/products/:id should return the product', async () => {
        const response = await request.get('/api/products/1');
        expect(response.status).toBe(200);
    })
    it('/api/products/:id should edit the products', async () => {
        const test = {
            name: 'moccha',
            price: 6,
        }
        const response = await request.put('/api/products/1').set('Authorization', `Bearer ${token}`).send(test);
        expect(response.status).toBe(201);
    })
    it('/api/products/:id should delete the product', async () => {
        const response = await request.delete('/api/products/1').set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
    })
})