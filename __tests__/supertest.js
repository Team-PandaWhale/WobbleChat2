const request = require('supertest');
const server = 'http://localhost:3000';
const fs = require('fs');

/**
 * Read the docs! https://www.npmjs.com/package/supertest
 */
describe('Route integration', () => {
    describe('/api/hello or /api/questions', () => {
        describe('GET', () => {
          // Note that we return the evaluation of `request` here! It evaluates to
          // a promise, so Jest knows not to say this test passes until that
          // promise resolves. See https://jestjs.io/docs/en/asynchronous
          it('responds with 200 status and {hello: world}', () => {
              //this should be good to go, first expect might be off tho
            return request(server)
              .get('/api/hello')
              .expect({hello: 'world'}) //not sure if this is the right syntax -> looking at server.js line 18
              .expect(200);
          });

          it('responds with 200 status and json type', () => {
            //this should be good to go, first expect might be off tho
          return request(server)
            .get('/api/questions')
            .expect('Content-Type', /application\/json/)
            .expect(200);
         });

        });
      });

    describe('/api/users', () => {
    describe('POST', () => {
        //again following the route, though not sure what type comes back
      it('responds with 404 status and text/html content type when sent missing data', () => {
      return request(server)
      .post('/signup')
      .expect('Content-Type', /text\/html/)
      .expect(404);
      //could also investigate that id: res.locals.id is being returned
    });
    
      it('responds with 404 status and text/html content type when sent missing data', () => {
        return request(server)
          .post('/login')
          .expect('Content-Type', /text\/html/)
          .expect(404);
        });
    });
  });
});
