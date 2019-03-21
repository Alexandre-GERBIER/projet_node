/* Load Modules */
const express = require('express');
const router = express.Router();

/* Load controller */
const ActiviteController = require('../../controller/activiteController');
const activiteController = new ActiviteController();

/**
 * Activite Entity routes
 */

//récupère toutes les activités de la base de données
router.get('/', function (req, res) {
    activiteController.findAll(res);
});

//renvoie le nombre d'activités de la base de données
router.get('/count', function (req, res) {
    activiteController.countAll(res);
});

//liste des activités
router.get('/liste',function (req,res){
    activiteController.selectActivite(res);
});

//renvoie les activités du département
router.get('/departement/:id',function (req,res){
    activiteController.findByDept(req,res);
});

//renvoie toutes les villes
router.get('/activites/villes',function (req,res){
    activiteController.choseVille(res);
});


//renvoie toutes les villes ou il y a l'activités ayant pour libelle le paramètre
router.get('/activites/villes/:id',function (req,res){
    activiteController.choseVilleActivite(req,res);
});


//renvoie toutes les activités ayant pour libelle le paramètre
router.get('/activites/:id',function (req,res){
    activiteController.choseActivite(req,res);
});

//renvoie si l'activite ayant pour code le paramètre existe
router.get('/exists/:id', function (req, res) {
    activiteController.exists(req, res);
});

//renvoie les entitées activite (parametre act) dans la ville (parametre ville)
// test : basket-ball&Ancenis
router.get('/:act&:ville',function (req,res){
    activiteController.choseActiviteVille(req,res);
});

//renvoie l'activité ayant comme comme le parametre
router.get('/:id', function (req, res) {
    activiteController.findById(req, res);
});

module.exports = router;
