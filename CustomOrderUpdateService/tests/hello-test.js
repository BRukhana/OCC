// Require the dev-dependencies
const request = require('request');

describe('Sample hello world Jasmine tests', () => {
    it('should respond /hello GET', done => {
      request.get('/v1/hello'), ((err, res) => {
      expect(res.statusCode).toBe(200);
      done();
      });
    });
});
