/**
 * Express Router configuration
 */
const express = require('express');
const router = express.Router();

/* API routes */

router.use('/installation', require('./api/InstallationRoutes'));
router.use('/equipement', require('./api/equipementRoutes'));
router.use('/activite',require('./api/activiteRoute'));

//router.use('/car', require('./api/carRoutes'));
module.exports = router;
