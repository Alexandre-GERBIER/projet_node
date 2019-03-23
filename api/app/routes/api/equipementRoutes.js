/* Load Modules */
const express = require('express');
const router = express.Router();

/* Load controller */
const EquipementController = require('../../controller/equipementController');
const equipementController = new EquipementController();

/**
 * Installation Entity routes
 */
router.get('/', function (req, res) {
    equipementController.findAll(res);
});

router.get('/count', function (req, res) {
    equipementController.countAll(res);
});

router.get('/exists/:id', function (req, res) {
    equipementController.exists(req, res);
});

router.get('/:id', function (req, res) {
    equipementController.findById(req, res);
});
module.exports = router;
