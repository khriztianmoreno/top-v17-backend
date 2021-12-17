const express = require('express');
const http = require('http');

const expressConfig = require('./config/express');
const connectDB = require('./config/database');
const swaggerDocs = require('./config/swagger');
const routes = require('./routes');
const { log } = require('./utils/logger');

const app = express();
const server = http.createServer(app);

expressConfig(app);

function startServer() {
  const PORT = process.env.PORT;

  // Start server
  server.listen(PORT, async () => {
    // connect to database
    connectDB();

    // Routes
    routes(app);

    // Swagger docs
    swaggerDocs(app, PORT);

    log.info(`🤖🚀 Server running at http://localhost:${PORT}/`);
  });
}

setImmediate(startServer);

module.exports = app;
