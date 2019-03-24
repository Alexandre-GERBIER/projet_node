
class Installation {
    constructor(departement,noDeLIntallation,nomUsuelDeLIstallation,codePostal,nomDeLaCommune,numDeLaVoie,nomDeLaVoie,nomDuLieuDit,installationPariculiere,nbrplaceparking,dateCreation,accesMobiliteReduite) {
        this.departement = departement;
        this.noDeLIntallation = noDeLIntallation;
        this.nomUsuelDeLIstallation = nomUsuelDeLIstallation;
        this.codePostal = codePostal;
        this.nomDeLaCommune = nomDeLaCommune;
        this.numDeLaVoie = numDeLaVoie;
        this.nomDeLaVoie = nomDeLaVoie;
        this.nomDuLieuDit = nomDuLieuDit;
        this.installationPariculiere = installationPariculiere;
        this.nbrplaceparking = nbrplaceparking;
        this.dateCreation = dateCreation;
        this.accesMobiliteReduite = accesMobiliteReduite;
    }
}

module.exports = Installation;
