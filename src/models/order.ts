// @ts-ignore
import client from "../database";

export type Order = {
    id?: number;
    status: string;
    user_id: number;
}

export class OrderStore {
    async indexOrders(userId: number): Promise<Order[]> {
        try {
            // @ts-ignore
            const conn = await client.connect();
            const sql = 'SELECT * FROM orders WHERE user_id=($1)';
            const result = await conn.query(sql, [userId]);
            conn.release();
            return result.rows;
        }
        catch (err){
            throw new Error(`Could not get orders: ${err}`);
        }
    }
    async showOrder(userId: number): Promise<Order> {
        try {
            // @ts-ignore
            const conn = await client.connect();
            const sql = 'SELECT * FROM orders WHERE user_id=($1) ORDER BY id LIMIT 1';
            const result = await conn.query(sql, [userId]);
            conn.release();
            return result.rows[0];

        }
        catch (err){
            throw new Error(`Could not get the specified order: ${err}`);
        }
    }
    async createOrder(o: Order): Promise<Order> {
        try {
            // @ts-ignore
            const conn = await client.connect();
            const sql = 'INSERT INTO orders (status, user_id) VALUES ($1, $2) RETURNING *';
            const result = await conn.query(sql, [o.status, o.user_id]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not create order ${o}: ${err}`);
        }
    }
    async editOrder(o: Order): Promise<Order> {
        try {
            // @ts-ignore
            const conn = await client.connect();
            const sql = 'UPDATE orders SET status = ($2), user_id = ($3) WHERE id = ($1) RETURNING *';
            const result = await conn.query(sql, [o.id, o.status, o.user_id]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not update order ${o}: ${err}`);
        }
    }
    async deleteOrder(id: number): Promise<Order> {
        try{
            // @ts-ignore
            const conn = await client.connect();
            const sql = 'DELETE FROM orders WHERE id=($1)';
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not delete order: ${err}`);
        }
    }
}