import { OrderStore } from "../../models/order";
import { UserStore } from "../../models/user";

const store = new OrderStore();
const userStore = new UserStore();
let id = 1;
describe('Order Model Suite', () => {
    beforeAll(async () => {
        const result = await userStore.createUser({first_name: 'test1', last_name: 'test2', username: 'test3', password_digest: 'test4'});
        id = result.id ? result.id : 1;
    })
    afterAll(async () => {
        const result = await userStore.deleteUser(id);
    })
    it('Expects store.createOrder(o) to create a new Order', async () => {
        const result = await store.createOrder({status: 'active', user_id: id});
        expect(result.status).toEqual('active');
    })
    it('Expects store.indexOrders to return orders', async () => {
        const result = await store.indexOrders(id);
        expect(result.length).toBe(1);
    })
    it('Expects store.editOrder to update order', async () => {
        const orders = await store.indexOrders(id);
        const orderId = orders[0].id;
        const result = await store.editOrder({
            id: orderId,
            status: "complete",
            user_id: id,
        });
        expect(result.status).toEqual('complete');
    })
    it('Expects store.showOrder to return order', async () => {
        const orders = await store.indexOrders(id);
        const orderUserId = orders[0].user_id;
        const result = await store.showOrder(orderUserId ? orderUserId : 1);
        expect(Number(result.user_id)).toEqual(id);
    })
    it('Expects store.deleteOrder to delete the order', async () => {
        let orders = await store.indexOrders(id);
        const orderId = orders[0].id;
        const result = await store.deleteOrder(orderId ? orderId : 1);
        orders = await store.indexOrders(id);
        expect(orders.length).toEqual(0);
        
    })
})