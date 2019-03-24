/* Load Car entity */
const Installation = require('../model/Installation');

/* Load DAO Common functions */
const daoCommon = require('./commons/daoCommon');

/**
 * Installation Data Access Object
 */
class InstallationDao {

    constructor() {
        this.common = new daoCommon();
    }

    /**
     * Tries to find an entity using its Id / Primary Key
     * @params id:noDeLIntallation
     * @return entity
     */
    findById(id) {
        let sqlRequest = "SELECT * FROM installation WHERE noDeLInstallation=$id";
        let sqlParams = {$id: id};
        return this.common.findOne(sqlRequest, sqlParams).then(row =>
            new Installation(row.departement, row.noDeLIntallation, row.nomUsuelDeLIstallation, row.codePostal, row.nomDeLaCommune, row.numDeLaVoie, row.nomDeLaVoie, row.nomDuLieuDit, row.installationPariculiere, row.nbrplaceparking, row.dateCreation,row.accesMobiliteReduite));
    };

    findAll() {
        let sqlRequest = "SELECT * FROM installation";
        return this.common.findAll(sqlRequest).then(rows => {
            let installations = [];
            for (const row of rows) {
                installations.push(new Installation(row.departement,row.noDeLIntallation, row.nomUsuelDeLIstallation, row.codePostal, row.nomDeLaCommune, row.numDeLaVoie, row.nomDeLaVoie, row.nomDuLieuDit, row.installationPariculiere, row.nbrplaceparking, row.dateCreation,row.accesMobiliteReduite));
            }
            return installations;
        });
    };

    countAll() {
        let sqlRequest = "SELECT COUNT(*) AS count FROM installation";
        return this.common.findOne(sqlRequest);
    };

    exists(id) {
        let sqlRequest = "SELECT (count(*) > 0) as found FROM installation WHERE id=$id";
        let sqlParams = {$id: id};
        return this.common.run(sqlRequest, sqlParams);
    };


}
module.exports = InstallationDao;
