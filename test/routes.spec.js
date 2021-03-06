const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const {app, database} = require('../server');
const knex = require('../knexfile')

chai.use(chaiHttp);

describe('Client Routes', () => {
  it('should return the homepage with text', done => {
    chai.request(app)
    .get('/')
    .end((err, response) => {
      response.should.have.status(200);
      response.should.be.json;
      done();
    });
  });
  it('should return a 404 for a route that does not exist', done => {
    chai.request(app)
    .get('/sad')
    .end((err, response) => {
      response.should.have.status(404);
      done();
    });
  });
});

describe('API Routes', () => {
  beforeEach((done) => {
  database.migrate.rollback()
    .then(() => {
      database.migrate.latest()
        .then(() => database.seed.run()
            .then(() => {
              done();
        }))
    });
  });
  describe('GET /api/v1/stars', () => {
    it('should return all of the stars', done => {
      chai.request(app)
      .get('/api/v1/stars')
      .end((err, response) => {
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('array');
        response.body.length.should.equal(30);
        response.body[0].should.have.property('name');
        response.body[0].should.have.property('mass');
        done();
      });
    });
  });
  describe('GET /api/v1/exoplanets', () => {
    it('should return all of the exoplanets', done => {
      chai.request(app)
      .get('/api/v1/exoplanets')
      .end((err, response) => {
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('array');
        response.body.length.should.equal(840);
        response.body[0].name.should.equal('OGLE-2016-BLG-1469L b');
        done();
      });
    });
  });
  describe('POST /api/v1/stars', () => {
    it('POST /api/v1/stars HAPPY', () => {
      chai.request(app)
      .post('/api/v1/stars')
      .send({
        name: 'OGLE-2016-BLG-1469L',
        mass: '271.945750016'
      })
      .end((err, response) => {
        response.should.have.status(201);
        response.should.be.json;
        response.body.should.have.property('message')
        response.body.message.should.equal('Star successfully added')
      });
    });

    it('POST /api/v1/stars SAD', () => {
      chai.request(app)
      .post('/api/v1/stars')
      .send({
        nambie: 'OGLE-2016-BLG-1469L',
        mass: '271.945750016'
      })
      .end((err, response) => {
        response.should.have.status(422);
        response.should.be.json;
        response.body.should.have.property('error')
        response.body.error.should.equal('You are missing a required parameter')
      });
    });
  });

  describe('POST /api/v1/exoplanets', () => {
    it('POST /api/v1/exoplanets HAPPY', () => {
      chai.request(app)
      .post('/api/v1/exoplanets')
      .send({
        name: 'OGLE-2016-BLG-1469L b',
        mass: '271.945750016'
      })
      .end((err, response) => {
        response.should.have.status(201);
        response.should.be.json;
          response.body.should.have.property('message')
          response.body.message.should.equal('Exoplanet successfully added')
      })
    })

    it('POST /api/v1/exoplanets SAD', () => {
      chai.request(app)
      .post('/api/v1/exoplanets')
      .send({
        nambie: 'OGLE-2016-BLG-1469L b',
        mass: '271.945750016'
      })
      .end((err, response) => {
        response.should.have.status(422);
        response.should.be.json;
        response.body.should.have.property('error')
        response.body.error.should.equal('You are missing a required parameter')
      })
    })
  });

  describe('DELETE', () => {
    it('DELETE /api/v1/stars/:id HAPPY', (done) => {
      const firstStar = 77;
      chai.request(app)
        .delete(`/api/v1/stars/${firstStar}`)
        .end((err, response) => {
          response.should.have.status(422);
          done();
        })
    })
    it('DELETE /api/v1/star/:id SAD', (done) => {
      const sadPath = 0
      chai.request(app)
        .delete(`/api/v1/stars/${sadPath}`)
        .end((err, response) => {
          response.should.have.status(422);
          done();
        });
    });
	})
	  it('DELETE /api/v1/exoplanets/:id HAPPY', (done) => {
      const firstStar = 77;
      chai.request(app)
        .delete(`/api/v1/exoplanets/${firstStar}`)
        .end((err, response) => {
          response.should.have.status(201);
          done();
        })
    })
    it('DELETE /api/v1/exoplanets/:id SAD', (done) => {
      const sadPath = 0
      chai.request(app)
        .delete(`/api/v1/exoplanets/${sadPath}`)
        .end((err, response) => {
          response.should.have.status(422);
          done();
        });
    });
  })

