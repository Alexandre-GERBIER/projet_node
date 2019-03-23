/* Load Activite entity*/
const Activite = require('../model/activite');

/* Load DAO Common functions */
const daoCommon = require('./commons/daoCommon');


/**
 * Activite Data Access Object
 */
class activiteDao {

    constructor() {
        this.common = new daoCommon();
    };

    /**
     * Tries to find an entity using its Id / Primary Key
     * @params id : numéro de la fiche équipement
     * @return entity
     */
    findById(id) {
        let sqlRequest = "select* from activite where activite_code= $id";
        let sqlParams = {$id: id};
        return this.common.run(sqlRequest, sqlParams).then(rows => {
            let activite = [];
            for (const row of rows) {
                activite.push(new Activite(row.code_du_departement, row.libelle_du_departement, row.nom_de_la_commune, row.numero_de_la_fiche_equipement, row.nombre_dEquipements_identiques, row.activite_libelle, row.activite_praticable, row.activite_pratiquee, row.dans_salle_specialisable, row.niveau_de_lActivite, row.localisation, row.activite_code));
            }
            return activite;
        });
    }

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
        let sqlParams = {$numDept: numDept};
        return this.common.run(sqlRequest, sqlParams).then(rows => {
            let activite = [];
            for (const row of rows) {
                activite.push(new Activite(row.code_du_departement, row.libelle_du_departement, row.nom_de_la_commune, row.numero_de_la_fiche_equipement, row.nombre_dEquipements_identiques, row.activite_libelle, row.activite_praticable, row.activite_pratiquee, row.dans_salle_specialisable, row.niveau_de_lActivite, row.localisation, row.activite_code));
            }
            return activite;
        });
    }

    selectActivite() {
        let sqlRequest = "SELECT DISTINCT activite_libelle FROM activite ";
        return this.common.findAll(sqlRequest).then(rows => {
            let activite = [];
            for (const row of rows) {
                activite.push({value: row.activite_libelle, text: row.activite_libelle});
            }


            return activite;
        });
    }

    choseActivite(id) {
        let sqlRequest = "SELECT * FROM activite where activite_libelle like $id";
        let sqlParams = {$id: id.toLowerCase()};
        return this.common.run(sqlRequest, sqlParams).then(rows => {
            let activite = [];
            for (const row of rows) {
                activite.push(new Activite(row.code_du_departement, row.libelle_du_departement, row.nom_de_la_commune, row.numero_de_la_fiche_equipement, row.nombre_dEquipements_identiques, row.activite_libelle, row.activite_praticable, row.activite_pratiquee, row.dans_salle_specialisable, row.niveau_de_lActivite, row.localisation, row.activite_code));
            }
            return activite;
        });
    }

    choseActiviteVille(act, ville) {
        let sqlRequest = "SELECT * FROM activite where activite_libelle like $act and nom_de_la_commune like $ville";
        let sqlParams = {$act: act, $ville: ville};
        return this.common.run(sqlRequest, sqlParams).then(rows => {
            let activite = [];
            for (const row of rows) {
                activite.push(new Activite(row.code_du_departement, row.libelle_du_departement, row.nom_de_la_commune, row.numero_de_la_fiche_equipement, row.nombre_dEquipements_identiques, row.activite_libelle, row.activite_praticable, row.activite_pratiquee, row.dans_salle_specialisable, row.niveau_de_lActivite, row.localisation, row.activite_code));
            }
            return activite;
        });
    }

    choseVilleActivite(id) {
        let sqlRequest = "SELECT DISTINCT nom_de_la_commune FROM activite where activite_libelle like $id";
        let sqlParams = {$id: id};
        return this.common.run(sqlRequest, sqlParams).then(rows => {
            let activite = [];
            for (const row of rows) {
                activite.push({value: row.nom_de_la_commune,text: row.nom_de_la_commune});
            }
            return activite;
        });
    }

    choseVille() {
        let sqlRequest = "SELECT DISTINCT nom_de_la_commune FROM activite";
        return this.common.findAll(sqlRequest).then(rows => {
            let activite = [];
            for (const row of rows) {
                activite.push({value: row.nom_de_la_commune, text:row.nom_de_la_commune});
            }
            return activite;
        });
    };

    selectActiviteVille(id) {
        let sqlRequest = "SELECT * FROM activite where nom_de_la_commune like $id";
        let sqlParams = {$id: id};
        return this.common.run(sqlRequest, sqlParams).then(rows => {
            let activite = [];
            for (const row of rows) {
                activite.push(new Activite(row.code_du_departement, row.libelle_du_departement, row.nom_de_la_commune, row.numero_de_la_fiche_equipement, row.nombre_dEquipements_identiques, row.activite_libelle, row.activite_praticable, row.activite_pratiquee, row.dans_salle_specialisable, row.niveau_de_lActivite, row.localisation, row.activite_code));
            }
            return activite;
        });
    }

    getAdresse(act, eq) {
        let sqlRequest = "select * from installation where noDeLInstallation " +
            "in (select noDeLInstallation from equipement where noDeLEquipement in" +
            "(select numero_de_la_fiche_equipement from activite where activite_code = $act and numero_de_la_fiche_equipement=$eq))";
        let sqlParams = {$act: act, $eq: eq};
        return this.common.run(sqlRequest, sqlParams).then(rows => {
            let activite = [];
            for (const row of rows) {
                activite.push({ nom: row.nomUsuelDeLInstallation, codePostal: row.codePostal, commune : row.nomDeLaCommune, nomDeLaVoie: row.nomDeLaVoie, numDeLaVoie: row.numDeLaVoie, nomDuLieuDit: row.nomDuLieuDit})
            }
            return activite;
        });
    }

    localisationActiviteEq(act, eq) {
        let sqlRequest = "select localisation from activite where numero_de_la_fiche_equipement=$eq and activite_code=$act ;";
        let sqlParams = {$act: act, $eq: eq};
        return this.common.run(sqlRequest, sqlParams).then(rows => {
            let activite = [];
            for (const row of rows) {
                activite.push({localisation: row.localisation});
            }
            return activite;
        });
    }

    selectActiviteVilleListe(id) {
        let sqlRequest = "SELECT activite_libelle FROM activite where nom_de_la_commune like $id";
        let sqlParams = {$id: id};
        return this.common.run(sqlRequest, sqlParams).then(rows => {
            let activite = [];
            for (const row of rows) {
                activite.push({value: row.activite_libelle, text: row.activite_libelle});
            }
            return activite;
        });
    }

}

module.exports = activiteDao;
