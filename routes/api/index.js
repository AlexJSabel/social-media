const router = require('express').Router();
const thoughtRoutes = require('./thought-routes');
const userRoutes = require('./user-routes');

router.use('/Thought', thoughtRoutes);
router.use('/User', userRoutes);

module.exports = router;
