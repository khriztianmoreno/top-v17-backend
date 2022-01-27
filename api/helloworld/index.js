const { Router } = require('express');

const router = Router();

/**
 * @openapi
 * /api/helloworld:
 *  get:
 *   tags:
 *   - HealthCheck
 *   description: Get a hello world message
 *   responses:
 *    200:
 *      description: App is up and running
 */
router.get('/', (req, res) => {
  res.json({ msg: 'Hello World from deploy' });
});

module.exports = router;
