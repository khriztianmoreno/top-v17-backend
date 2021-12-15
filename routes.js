// import endpoints (api)
const helloworld = require('./api/helloworld');
const authLocal = require('./auth/local');
const note = require('./api/note');
const user = require('./api/user');

// defining routes
function routes(app) {
  app.use('/api/notes', note);
  app.use('/api/helloworld', helloworld);
  app.use('/api/users', user);

  // auth routes
  app.use('/auth/local', authLocal);
  // app.use('/auth/facebook', facebook);
}

module.exports = routes;
