const { Router } = require('express');

const router = new Router();

/**
 * @swagger
 * /helloworld:
 *  get:
 *     tags:
 *     - helloworld
 *     description: Responds if the app is up and running
 *     responses:
 *       200:
 *         description: App is up and running
 */
router.get('/', (req, res) => {
  res.send('Hello World!');
});

module.exports = router;
