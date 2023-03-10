import { OrderStore } from "../../models/order";
import { ProductStore } from "../../models/product";
import { UserStore } from "../../models/user";
import createTestDb from "../helpers/initializeDb";
import resetDb from "../helpers/resetDb";

const store = new OrderStore();
const userStore = new UserStore();
const productStore = new ProductStore();

let id = 1;
describe('Order Model Suite', () => {
    beforeAll(async () => {
        createTestDb();
        const result = await userStore.createUser({first_name: 'test1', last_name: 'test2', username: 'test3', password_digest: 'test4'});
        id = result.id ? result.id : 1;
    })
    afterAll(async () => {
        const result = await userStore.deleteUser(id);
        resetDb();
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
    it('Expects store.addProductToOrder to create new row in order_products table', async () => {
        resetDb();
        createTestDb();

        const testUser = await userStore.createUser({first_name: 'test1', last_name: 'test2', username: 'test3', password_digest: 'test4'});
        const testOrder = await store.createOrder({status: 'active', user_id: 1});
        const testProduct = await productStore.createProduct({name: 'Life is Strange 2', price: 25});
        const testProduct2 = await productStore.createProduct({name: 'Life is Strange', price: 20});

        const oId: string = testOrder.id?.toString() ?? '1';
        const pId: string = testProduct.id?.toString() ?? '1';
        const pId2: string = testProduct2.id?.toString() ?? '2';
        
        const result = await store.addProductToOrder(5, oId, pId);
        const result2 = await store.addProductToOrder(5, oId, pId2);

        expect(result).toBeDefined();
        expect(result[0]).toEqual({ id: 1, quantity: 5, order_id: '1', product_id: '1'});
        expect(result2.length).toEqual(2);
        resetDb();
        createTestDb();
    })
})