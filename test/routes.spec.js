const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server');

chai.use(chaiHttp);

beforeEach((done) => {
  knex.migrate.rollback()
    .then(() => {
      knext.migrate.latest()
        .then(( => knex.seed.run()
            .then(() => {
              done();
        })))
    });
});

describe('Client Routes', () => {
  it('should return the homepage with text', done => {
    chai.request(server)
    .get('/')
    .end((err, response) => {
      response.should.have.status(200);
      response.should.be.html;
      response.res.text.should.equal('We\'re going to test all the routes!');
      done();
    });
  });
  it('should return a 404 for a route that does not exist', done => {
    chai.request(server)
    .get('/sad')
    .end((err, response) => {
      response.should.have.status(404);
      done();
    });
  });
});

describe('API Routes', () => {
  describe('GET /api/v1/stars', () => {
    it('should return all of the stars', done => {
      chai.request(server)
      .get('/api/v1/stars')
      .end((err, response) => {
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('array');
        response.body.length.should.equal(30);
        response.body[0].should.have.property('name');
        response.body[0].name.should.equal('OGLE-2016-BLG-1469L');
        response.body[0].should.have.property('mass');
        response.body[0].program.should.equal('271.945750016');
        done();
      });
    });
  });
});