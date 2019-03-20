/* Load Modules */
const express = require('express');
const router = express.Router();

/* Load controller */
const ActiviteController = require('../../controller/activiteController');
const activiteController = new ActiviteController();

/**
 * Activite Entity routes
 */
router.get('/count', function (req, res) {
    activiteController.countAll(res);
});

router.get('/exists/:id', function (req, res) {
    activiteController.exists(req, res);
});

router.get('/:id', function (req, res) {
    activiteController.findById(req, res);
});

router.get('/', function (req, res) {
    activiteController.findAll(res);
});

router.get('/departement/:id',function (req,res){
    activiteController.findByDept(req,res);
});

module.exports = router;
