"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductStore = void 0;
// @ts-ignore
const database_1 = __importDefault(require("../database"));
class ProductStore {
    async indexProducts() {
        try {
            // @ts-ignore
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM products';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Could not get products: ${err}`);
        }
    }
    async showProduct(id) {
        try {
            // @ts-ignore
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM products where id=($1)';
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not get the specified product: ${err}`);
        }
    }
    async createProduct(p) {
        try {
            // @ts-ignore
            const conn = await database_1.default.connect();
            const sql = 'INSERT INTO products (name, price) VALUES ($1, $2) RETURNING *';
            const result = await conn.query(sql, [p.name, p.price]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not create product ${p}: ${err}`);
        }
    }
    async editProduct(p) {
        try {
            // @ts-ignore
            const conn = await database_1.default.connect();
            const sql = 'UPDATE products SET name = ($2), price = ($3) WHERE id = ($1) RETURNING *';
            const result = await conn.query(sql, [p.id, p.name, p.price]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not update product ${p}: ${err}`);
        }
    }
    async deleteProduct(id) {
        try {
            // @ts-ignore
            const conn = await database_1.default.connect();
            const sql = 'DELETE FROM products WHERE id=($1)';
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not delete product: ${err}`);
        }
    }
}
exports.ProductStore = ProductStore;
