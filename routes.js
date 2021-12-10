// import endpoints (api)
const helloworld = require('./api/helloworld');
const note = require('./api/note');

// defining routes
function routes(app) {
  app.use('/api/notes', note);
  app.use('/api/helloworld', helloworld);
  // app.use('/api/users', user);
}

module.exports = routes;
