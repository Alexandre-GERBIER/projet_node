/* Load Car Data Access Object */
const InstalationDao = require('../dao/InstallationDao');

/* Load Controller Common function */
const ControllerCommon = require('./common/controllerCommon');

/* Load Car entity */
const Installation = require('../model/Installation');

/**
 * Installation Controller
 */
class CarController {

    constructor() {
        this.InstallationDao = new InstallationDao();
        this.common = new ControllerCommon();
    }

    findById(req, res) {
        let id = req.params.id;

        this.InstallationDao.findById(id)
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    };

    findAll(res) {
        this.InstallationDao.findAll()
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    };

    countAll(res) {

        this.InstallationDao.countAll()
            .then(this.common.findSuccess(res))
            .catch(this.common.serverError(res));
    };

    exists(req, res) {
        let id = req.params.id;

        this.InstallationDao.exists(id)
            .then(this.common.existsSuccess(res))
            .catch(this.common.findError(res));
    };

}
module.exports = InstallationController;
