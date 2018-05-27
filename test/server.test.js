'use strict';

const app = require('../server');

const chai = require('chai');

const chaiHttp = require('chai-http');

const expect = chai.expect;

chai.use(chaiHttp);

describe('GET /api/notes', function() {

  it('should list notes on GET', function() {
    return chai.request(app)
      .get('/api/notes')
      .then(function(res) {
        expect(res.body).to.be.a('array');
        expect(res.body.length).to.be.at.least(10);
        const expectedKeys = ['id', 'title', 'content'];
        res.body.forEach(function(item) {
          expect(item).to.be.a('object');
          expect(item).to.include.keys(expectedKeys);
        });
      });
  });
  
  it('should contain notes of specified query', function() {
    return chai.request(app)
      .get('/api/notes?searchTerm=government')
      .then(function(res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.a('array');
        expect(res.body).to.have.length(1);
        expect(res.body[0]).to.be.an('object');
      });
  });

  it('should return an empty array for invalid query', function() {
    return chai.request(app)
      .get('/api/notes?searchTerm=a%20nonexisting%20search%20string/')
      .then(function(res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.a('array');
        expect(res.body).to.have.length(0);
      });
  });
});

describe('GET /api/notes:id', function() {
  it('should return correct note object associated with provided id', function() {
    return chai.request(app)
      .get('/api/notes/1003')
      .then(function(res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an('object');
        expect(res.body).to.include.keys('id', 'title', 'content');
        expect(res.body.id).to.equal(1003);
        expect(res.body.title).to.include('lady gaga');
      });
  });

  it('should return 404 error if not with that id does not exist', function() {
    return chai.request(app)
      .get('/api/notes/20')
      .catch(err => err.response)
      .then(function(res) {
        expect(res).to.have.status(404);
      });
  });
});



describe('Express static', function() {

  it('GET request "/" should return the index page', function () {
    return chai.request(app)
      .get('/')
      .then(function (res) {
        expect(res).to.exist;
        expect(res).to.have.status(200);
        expect(res).to.be.html;
      });
  });
});

describe('404 handler', function() {
  it('should respond with 404 when given a bad path', function() {
    return chai.request(app)
      .get('/DOES/NOT/EXIST')
      .then( function(res) {
        expect(res).to.have.status(404);
      });
  });
});