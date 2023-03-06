// @ts-ignore
import client from "../database";

export type User = {
    id?: number;
    first_name: string;
    last_name: string;
    username: string;
    password_digest: string;
}

export class UserStore {
    async indexUsers(): Promise<User[]> {
        try {
            // @ts-ignore
            const conn = await client.connect();
            const sql = 'SELECT * FROM users';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (err){
            throw new Error(`Could not get users: ${err}`);
        }
    }
    async showUser(id: number): Promise<User> {
        try {
            // @ts-ignore
            const conn = await client.connect();
            const sql = 'SELECT * FROM users where id=($1)';
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];

        }
        catch (err){
            throw new Error(`Could not get the specified user: ${err}`);
        }
    }
    async createUser(u: User): Promise<User> {
        try {
            // @ts-ignore
            const conn = await client.connect();
            const sql = 'INSERT INTO users (first_name, last_name, username, password_digest) VALUES ($1, $2, $3, $4) RETURNING *';
            const result = await conn.query(sql, [u.first_name, u.last_name, u.username, u.password_digest]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not create user ${u}: ${err}`);
        }
    }
    async editUser(u: User): Promise<User> {
        try {
            // @ts-ignore
            const conn = await client.connect();
            const sql = 'UPDATE users SET first_name = ($2), last_name = ($3), username = ($4) WHERE id = ($1) RETURNING *';
            const result = await conn.query(sql, [u.id, u.first_name, u.last_name, u.username, u.password_digest]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not update user ${u}: ${err}`);
        }
    }
    async deleteUser(id: number): Promise<User> {
        try{
            // @ts-ignore
            const conn = await client.connect();
            const sql = 'DELETE FROM users WHERE id=($1)';
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not delete user: ${err}`);
        }
    }

}