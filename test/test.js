const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');

chai.use(chaiHttp);
chai.should();

describe('Status and content', function() {
    describe('Main page', function() {
        it('Main page status', function(done) {
            chai.request(app)
                .get('/')
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });    
        it('Main page content', function(done) {
            chai.request(app)
                .get('/')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('msg').equal('Welcome to Class');
                    done();
                });
        }); 
    });
    
    describe('User page', function() {
        it('get users should exist', function(done) {
            chai.request(app)
                .get('/users/')
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
        it('get users should return object with users property', function(done) {
            chai.request(app)
                .get('/users/')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('users');
                    done();
                });
        });
        it('post user should exist', function(done) {
            chai.request(app)
                .post('/users/')
                .send({email: 'mellow@gmail.com', password: 'cool'})
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });

    });
    
});

