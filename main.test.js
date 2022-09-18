describe('My Stack', () => {
    it.todo('is created empty');

    it.todo('can push to the top');

    it.todo('can pop off');
})








// testing dependencies
// const server = require('/server.js')
// const supertest = require('supertest');
// const requestWithSupertest = supertest(server);

// describe('Check Endpoint', () => {
//     it('GET /user should show all users', async () => {
//         const res = await requestWithSupertest.get('/timezones');
//         expect(res.status).toEqual(200);
//     })
// })





// import { request } from 'express'
// import supertest from 'supertest'
// import app from './main.js'

// describe("GET /days", () => {
//     describe("handed correctly formatted information", () => {
//         // should respond with a 200 status code
//         test("should respond with a 200 status code", () => {
//             const response = await request(app).get('/days/2022-09-17T00:00:00/2022-09-18T00:00:00')
//         })
//         expect(response.statusCode).tobe(200)

//     })

//     describe("handed incorrectly formatted information", () => {
//         // should respond with a 400 status code

//     })
// })