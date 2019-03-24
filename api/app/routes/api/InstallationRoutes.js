/* Load Modules */
const express = require('express');
const router = express.Router();

/* Load controller */
const InstallationController = require('../../controller/InstallationController');
const installationController = new InstallationController();

/**
 * Installation Entity routes
 */


router.get('/', function (req, res) {
    installationController.findAll(res);
});
router.get('/count', function (req, res) {
    installationController.countAll(res);
});

router.get('/exists/:id', function (req, res) {
    installationController.exists(req, res);
});

router.get('/:id', function (req, res) {
    installationController.findById(req, res);
});
module.exports = router;
