const router = require('express').Router();
const testRoutes = require('./test-routes');
const userRoutes = require('./user-routes');

router.use('/test', testRoutes);
router.use('/user', userRoutes);

module.exports = router;