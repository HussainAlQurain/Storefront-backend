import supertest from 'supertest'
import app from '../../server'

const request = supertest(app)

describe('Product Routes Suite', () => {
    it('api/products/create should return a newly created product', () => {
        const test = {
            name: 'coffee',
            price: 5,

        }
        request.post('/api/products/create').send(test).expect(201).expect({id: 1, name: 'coffee', price: 5});
    })
    it('api/products should return all products', () => {
        request.get('api/products').expect(200);
    })
    it('api/products/:id should return the product', () => {
        request.get('api/products/1').expect(200);
    })
    it('api/products/:id should edit the products', () => {
        const test = {
            name: 'moccha',
            price: 6,
        }
        request.put('/api/products/1').send(test).expect(200);
    })
    it('api/products/:id should delete the product', () => {
        request.delete('/api/products/1').expect(200);
    })
})