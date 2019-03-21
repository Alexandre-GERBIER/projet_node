
/* Load Activite entity*/
const Activite = require('../model/activite');

/* Load DAO Common functions */
const daoCommon = require('./commons/daoCommon');


/**
 * Activite Data Access Object
 */
class activiteDao {

    constructor(){
        this.common = new daoCommon();
    };

    /**
     * Tries to find an entity using its Id / Primary Key
     * @params id : numéro de la fiche équipement
     * @return entity
     */
    findById(id){
        let sqlRequest = "select* from activite where activite_code= $id";
        let sqlParams = {$id: id};
        return this.common.findOne(sqlRequest, sqlParams).then(row =>
            new Activite(row.code_du_departement, row.libelle_du_departement, row.nom_de_la_commune, row.numero_de_la_fiche_equipement, row.nombre_dEquipements_identiques, row.activite_libelle, row.activite_praticable, row.activite_pratiquee, row.dans_salle_specialisable, row.niveau_de_lActivite, row.localisation, row.activite_code));
    };

    /**
     * Finds all entities.
     * @return all entities
     */
    findAll() {
        let sqlRequest = "SELECT * FROM activite";
        return this.common.findAll(sqlRequest).then(rows => {
            let activite = [];
            for (const row of rows) {
                activite.push(new Activite(row.code_du_departement, row.libelle_du_departement, row.nom_de_la_commune, row.numero_de_la_fiche_equipement, row.nombre_dEquipements_identiques, row.activite_libelle, row.activite_praticable, row.activite_pratiquee, row.dans_salle_specialisable, row.niveau_de_lActivite, row.localisation, row.activite_code));
            }
            return activite;
        });
    };

    /**
     * Counts all the records present in the database
     * @return count
     */
    countAll() {
        let sqlRequest = "SELECT COUNT(*) AS count FROM activite";
        return this.common.findOne(sqlRequest);
    };

    /**
     * Returns true if an entity exists with the given Id / Primary Key
     * @params id
     * returns database entry existence status (true/false)
     */
    exists(id) {
        let sqlRequest = "SELECT (count(*) > 0) as found FROM activite WHERE Numero_de_la_fiche_equipement=$id";
        let sqlParams = {$id: id};
        return this.common.run(sqlRequest, sqlParams);
    };

    /**
     * return all activities in departement
     * @param numDept
     */
    findByDept(numDept) {
        let sqlRequest = "SELECT * FROM activite WHERE code_du_departement=$numDept";
        let sqlParams = {$numDept : numDept};
        return this.common.run(sqlRequest,sqlParams).then(rows => {
            let activite = [];
            for (const row of rows) {
                activite.push(new Activite(row.code_du_departement, row.libelle_du_departement, row.nom_de_la_commune, row.numero_de_la_fiche_equipement, row.nombre_dEquipements_identiques, row.activite_libelle, row.activite_praticable, row.activite_pratiquee, row.dans_salle_specialisable, row.niveau_de_lActivite, row.localisation, row.activite_code));
            }
            return activite;
        });
    }

    selectActivite(){
        let sqlRequest = "SELECT activite_libelle FROM activite ";
        return this.common.findAll(sqlRequest).then(rows => {
            let activite = [];
            for (const row of rows) {
                activite.push(String(row.activite_libelle));
            }


            return activite;
        });
    }

    choseActivite(id){
        let sqlRequest = "SELECT * FROM activite where activite_libelle like $id";
        let sqlParams = {$id : id.toLowerCase()};
        return this.common.run(sqlRequest,sqlParams).then(rows => {
            let activite = [];
            for (const row of rows) {
                activite.push(new Activite(row.code_du_departement, row.libelle_du_departement, row.nom_de_la_commune, row.numero_de_la_fiche_equipement, row.nombre_dEquipements_identiques, row.activite_libelle, row.activite_praticable, row.activite_pratiquee, row.dans_salle_specialisable, row.niveau_de_lActivite, row.localisation, row.activite_code));
            }
            return activite;
        });
    }

    findAllHandicap() {
        let sqlRequest = "SELECT * FROM activite where";
        return this.common.findAll(sqlRequest).then(rows => {
            let activite = [];
            for (const row of rows) {
                activite.push(new Activite(row.code_du_departement, row.libelle_du_departement, row.nom_de_la_commune, row.numero_de_la_fiche_equipement, row.nombre_dEquipements_identiques, row.activite_libelle, row.activite_praticable, row.activite_pratiquee, row.dans_salle_specialisable, row.niveau_de_lActivite, row.localisation, row.activite_code));
            }
            return activite;
        });
    };

}

module.exports = activiteDao;
