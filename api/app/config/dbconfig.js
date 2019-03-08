/* Load modules */
let sqlite3 = require('sqlite3').verbose();

/*
 * Database configuration
 */

/* Load database file (Creates file if not exists) */
let db = new sqlite3.Database('./nantesDB.db');

const createActivite = function () {
    return new Promise(function (resolve, reject) {
        const sqlRequest = "CREATE TABLE IF NOT EXISTS activite (" +
            "Code_du_departement TEXT NOT NULL," +
            "Libelle_de_departement TEXT NOT NULL," +
            "Nom_de_la_commune TEXT NOT NULL," +
            "numero_de_la_fiche_equipement TEXT NOT NULL," +
            "Activite_code TEXT NOT NULL," +
            "Activite_libelle TEXT NOT NULL," +
            "Activite_praticable TEXT NOT NULL," +
            "Activite_pratiquee TEXT NOT NULL," +
            "Dans_salle_specialisable TEXT NOT NULL," +
            "Niveau_de_lActivite TEXT NOT NULL," +
            "localisation TEXT NOT NULL" +
            "PRIMARY KEY (activite_code, numero_de_la_fiche_equipement)," ;
         //   "FOREIGN KEY (numero_de_la_fiche_equipement) REFERENCES equipement(numero_de_la_fiche_equipement))";
        db.run(sqlRequest, [], (err) => {

            if (err) {
                console.log(err);
                reject(err);
            }
            else {
                console.log("Activité créée");
                resolve(this);
            }
        });

    });
};





/* Init car and driver tables if they don't exist */
let init = function () {
    db.serialize(() => {
        console.log("Création des tables et importation des données");
        createInstallation().
        then(
            ()=>createEquipement()
        ).then(
            ()=>createActivite()
        ).then(
            ()=>populateInstallation()
        ).then(
            ()=>populateEquipement()
        ).then(
            ()=>populateActivite()
        ).catch((err)=>console.log(err));
    });
};

module.exports = {
    init: init,
    db: db
};

