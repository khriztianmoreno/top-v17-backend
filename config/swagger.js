const path = require('path');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const { version } = require('../package.json');
const { log } = require('../utils/logger');

const routesApi = path.join(__dirname, '../api/**/index.js');
const schemasApi = path.join(__dirname, '../api/**/**.schema.js');

const options = {
  definition: {
    openapi: '3.0.1',
    info: {
      title: 'API Documentation',
      version,
      description: 'API Documentation bla bla bla',
      license: {
        name: 'MIT',
        url: 'https://choosealicense.com/licenses/mit/',
      },
      contact: {
        name: 'Cristian Moreno',
        url: 'https://khriztianmoreno.dev',
        email: 'k@lo.com',
      },
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          in: 'header',
        },
      },
    },
    // Only for all endpoints
    // security: [
    //   {
    //     bearerAuth: [],
    //   },
    // ],
    servers: [
      {
        url: 'http://localhost:8080',
        description: 'Local server',
      },
      {
        url: 'https://top-v17-backend.herokuapp.com',
        description: 'Heroku server',
      },
    ],
  },
  apis: [routesApi, schemasApi],
};

const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app, port) {
  // Swagger Page
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  // Docs in JSON Format
  app.get('/docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });

  log.info(`📃🛠 Docs available at http://localhost:${port}/docs`);
}

module.exports = swaggerDocs;
