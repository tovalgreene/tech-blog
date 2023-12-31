const router = require('express').Router();
const apiRoutes = require('./api');
const dashboardRoutes = require('./dashboardRoutes.js');
const homeRoutes = require('./homeRoutes.js');

// Route setup
router.use('/', homeRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/api', apiRoutes);

// 404 Not Found handler
router.use((req, res) => {
    res.status(404).send('404 Not Found');
});

module.exports = router;
