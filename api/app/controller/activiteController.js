/* Load activite Data Access Object */
const ActiviteDao = require('../dao/activiteDao');

/* Load Controller Common function */
const ControllerCommon = require('./common/controllerCommon');

/* Load Activite entity */
const Activite = require('../model/activite');

class activiteController{

    constructor() {
        this.activiteDao = new ActiviteDao();
        this.common = new ControllerCommon();
    };

    /**
     * Tries to find an entity using its Id / Primary Key
     * @params req, res
     * @return entity
     */
    findById(req, res) {
        let id = req.params.id;

        this.activiteDao.findById(id)
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    };

    /**
     * Finds all entities.
     * @return all entities
     */
    findAll(res) {
        this.activiteDao.findAll()
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    };

    /**
     * Counts all the records present in the database
     * @return count
     */
    countAll(res) {

        this.activiteDao.countAll()
            .then(this.common.findSuccess(res))
            .catch(this.common.serverError(res));
    };

    /**
     * Returns true if an entity exists with the given Id / Primary Key
     * @params req, res
     * @return
     */
    exists(req, res) {
        let id = req.params.id;

        this.activiteDao.exists(id)
            .then(this.common.existsSuccess(res))
            .catch(this.common.findError(res));
    };

    /**
     * return all activities in departement
     * @param req
     * @param res
     * @return
     */
    findByDept(req, res) {

        let id = req.params.id;
        this.activiteDao.findByDept(id)
            .then(this.common.existsSuccess(res))
            .catch(this.common.findError(res));
    };

    selectActivite(res){
        this.activiteDao.selectActivite()
            .then(this.common.existsSuccess(res))
            .catch(this.common.findError(res));
    };

    choseActivite(req, res) {

        let id = req.params.id;
        this.activiteDao.choseActivite(id)
            .then(this.common.existsSuccess(res))
            .catch(this.common.findError(res));
    };

    findAllHandicap(res){
        this.activiteDao.findAllHandicap()
            .then(this.common.existsSuccess(res))
            .catch(this.common.findError(res));
    };
}

module.exports = activiteController;
