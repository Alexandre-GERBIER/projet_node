/* Load Modules */
const express = require('express');
const router = express.Router();

/* Load controller */
const InstallationController = require('../../controller/InstallationController');
const InstallationController = new InstallationController();

/**
 * Installation Entity routes
 */
router.get('/:id', function (req, res) {
    InstallationController.findById(req, res);
});

router.get('/', function (req, res) {
    InstallationController.findAll(res);
});
router.get('/count', function (req, res) {
    InstallationController.countAll(res);
});

router.get('/exists/:id', function (req, res) {
    InstallationController.exists(req, res);
});
module.exports = router;
