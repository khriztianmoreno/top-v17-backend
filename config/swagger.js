const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const { version } = require('../package.json');
const { log } = require('../utils/logger');

const options = {
  definition: {
    openapi: '3.0.0',
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
      securitySchemas: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
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
  apis: ['../routes.js'],
};

const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app, port) {
  // connector(app, options.definition);
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
