const router = require('express').Router();

// Import all API routes
const apiRoutes = require('./api');

// add prefix of `/api` to all api routes
router.use('/api', apiRoutes);

router.use((req, res) => {
    res.status(404).send('404 error!');
});

module.exports = router;