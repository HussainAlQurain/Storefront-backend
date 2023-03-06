// CREATE TABLE users (
//     id SERIAL PRIMARY KEY,
//     first_name varchar(50) NOT NULL,
//     last_name varchar(50) NOT NULL,
//     username varchar(30) NOT NULL,
//     password_digest varchar
// );
import client from "../database";

export type User {
    id: number;
    first_name: string;
    last_name: string;
    username: string;
    password_digest: string;
}

export class UserStore {
    async index(): Promise<User[]> {
        const conn = await client.connect();
        const sql = 'SELECT * FROM users'
    }
}