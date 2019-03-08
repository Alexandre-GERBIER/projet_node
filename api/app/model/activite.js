/**
 * Entité activité
 */

class Activite {
    constructor(Code_du_departement, Libelle_du_departement, Nom_de_la_commune, Numero_de_la_fiche_equipement, Nombre_dEquipements_identiques, Activite_libelle, Activite_praticable, Activite_pratiquee, Dans_salle_specialisable, Niveau_de_lActivite, localisation) {
        this.Code_du_departement = Code_du_departement ;
        this.Libelle_du_departement = Libelle_du_departement;
        this.Nom_de_la_commune = Nom_de_la_commune;
        this.Numero_de_la_fiche_equipement = Numero_de_la_fiche_equipement;
        this.Nombre_dEquipements_identiques = Nombre_dEquipements_identiques;
        this.Activite_libelle = Activite_libelle;
        this.Activite_praticable = Activite_praticable;
        this.Activite_pratiquee = Activite_pratiquee;
        this.Dans_salle_specialisable = Dans_salle_specialisable;
        this.Niveau_de_lActivite = Niveau_de_lActivite;
        this.localisation = localisation;
}
}

module.exports = Activite;
