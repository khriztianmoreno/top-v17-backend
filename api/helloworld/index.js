const { Router } = require('express');

const router = Router();

router.get('/', (req, res) => {
  res.json({ msg: 'Hello World from deploy' });
});

module.exports = router;
