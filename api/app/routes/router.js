/**
 * Express Router configuration
 */
const express = require('express');
const router = express.Router();

/* API routes */
router.use('/car', require('./api/carRoutes'));
router.use('/driver', require('./api/driverRoutes'));

router.use('/installation', require('./api/InstallationRoutes'));
router.use('/equipement', require('./api/equipementRoutes'));
router.use('/test', require('./api/testRoutes'));

//router.use('/car', require('./api/carRoutes'));
module.exports = router;
