/* Load modules */
let sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const csv = require('csv');
const parse = require('csv-parse');
const path = require('path');
//TODO check type : text vs int
// TODO v2 : localisation pour géoloc + distance

/*
 * Database configuration
 */

/* Load database file (Creates file if not exists) */
let db = new sqlite3.Database('./nantesDB.db');

const createActivite = function () {
    return new Promise(function (resolve, reject) {
        const sqlRequest = "CREATE TABLE IF NOT EXISTS activite (" +
            "code_du_departement TEXT NOT NULL," +
            "libelle_du_departement TEXT NOT NULL," +
            "nom_de_la_commune TEXT NOT NULL," +
            "nombre_dEquipements_identiques INT," +
            "numero_de_la_fiche_equipement TEXT NOT NULL," +
            "activite_code TEXT NOT NULL," +
            "activite_libelle TEXT NOT NULL," +
            "activite_praticable TEXT NOT NULL," +
            "activite_pratiquee TEXT NOT NULL," +
            "dans_salle_specialisable TEXT NOT NULL," +
            "niveau_de_lActivite TEXT ," +
            "localisation TEXT NOT NULL," +
            "PRIMARY KEY (Activite_code, numero_de_la_fiche_equipement)," +
            "FOREIGN KEY (numero_de_la_fiche_equipement) REFERENCES equipement(noDeLEquipement));";
        db.run(sqlRequest, [], (err) => {

            if (err) {
                console.log("create activity");
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

const createEquipement = function() {
    return new Promise(function (resolve, reject) {
        const sqlRequest = "CREATE TABLE IF NOT EXISTS equipement (" +
            "noDeLInstallation TEXT NOT NULL," +
            "noDeLEquipement TEXT NOT NULL," +
            "nomEquipement TEXT NOT NULL," +
            "typeDeEquipement TEXT NOT NULL," +
            "nbrEquipement TEXT NOT NULL," +
            "nbrPlaceTribune TEXT NOT NULL," +
            "natureDeLEquipement TEXT NOT NULL," +
            "nbrVestiaire TEXT NOT NULL," +
            "PRIMARY KEY (noDeLEquipement),"+
            "FOREIGN KEY (noDeLInstallation) REFERENCES installation(noDeLInstallation));";

        db.run(sqlRequest, [], (err) => {

            if (err) {
                console.log("create equipement");
                console.log(err);
                reject(err);
            }
            else {
                console.log("Equipement créée");
                resolve(this);
            }

        });

    });
};

const createInstallation = function() {
    return new Promise(function (resolve, reject) {
        const sqlRequest = "CREATE TABLE IF NOT EXISTS installation (" +
            "departement TEXT NOT NULL," +
            "noDeLInstallation TEXT NOT NULL, " +
            "nomUsuelDeLInstallation TEXT NOT NULL, " +
            "codePostal TEXT NOT NULL, " +
            "nomDeLaCommune TEXT NOT NULL, " +
            "numDeLaVoie TEXT NOT NULL," +
            "nomDeLaVoie TEXT NOT NULL," +
            "nomDuLieuDit TEXT NOT NULL," +
            "installationParticuliere TEXT NOT NULL," +
            "nbrplaceparking TEXT NOT NULL," +
            "dateCreation TEXT NOT NULL," +
            "PRIMARY KEY (noDeLInstallation))";

        db.run(sqlRequest,[], (err) => {

            if (err) {
                console.log("create installation");
                console.log(err);
                reject(err);
            }
            else {
                console.log("Installation créée");
                resolve(this);
            }
        });

    })
};

const populateInstallation =  function() {
    return new Promise(function (resolve, reject) {
        const fileName = 'data/234400034_004-010_fiches-installations-rpdl_extra_small.csv';
        const stream = fs.createReadStream(fileName, {encoding: 'utf8'});


        const parser = parse({
            delimiter: ';',
            columns: header =>
                header.map( column => column.normalize('NFD').
                replace(/[\u0300-\u036f]/g, "").
                replace(/[^a-z0-9]/gmi, "_").
                replace(/\s+/g, '_').
                toLowerCase())
        });


        parser.on('readable', function () {
            let row;

            while (row = this.read()) {
                const sqlRequest = "INSERT OR IGNORE into installation (departement, noDeLInstallation, nomUsuelDeLInstallation, codePostal, nomDeLaCommune, numDeLaVoie, nomDeLaVoie, nomDuLieuDit, installationParticuliere, nbrplaceparking, dateCreation) " +
                    "VALUES ($dept,$noDeLInstallation, $nomUsuelDeLInstallation, $codePostal, $nomDeLaCommune, $numVoie, $nomVoie, $nomLieuDit, $instPart, $nbrPark, $dateCreation)";
                const sqlParams = {
                    $dept: String(row.code_du_departement),
                    $noDeLInstallation: String(row.numero_de_l_installation),
                    $nomUsuelDeLInstallation: row.nom_usuel_de_l_installation,
                    $codePostal: String(row.code_postal),
                    $nomDeLaCommune: String(row.nom_de_la_commune),
                    $numVoie: String(row.numero_de_la_voie),
                    $nomVoie: row.nom_de_la_voie,
                    $nomLieuDit: String(row.nom_du_lieu_dit),
                    $instPart: String(row.installation_particuliere),
                    $nbrPark: String(row.nombre_total_de_place_de_parking),
                    $dateCreation: String(row.date_de_creation_de_la_fiche_installation)
                };


                db.run(sqlRequest, sqlParams, function (err) {
                    if (err) {
                        console.log("populate installation");
                        console.log(err);
                    } else {
                    }
                });

            }
        });


        stream.pipe(parser);

        parser.on('finish', function ()  {
            console.log("installations importees");
            resolve(this);

        });

        parser.on("error", (err) =>{
            console.log(err);
            reject(err);
        });

    })
}

const populateEquipement =  function() {
    return new Promise(function (resolve, reject) {
        const fileName = 'data/234400034_004-011_fiches-equipements-rpdl_extra_small.csv';
        const stream = fs.createReadStream(fileName, {encoding: 'utf8'});

        const parser = parse({
            delimiter: ';',
            columns: header =>
                header.map( column => column.normalize('NFD').
                replace(/[\u0300-\u036f]/g, "").
                replace(/[^a-z0-9]/gmi, "_").
                replace(/\s+/g, '_').
                toLowerCase())
        });

        parser.on('readable', function () {
            let row;

            while (row = this.read()) {
                const sqlRequest = "INSERT OR IGNORE into equipement (noDeLInstallation,noDeLEquipement,nomEquipement,typeDeEquipement,nbrEquipement,nbrPlaceTribune,natureDeLEquipement,nbrVestiaire) " +
                    "VALUES ($noDeLInstallation,$noDeLEquipement,$nomEquipement,$typeDeEquipement,$nbrEquipement,$nbrPlaceTribune,$natureDeLEquipement,$nbrVestiaire)";
                const sqlParams = {
                    $noDeLInstallation: String(row.numero_de_l_installation),
                    $noDeLEquipement: String(row.numero_de_la_fiche_equipement),
                    $nomEquipement: String(row.nom_usuel_de_l_installation) ,
                    $typeDeEquipement: String(row.type_d_equipement_code),
                    $nbrEquipement: String(row.nombre_d_equipement_identique),
                    $nbrPlaceTribune: String(row.nombre_de_place_en_tribune),
                    $natureDeLEquipement: String(row.libelle_de_la_nature_de_l_equipement),
                    $nbrVestiaire: String(row.nombre_de_vestiaire_sportif)
                };

                db.run(sqlRequest, sqlParams, function (err) {
                    if (err)
                        console.log(err);
                });
            }
        });


        stream.pipe(parser);

        parser.on('finish', function ()  {
            console.log("equipement importes");
            resolve(this);

        });

        parser.on("error", (err) =>{
            console.log("parser error")
            console.log(err);
            reject(err);
        });

    })
}

const populateActivite =  function() {
    return new Promise(function (resolve, reject) {
        //TODO changer les parametres en fonction de ceux choisi
        const fileName = 'data/234400034_004-009_activites-des-fiches-equipements-rpdl_extra_small.csv';
        const stream = fs.createReadStream(fileName, {encoding: 'utf8'});

        const parser = parse({
            delimiter: ';',
            columns: header =>
                header.map( column => column.normalize('NFD').
                replace(/[\u0300-\u036f]/g, "").
                replace(/[^a-z0-9]/gmi, "_").
                replace(/\s+/g, '_').
                toLowerCase())
        });

        parser.on('readable', function () {
            let row;

            while (row = this.read()) {
                const sqlRequest = "INSERT OR IGNORE into activite(code_du_departement, activite_code, libelle_du_departement, nom_de_la_commune, numero_de_la_fiche_equipement, nombre_dEquipements_identiques, activite_libelle, activite_praticable, activite_pratiquee, dans_salle_specialisable, niveau_de_lActivite, localisation) " +
                    "VALUES ($Code_du_departement, $Activite_code, $Libelle_du_departement, $Nom_de_la_commune, $Numero_de_la_fiche_equipement, $Nombre_dEquipements_identiques, $Activite_libelle, $Activite_praticable, $Activite_pratiquee, $Dans_salle_specialisable, $Niveau_de_lActivite, $localisation)";
                const sqlParams = {
                    $Code_du_departement: row.code_du_departement,
                    $Activite_code: row.activite_code,
                    $Libelle_du_departement: row.libelle_du_departement,
                    $Nom_de_la_commune: row.nom_de_la_commune,
                    $Numero_de_la_fiche_equipement: row.numero_de_la_fiche_equipement,
                    $Nombre_dEquipements_identiques: row.nombre_d_equipements_identiques,
                    $Activite_libelle: row.activite_libelle,
                    $Activite_praticable: row.activite_praticable,
                    $Activite_pratiquee: row.activite_pratiquee,
                    $Dans_salle_specialisable: row.dans_salle_specialisable,
                    //$Niveau_de_lActivite: row.niveau_de_l_activite_-_classif,
                    $localisation:  row.localisation
                    //TODO pk localisation ici et pas dans les autres ?
                };


                db.run(sqlRequest, sqlParams, function (err) {
                    if (err) {
                        console.log(err);
                    }
                });
            }
        });


        stream.pipe(parser);

        parser.on('finish', function ()  {
            console.log("Activités importées");
            resolve(this);

        });

        parser.on("error", (err) =>{
            console.log(err);
            reject(err);
        });

    })
}

/* Init car and driver tables if they don't exist */
let init = function () {
    db.serialize(() => {
        console.log("Création des tables et importation des données");
        console.log("Création installation");
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

