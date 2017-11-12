'use strict';

const expect = require('expect');
const request = require('superagent');
require('dotenv').config();
const server = require('../lib/server.js');

const host = `localhost:${process.env.PORT | 3000}`;

describe('Testing HTTP Server', () => {
    before((done) => {
        server.listen(process.env.PORT || 5000, done);
    });

    after((done) => {
        server.close(done);
    });


    //GET PLUS MESSAGE
    it('Respond with whats sent as text={message}', (done) => {
        let getMessage = 'text=lul';
        request.get(`${host}/cowsay?${getMessage}`).end((err, res) => {
            expect(err).toBe(null);
            
            expect(res.text).toEqual('text: lul');
            done();
        });
    });

    //GET
    it('Should get a response when testing GET', (done) => {
        request
            .get(`${host}/`)
            .end((err, res) => {
                expect(err).toBe(null);
                expect(res.text).toEqual('response to GET request');
                done();
            });
        });

            //POST With No Body
    it('Sends a message saying body is required if posting nothing', (done) => {
        request.post(`${host}/api/cowsay`)
            .set('Content-Type', 'text/plain').send('').end((err, res) => {
            
                expect(res.text).toEqual('Error: {"error": "invalid request: body required"}');
                done();
            });
    });

    //POST
    it('Return a JSON body object of whats sent from POST', (done) => {
        request.post(`${host}/api/cowsay`)
            .set('Content-Type', 'text/plain')
            .send('{"body":"lul"}').end((err, res) => {
                expect(err).toBe(null);
                expect(res.text).toEqual('Cowsay Message: {"body":"lul"}'); 
                done();
            });
    });

    //POST with invalid body
    it('Body value is required if body blank', (done) => {
        request.post(`${host}/api/cowsay`)
            .set('Content-Type', 'text/plain').send('{"body":""}').end((err, res) => {

                expect(res.text).toEqual('Error: {"error": "invalid request: text query required"}');
                done();
            });
    });
    // //404
    it('Gives message cannot find page', (done) => {
        request.get(`${host}/notaurl`).end((err, res) => {

            expect(res.text).toEqual('could not find page');
            done();
        });
    });

});