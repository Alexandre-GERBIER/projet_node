
/* Load Activite entity*/
const Activite = require('../model/Activite');

/* Load DAO Common functions */
const daoCommon = require('./common/daoCommon');

/**
 * Activite Data Access Object
 */
class ActiviteDao {

    constructor(){
        this.common = new daoCommon();
    };

    /**
     * Tries to find an entity using its Id / Primary Key
     * @params id : numéro de la fiche équipement
     * @return entity
     */
    findById(id){
        let sqlRequest = "select Code_du_departement, Libelle_du_departement, Nom_de_la_commune, Numero_de_la_fiche_equipement, Nombre_dEquipements_identiques, Activite_libelle, Activite_praticable, Activite_pratiquee, Dans_salle_specialisable, Niveau_de_lActivite, localisation, Activite_code from activite where Numero_de_la_fiche_equipement = $id";
        let sqlParams = {$id: id};
        return this.common.findOne(sqlRequest, sqlParams).then(row =>
            new Activite(row.Code_du_departement, row.Libelle_du_departement, row.Nom_de_la_commune, row.Numero_de_la_fiche_equipement, row.Nombre_dEquipements_identiques, row.Activite_libelle, row.Activite_praticable, row.Activite_pratiquee, row.Dans_salle_specialisable, row.Niveau_de_lActivite, row.localisation, row.Activite_code));
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
                activite.push(new Activite(row.Code_du_departement, row.Libelle_du_departement, row.Nom_de_la_commune, row.Numero_de_la_fiche_equipement, row.Nombre_dEquipements_identiques, row.Activite_libelle, row.Activite_praticable, row.Activite_pratiquee, row.Dans_salle_specialisable, row.Niveau_de_lActivite, row.localisation, row.Activite_code));
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

}

module.exports = activiteDao;
