import supertest from 'supertest'
import app from '../../server'

const request = supertest(app)

describe('Order Routes Suite', () => {
    it('api/orders/create should return a newly created order', () => {
        const test = {
            status: 'active',
            user_id: 1

        }
        request.post('/api/orders/create').send(test).expect(201).expect({status: 'active', user_id: 1});
    })
    it('api/orders should return all orders', () => {
        request.get('api/orders').expect(200);
    })
    it('api/orders/:id should return the order', () => {
        request.get('api/orders/1').expect(200);
    })
    it('api/orders/:id should edit the orders', () => {
        const test = {
            status: 'complete',
            user_id: 1,
        }
        request.put('/api/orders/1').send(test).expect(200);
    })
    it('api/orders/:id should delete the order', () => {
        request.delete('/api/orders/1').expect(200);
    })
})