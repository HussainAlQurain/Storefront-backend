import { OrderStore } from "../../models/order";

const store = new OrderStore();

describe('Order Model Suite', () => {
    it('Expects store.createOrder(o) to create a new Order', async () => {
        const result = await store.createOrder({status: 'pending', user_id: 1});
        expect(result.status).toEqual('pending');
    })
    it('Expects store.indexOrders to return orders', async () => {
        const result = await store.indexOrders();
        expect(result.length).toBe(1);
    })
    it('Expects store.editOrder to update order', async () => {
        const orders = await store.indexOrders();
        const orderId = orders[0].id;
        const result = await store.editOrder({
            id: orderId,
            status: "shipped",
            user_id: 1,
        });
        expect(result.status).toEqual('shipped');
    })
    it('Expects store.showOrder to return order', async () => {
        const orders = await store.indexOrders();
        const orderId = orders[0].id;
        const result = await store.showOrder(orderId ? orderId : 1);
        expect(result.user_id).toEqual(1);
    })
    it('Expects store.deleteOrder to delete the order', async () => {
        let orders = await store.indexOrders();
        const orderId = orders[0].id;
        const result = await store.deleteOrder(orderId ? orderId : 1);
        orders = await store.indexOrders();
        expect(orders.length).toEqual(0);
        
    })
})