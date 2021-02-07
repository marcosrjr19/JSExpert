const {describe,it} = require('mocha');
const request = require('supertest');

const app = require('./api');
const assert = require('assert');


describe('API Suite Test', () => {

    describe('/contact', () => {

        it('Should request the contact and return HYTTP Status 200', async () => {

            const response = await request(app).get('/contact').expect(200);
            assert.deepStrictEqual(response.text, 'contact!');

        })
    })


    describe('/hello', () => {

        it('should request an inexistent route /hi and /redirect to /hello ', async () => {

            const response = await request(app).get('/hi').expect(200);

            assert.deepStrictEqual(response.text, 'Hello World');
        })
    })

    describe('/login', () => {

        it('should login sucessfully and return HTTP Status 200 ', async () => {

            const response = await request(app).post('/login').send({
                username : "MarcosRibeiro",
                password : 123
            }).expect(200);

            assert.deepStrictEqual(response.text, 'Login has succeeded!');
        })

        it('should unauthorize a request when requesting it using incorrect credentials', async () => {

            const response = await request(app).post('/login').send({
                username : "IncorretCredentials",
                password : 321
            }).expect(401);

            assert.deepStrictEqual(response.text, 'Logging failed !');
        })
    })
})