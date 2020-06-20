const router = require('express').Router();
const testRoutes = require('./test-routes');
const userRoutes = require('./user-routes');
const noteRoutes = require('./note-routes');
const tagRoutes = require('./tag-routes');

router.use('/test', testRoutes);
router.use('/user', userRoutes);
router.use('/note', noteRoutes);
router.use('/tag', tagRoutes);

module.exports = router;