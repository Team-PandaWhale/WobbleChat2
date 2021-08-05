const request = require('supertest');
const server = 'http://localhost:3000';
const fs = require('fs');


/**
 * Read the docs! https://www.npmjs.com/package/supertest
 */
xdescribe('Route integration', () => {
  describe('/api/hello', () => {
    describe('GET', () => {
      // Note that we return the evaluation of `request` here! It evaluates to
      // a promise, so Jest knows not to say this test passes until that
      // promise resolves. See https://jestjs.io/docs/en/asynchronous
      it('responds with 200 status and json {hello: world}', () => {
          //this should be good to go, first expect might be off tho
        return request(server)
          .get('/api/hello')
          .expect({hello: 'world'}) //not sure if this is the right syntax -> looking at server.js line 18
          .expect(200);
      });
    });
  });

  describe('/api/users', () => {
    describe('POST', () => {
        //again following the route, though not sure what type comes back
      it('responds with 200 status and application/json content type', () => {
      return request(server)
      .post('/signup')
      .expect('Content-Type', /application\/json/)
      .expect(200);
      //could also investigate that id: res.locals.id is being returned
    });
    
    
    
    // For this test, you'll need to inspect the body of the response and
    // ensure it contains the markets list. Check the markets.dev.json file
    // in the dev database to get an idea of what shape you're expecting.
      it('questions from DB are in body of response', () => {

        return request(server)
          .get('/')
          .then((res) => {
            expect(res.body).toEqual([]);
          });
        });

        });
    });
  });

  describe('/api/questions', () => {
    describe('POST', () => {
        //again following the route, though not sure what type comes back
      it('responds with 200 status and application/json content type', () => {
      return request(server)
      .post('/signup')
      .expect('Content-Type', /application\/json/)
      .expect(200);
      //could also investigate that id: res.locals.id is being returned
    });
    
    
    
    // For this test, you'll need to inspect the body of the response and
    // ensure it contains the markets list. Check the markets.dev.json file
    // in the dev database to get an idea of what shape you're expecting.
      it('questions from DB are in body of response', () => {

        return request(server)
          .get('/')
          .then((res) => {
            expect(res.body).toEqual([]);
          });
        });

    });
  }
});
