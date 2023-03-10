import supertest from 'supertest'
import app from '../../server'
import createTestDb from '../helpers/initializeDb';
import resetDb from '../helpers/resetDb';
const request = supertest(app)

describe('Product Routes Suite', () => {
    beforeAll(() => {
        createTestDb();
    })

    afterAll(() => {
        resetDb();
    })
    it('api/products/create should return a newly created product', async () => {
        const test = {
            name: 'coffee',
            price: 5,
        }
        const response = await request.post('/api/products/create').send(test);
        expect(response.status).toBe(201);
        expect(response.body).toEqual({id: 1, name: 'coffee', price: 5});
    })
    it('api/products should return all products', async () => {
        const response = await request.get('api/products');
        expect(response.status).toBe(200);
    })
    it('api/products/:id should return the product', async () => {
        const response = await request.get('api/products/1');
        expect(response.status).toBe(200);
    })
    it('api/products/:id should edit the products', async () => {
        const test = {
            name: 'moccha',
            price: 6,
        }
        const response = await request.put('/api/products/1').send(test);
        expect(response.status).toBe(201);
    })
    it('api/products/:id should delete the product', async () => {
        const response = await request.delete('/api/products/1');
        expect(response.status).toBe(200);
    })
})