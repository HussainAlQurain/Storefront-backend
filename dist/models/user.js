"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserStore = void 0;
// @ts-ignore
const database_1 = __importDefault(require("../database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
class UserStore {
    async indexUsers() {
        try {
            // @ts-ignore
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM users';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Could not get users: ${err}`);
        }
    }
    async showUser(id) {
        try {
            // @ts-ignore
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM users where id=($1)';
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not get the specified user: ${err}`);
        }
    }
    async createUser(u) {
        try {
            const pepper = process.env.BCRYPT_PASSWORD;
            const saltRounds = process.env.SALT_ROUNDS;
            // @ts-ignore
            const conn = await database_1.default.connect();
            const sql = 'INSERT INTO users (first_name, last_name, username, password_digest) VALUES ($1, $2, $3, $4) RETURNING *';
            const hash = bcrypt_1.default.hashSync(u.password_digest + pepper, parseInt(saltRounds));
            const result = await conn.query(sql, [u.first_name, u.last_name, u.username, hash]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not create user ${u}: ${err}`);
        }
    }
    async editUser(u) {
        try {
            const pepper = process.env.BCRYPT_PASSWORD;
            const saltRounds = process.env.SALT_ROUNDS;
            // @ts-ignore
            const conn = await database_1.default.connect();
            const sql = 'UPDATE users SET first_name = ($2), last_name = ($3), username = ($4), password_digest = ($5) WHERE id = ($1) RETURNING *';
            const hash = bcrypt_1.default.hashSync(u.password_digest + pepper, parseInt(saltRounds));
            const result = await conn.query(sql, [u.id, u.first_name, u.last_name, u.username, hash]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not update user ${u}: ${err}`);
        }
    }
    async deleteUser(id) {
        try {
            // @ts-ignore
            const conn = await database_1.default.connect();
            const sql = 'DELETE FROM users WHERE id=($1)';
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not delete user: ${err}`);
        }
    }
    async authenticate(username, password) {
        // @ts-ignore
        const conn = await database_1.default.connect();
        const sql = 'SELECT password_digest FROM users where username=($1)';
        const result = await conn.query(sql, [username]);
        if (result.rows.length) {
            const user = result.rows[0];
            if (bcrypt_1.default.compareSync(password + process.env.BCRYPT_PASSWORD, user.password_digest)) {
                return user;
            }
        }
        return null;
    }
}
exports.UserStore = UserStore;
