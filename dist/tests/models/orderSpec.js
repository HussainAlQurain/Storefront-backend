"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = require("../../models/order");
const user_1 = require("../../models/user");
const store = new order_1.OrderStore();
const userStore = new user_1.UserStore();
let id = 1;
describe('Order Model Suite', () => {
    beforeAll(async () => {
        const result = await userStore.createUser({ first_name: 'test1', last_name: 'test2', username: 'test3', password_digest: 'test4' });
        id = result.id ? result.id : 1;
    });
    afterAll(async () => {
        const result = await userStore.deleteUser(id);
    });
    it('Expects store.createOrder(o) to create a new Order', async () => {
        const result = await store.createOrder({ status: 'pending', user_id: id });
        expect(result.status).toEqual('pending');
    });
    it('Expects store.indexOrders to return orders', async () => {
        const result = await store.indexOrders();
        expect(result.length).toBe(1);
    });
    it('Expects store.editOrder to update order', async () => {
        const orders = await store.indexOrders();
        const orderId = orders[0].id;
        const result = await store.editOrder({
            id: orderId,
            status: "shipped",
            user_id: id,
        });
        expect(result.status).toEqual('shipped');
    });
    it('Expects store.showOrder to return order', async () => {
        const orders = await store.indexOrders();
        const orderId = orders[0].id;
        const result = await store.showOrder(orderId ? orderId : 1);
        expect(Number(result.user_id)).toEqual(id);
    });
    it('Expects store.deleteOrder to delete the order', async () => {
        let orders = await store.indexOrders();
        const orderId = orders[0].id;
        const result = await store.deleteOrder(orderId ? orderId : 1);
        orders = await store.indexOrders();
        expect(orders.length).toEqual(0);
    });
});
