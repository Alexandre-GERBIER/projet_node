<template>
  <div id="app">
    <sui-grid :columns="5">
      <sui-grid-row id="grid">
        <sui-grid-column>
          <img id="image" src="./img/banderole.jpg"/>
        </sui-grid-column>
        <sui-grid-column>
          <label>Activité :</label>
          <sui-dropdown
            :options="listActs"
            placeholder="activite"
            search
            selection
            v-model="selectAct"/>
        </sui-grid-column>
        <sui-grid-column>
          <label>Ville :</label>
          <sui-dropdown
            :options="listVilles"
            placeholder="ville"
            search
            selection
            v-model="selectVille"/>
        </sui-grid-column>
        <sui-grid-column @click="reinit()">
          <sui-button color="grey">Réinitialiser</sui-button>
        </sui-grid-column>
        <sui-grid-column @click="envoie()">
          <sui-button positive>valider</sui-button>
        </sui-grid-column>
      </sui-grid-row>
    </sui-grid>
    <sui-table celled id="tableau">
      <sui-table-header id="thead">
        <sui-table-row>
          <sui-table-header-cell id="salut">Activité</sui-table-header-cell>
          <sui-table-header-cell id="salut">Département</sui-table-header-cell>
          <sui-table-header-cell id="salut">Ville</sui-table-header-cell>
          <sui-table-header-cell id="salut">Adresse</sui-table-header-cell>
          <sui-table-header-cell id="salut">Carte</sui-table-header-cell>
        </sui-table-row>
      </sui-table-header>
      <sui-table-body>
        <sui-table-row v-for="activit in activits" :key="activit.id">
          <sui-table-cell>{{activit.activite_libelle}}</sui-table-cell>
          <sui-table-cell>{{activit.libelle_du_departement}}</sui-table-cell>
          <sui-table-cell>{{activit.nom_de_la_commune}}</sui-table-cell>
          <sui-table-cell>
            <Equipement :activite="activit.activite_code" :equipement="activit.numero_de_la_fiche_equipement"/>
          </sui-table-cell>
          <sui-table-cell>
            <sui-button @click="carte(activit.activite_code,activit.numero_de_la_fiche_equipement)">voir sur la carte</sui-button>
          </sui-table-cell>
        </sui-table-row>
      </sui-table-body>
    </sui-table>
  </div>
</template>


<script>
  import axios from 'axios'
  import global from '@/globals.json'
  import Equipement from "./components/equipement";
  import SuiButton from "semantic-ui-vue/dist/commonjs/elements/Button/Button";

  export default {
    name: 'App',
    components: {SuiButton, Equipement},
    data() {
      return {
        recher: "",
        envoyer: "",
        colact: "grey",
        colvil: "grey",
        activits: [],
        listActs: [],
        listVilles: [],
        affiche: "",
        selectVille: null,
        selectAct: null,
        adresse: "",
      }
    },
    methods: {
      reinit() {
        //TODO remplacer null par axios
        this.selectVille = null,
          this.selectAct = null,
          this.activits = []
      },
      envoie() {
        if (this.selectVille == null) {
          axios.get(global.API+'/activite/activites/' + this.selectAct).then((response) => {
            this.activits = response.data;
          }).catch(e => alert("Cette activité n'existe pas"));
          axios.get(global.API+'/activite/activites/villes/' + this.selectAct).then((response) => {
            this.listVilles = response.data
          }).catch(e => alert("erreur chargement list des villes :" + e));

        } else if (this.selectAct == null) {
          axios.get(global.API+'/activite/villes/' + this.selectVille).then((response) => {
            this.activits = response.data;
          }).catch(e => alert("Cette ville n'existe pas"));
          axios.get(global.API+'/activite/villes/liste/' + this.selectVille).then((response) => {
            this.listActs = response.data
          }).catch(e => alert("erreur chargement list des villes :" + e))

        } else {
          axios.get(global.API+'/activite/' + this.selectAct + '&' + this.selectVille).then((response) => {
            this.activits = response.data
          }).catch(e => alert("Cette Activité n'est pas présente dans cette ville"))
        }
      },
      carte(act,eq) {
        //TODO préparer url pour eliminer les champs vide
        axios.get(global.API+'/activite/adresse/' + act + '&' +eq).then((response) => {
          this.adresse = response.data;
          var url = String(this.adresse[0].numDeLaVoie+"+"+this.adresse[0].nomDeLaVoie+"+"+this.adresse[0].nomDuLieuDit+"+"+this.adresse[0].commune).replace(/['+']{2}/g,'+');;
          window.open('http://www.google.com/maps/place/'+url, '_blank');
        }).catch(e => console.log("erreur equipement :" + e));

        //https://www.google.com/maps/place/47%C2%B011'40.6%22N+1%C2%B030'24.6%22W/@47.1946119,-1.5090321,17z/data=!3m1!4b1!4m5!3m4!1s0x0:0x0!8m2!3d47.1946119!4d-1.5068434
      }
    },

    mounted() {
      axios.get(global.API+'/activite/liste').then((response) => {
        this.listActs = response.data
      }).catch(e => alert("erreur chargement list des activite :" + e));
      axios.get(global.API+'/activite/villes').then((response) => {
        this.listVilles = response.data
      }).catch(e => alert("erreur chargement list des villes :" + e))
    }
  }
</script>

<style>

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 10px;
  }


  #salut{
    background-color:rgb(28, 126, 192);
    color: aliceblue;
  }

  table,thead,tr,th{
    background-color:rgb(255, 255, 255);
  }

  #grid {
    background-color:rgb(0, 42, 158);
    color: white
  }
</style>
