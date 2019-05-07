const chai = require('chai');
const request = require('request');

const expect = chai.expect;

it('Main page content', function(done) {
    request('http://localhost:3001', function(error, response, body) {
        expect(body).to.equal('Welcome to Class');
        done();
    });
});

it('Main page status', function(done) {
    request('http://localhost:3001' , function(error, response, body) {
        expect(response.statusCode).to.equal(200);
        done();
    });
});
