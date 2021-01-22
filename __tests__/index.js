// Setup supertest with an instance of the express/server app
const supertest = require('supertest');
const server = require('../api/server');

// Tests the GET / endpoint
test("GET /", async () => {
    const res = await supertest(server).get("/api/users");
    expect(res.statusCode).toBe(200);
    expect(res.type).toBe("application/json");
})