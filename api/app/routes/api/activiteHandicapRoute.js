/* Load Modules */
const express = require('express');
const router = express.Router();

/* Load controller */
const ActiviteController = require('../../controller/activiteController');
const activiteController = new ActiviteController();

/**
 * Activite Entity routes
 */

router.get('/', function (req, res) {
    activiteController.findAllHandicap(res);
});

router.get('/count', function (req, res) {
    activiteController.countAll(res);
});

router.get('/:id', function (req, res) {
    activiteController.findById(req, res);
});

router.use('/handicap/',require('activiteHandicapRoute'));

router.get('/liste/',function (req,res){
    activiteController.selectActivite(res);
});

router.get('/departement/:id',function (req,res){
    activiteController.findByDept(req,res);
});

router.get('/activites/:id',function (req,res){
    activiteController.choseActivite(req,res);
});

router.get('/exists/:id', function (req, res) {
    activiteController.exists(req, res);
});

module.exports = router;
