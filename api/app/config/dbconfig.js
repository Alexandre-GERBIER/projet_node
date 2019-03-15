/* Load modules */
let sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const csv = require('csv');
const parse = require('csv-parse');
const path = require('path');
//TODO foreign keys + check type : text vs int
// TODO v2 : localisation pour géoloc + distance

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
            "PRIMARY KEY (Activite_code, numero_de_la_fiche_equipement));" ;
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

const createEquipement = function() {
    return new Promise(function (resolve, reject) {
        const sqlRequest = "CREATE TABLE IF NOT EXISTS equipement (" +
            "noDeLInstallation TEXT NOT NULL," +
            "noDeLEquipement TEXT NOT NULL," +
            "nomEquipement TEXT NOT NULL," +
            "nbrEquipement INT NOT NULL," +
            "nbrPlaceTribune INT NOT NULL," +
            "natureDeLEquipement TEXT NOT NULL," +
            "nbrVestiaire INT NOT NULL," +
            "PRIMARY KEY (numero_de_la_fiche_equipement));" +
            //"FOREIGN KEY (numero_de_l_installation) REFERENCES installation(numero_de_l_installation))";

        db.run(sqlRequest, [], (err) => {

            if (err) {
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
            "PRIMARY KEY (numero_de_l_installation))";

        db.run(sqlRequest,[], (err) => {

            if (err) {
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
                //TODO changer les parametres en fonction de ceux choisi
                const sqlRequest = "INSERT OR IGNORE into installation (numero_de_l_installation, nom_usuel_de_l_installation, code_postal, nom_de_la_commune) " +
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
                    $nbrPark: String(row.nomber_total_de_place_de_parking),
                    $dateCreation: String(row.)
                    // TODO quel date ? màj fiche ou création fiche

                };


                db.run(sqlRequest, sqlParams, function (err) {
                    if (err)
                        console.log(err);
                });

            }
        });


        stream.pipe(parser);

        parser.on('finish', function ()  {
            console.log("Installations importées");
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
                    $numeroDeLaFicheEquipement: row.numero_de_la_fiche_equipement,
                    $numeroDeLInstallation: row.numero_de_l_installation


                };

                db.run(sqlRequest, sqlParams, function (err) {
                    if (err)
                        console.log(err);
                });
            }
        });


        stream.pipe(parser);

        parser.on('finish', function ()  {
            console.log("Equipements importés");
            resolve(this);

        });

        parser.on("error", (err) =>{
            console.log(err);
            reject(err);
        });

    })
}

const populateActivite =  function() {
    return new Promise(function (resolve, reject) {
        //TODO changer les pramaetres en fonction de ceux choisi
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
                const sqlRequest = "INSERT OR IGNORE into activite(activite_code, activite_libelle, numero_de_la_fiche_equipement) " +
                    "VALUES ($activiteCode, $activiteLibelle, $numeroDeLaFicheEquipement)";
                const sqlParams = {
                    $activiteCode: row.activite_code,
                    $activiteLibelle: row.activite_libelle,
                    $numeroDeLaFicheEquipement : row.numero_de_la_fiche_equipement
                };


                db.run(sqlRequest, sqlParams, function (err) {
                    if (err) {
                        console.log(err);
                        console.log(sqlRequest, sqlParams.$activiteCode, sqlParams.$activiteLibelle, sqlParams.$numeroDeLaFicheEquipement);
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

