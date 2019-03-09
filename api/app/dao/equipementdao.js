/* Load Car entity */
const Equipement = require('../model/equipement');

/* Load DAO Common functions */
const daoCommon = require('./commons/daoCommon');

/**
 * Installation Data Access Object
 */
class equipementDao {

    constructor() {
        this.common = new daoCommon();
    }

    /**
     * Tries to find an entity using its Id / Primary Key
     * @params id:noDeLEquipement
     * @return entity
     */
    findById(id) {
        let sqlRequest = "SELECT noDeLInstallation,noDeLEquipement,nomEquipement,typeDeEquipement,nbrEquipement,nbrPlaceTribune,natureDeLEquipement,nbrVestiaire FROM equipement WHERE id=$id";
        let sqlParams = {$id: id};
        return this.common.findOne(sqlRequest, sqlParams).then(row =>
            new Equipement(row.noDeLInstallation, row.noDeLEquipement, row.nomEquipement, row.typeDeEquipement, row.nbrEquipement, row.nbrPlaceTribune, row.natureDeLEquipement, row.nbrVestiaire));
    };

    findAll() {
        let sqlRequest = "SELECT * FROM equipement";
        return this.common.findAll(sqlRequest).then(rows => {
            let Equipements = [];
            for (const row of rows) {
                Equipements.push(new Equipement(row.noDeLInstallation, row.noDeLEquipement, row.nomEquipement, row.typeDeEquipement, row.nbrEquipement, row.nbrPlaceTribune, row.natureDeLEquipement, row.nbrVestiaire));
            }
            return Equipements;
        });
    };

    countAll() {
        let sqlRequest = "SELECT COUNT(*) AS count FROM equipement";
        return this.common.findOne(sqlRequest);
    };

    exists(id) {
        let sqlRequest = "SELECT (count(*) > 0) as found FROM equipement WHERE id=$id";
        let sqlParams = {$id: id};
        return this.common.run(sqlRequest, sqlParams);
    };


}
module.exports = equipementDao;
