import { User, UserStore } from "../../models/user";

const store = new UserStore();

describe('User Model Suite', () => {
    it('Expects store.createUser(u) to create a new user', async () => {
        const result = await store.createUser({first_name: 'hussain', last_name: 'qurain', username: 'rayleigh50', password_digest: 'test123'});
        expect(result.username).toEqual('rayleigh50');
    })
})