const supertest = require('supertest');
const server = require('../api/server');
const db = require('../data/dbConfig');

const Users = require('../api/users/model');

beforeEach(async () => {
    await db.seed.run();
})

afterAll(async () => {
    await db.destroy();
})


describe('users endpoints', () => {
    it('should get a list of users', async () => {
        const res = await supertest(server).get('/api/users');
        expect(res.statusCode).toBe(200);
        expect(res.type).toBe('application/json');
        expect(res.body.length).toBe(3);
        expect(res.body[0].id).toBe(1);
        expect(res.body[1].id).toBe(2);
    })

    it('should add a user', async () => {
        const res = await supertest(server).post('/api/users')
            .send({ username: 'ronnie', passwordHash: 'test' });
        expect(res.statusCode).toBe(201);
        expect(res.type).toBe('application/json');

        // GET list of users to ensure one was really added
        const getRes = await supertest(server).get('/api/users');
        expect(getRes.body.length).toBe(4);
    })

    it('should remove a user', async ()  => {
        const res = await supertest(server).delete('/api/users/3');
        expect(res.statusCode).toBe(200);
        expect(res.type).toBe('application/json');

        // GET list of users to ensure one was really deleted
        const getRes = await supertest(server).get('/api/users');
        expect(getRes.body.length).toBe(2);
    })
})

describe('users data access methods', () => {
    it('should return an _array_ of all users', async () => {
        const users = await Users.find();
        expect(Array.isArray(users)).toBe(true)
        expect(users.length).toBe(3)
    })

    it('should add user to table ', async () => {
        await Users.add({ username: "smith", passwordHash: "123456" });

        const users = await Users.find();
        expect(users.length).toBe(4);
        expect(users[3].username).toBe("smith")
    })

    it('should remove user from table', async () => {
        await Users.remove(2);

        const users = await Users.find();
        expect(users.length).toBe(2);
    })
})