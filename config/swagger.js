const path = require('path');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const { version } = require('../package.json');
const { log } = require('../utils/logger');

const routesApi = path.join(__dirname, '/../api/**/index.js');
const schemasApi = path.join(__dirname, '/../api/**/**.schema.js');

const options = {
  definition: {
    openapi: '3.0.1',
    info: {
      title: 'Express API with Swagger',
      version,
      description:
        'This is a simple CRUD API application made with Express and documented with Swagger',
      license: {
        name: 'MIT',
        url: 'https://spdx.org/licenses/MIT.html',
      },
      contact: {
        name: 'Cristian Moreno',
        url: 'https://khriztianmoreno.dev',
        email: 'cristian.moreno@makeitreal.camp',
      },
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          in: 'header',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
    servers: [
      {
        url: 'http://localhost:8080',
        description: 'Development server',
      },
      {
        url: 'https://top-v17-backend.herokuapp.com/',
        description: 'Production server',
      },
    ],
  },
  apis: [routesApi, schemasApi],
};

const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app, port) {
  // Swagger page
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  // Docs in JSON format
  app.get('/docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });

  log.info(`📃🛠  Docs available at http://localhost:${port}/docs`);
}

module.exports = swaggerDocs;
