// import endpoints (api)
const helloworld = require('./api/helloworld');
const authLocal = require('./auth/local');
const note = require('./api/note');
const user = require('./api/user');

// defining routes
function routes(app) {
  app.use('/api/notes', note);

  /**
   * @openapi
   * /helloworld:
   *  get:
   *     tags:
   *     - helloworld
   *     description: Responds if the app is up and running
   *     responses:
   *       200:
   *         description: App is up and running
   */
  app.use('/api/helloworld', helloworld);
  app.use('/api/users', user);

  // auth routes
  app.use('/auth/local', authLocal);
  // app.use('/auth/facebook', facebook);
}

module.exports = routes;
