/**
 * Entité activité
 */

class Activite {
    constructor(Code_du_departement, Libelle_du_departement, Nom_de_la_commune, Numero_de_la_fiche_equipement, Nombre_dEquipements_identiques, Activite_libelle, Activite_praticable, Activite_pratiquee, Dans_salle_specialisable, Niveau_de_lActivite, localisation, Activite_code) {
        this.code_du_departement = Code_du_departement ;
        this.activite_code = Activite_code;
        this.libelle_du_departement = Libelle_du_departement;
        this.nom_de_la_commune = Nom_de_la_commune;
        this.numero_de_la_fiche_equipement = Numero_de_la_fiche_equipement;
        this.nombre_dEquipements_identiques = Nombre_dEquipements_identiques;
        this.activite_libelle = Activite_libelle;
        this.activite_praticable = Activite_praticable;
        this.activite_pratiquee = Activite_pratiquee;
        this.dans_salle_specialisable = Dans_salle_specialisable;
        this.niveau_de_lActivite = Niveau_de_lActivite;
        this.localisation = localisation;
}
}

module.exports = Activite;
