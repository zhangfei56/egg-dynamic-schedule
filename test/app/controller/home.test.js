'use strict';

const { app, assert } = require('egg-mock/bootstrap');

describe('test/app/controller/home.test.js', () => {
  beforeEach(() => {
    app.mockSession({
      userInfo: 'test user'
    })
  })
  // it('should assert', () => {
  //   const pkg = require('../../../package.json');
  //   assert(app.config.keys.startsWith(pkg.name));
  //   console.log(app)
  //   // const ctx = app.mockContext({});
  //   // yield ctx.service.xx();
  // });

  // it('should GET /', () => {
  //   return app.httpRequest()
  //     .get('/')
  //     .expect('hi, egg')
  //     .expect(200);
  // });
});
