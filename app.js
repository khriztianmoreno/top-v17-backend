const express = require('express');

const expressConfig = require('./config/express');
const connectDB = require('./config/database');
const swaggerDocs = require('./config/swagger');
const routes = require('./routes');
const { log } = require('./utils/logger');

const app = express();

expressConfig(app);

const PORT = process.env.PORT;

// Start server
app.listen(PORT, () => {
  // connect to database
  connectDB();

  // Routes
  routes(app);

  // Swagger
  swaggerDocs(app, PORT);

  log.info(`Server running 🤖🚀 at http://localhost:${PORT}/`);
});

module.exports = app;
