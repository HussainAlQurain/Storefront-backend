"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderStore = void 0;
// @ts-ignore
const database_1 = __importDefault(require("../database"));
class OrderStore {
    async indexOrders(userId) {
        try {
            // @ts-ignore
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM orders WHERE user_id=($1)';
            const result = await conn.query(sql, [userId]);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Could not get orders: ${err}`);
        }
    }
    async showOrder(userId) {
        try {
            // @ts-ignore
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM orders WHERE user_id=($1) ORDER BY id LIMIT 1';
            const result = await conn.query(sql, [userId]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not get the specified order: ${err}`);
        }
    }
    async createOrder(o) {
        try {
            // @ts-ignore
            const conn = await database_1.default.connect();
            const sql = 'INSERT INTO orders (status, user_id) VALUES ($1, $2) RETURNING *';
            const result = await conn.query(sql, [o.status, o.user_id]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not create order ${o}: ${err}`);
        }
    }
    async editOrder(o) {
        try {
            // @ts-ignore
            const conn = await database_1.default.connect();
            const sql = 'UPDATE orders SET status = ($2), user_id = ($3) WHERE id = ($1) RETURNING *';
            const result = await conn.query(sql, [o.id, o.status, o.user_id]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not update order ${o}: ${err}`);
        }
    }
    async deleteOrder(id) {
        try {
            // @ts-ignore
            const conn = await database_1.default.connect();
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
exports.OrderStore = OrderStore;
