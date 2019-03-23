<template>
  <div id="app">
    <sui-grid :columns="4">
      <sui-grid-row color="blue">
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
    <sui-table celled>
      <sui-table-header>
        <sui-table-row>
          <sui-table-header-cell>Activité</sui-table-header-cell>
          <sui-table-header-cell>Département</sui-table-header-cell>
          <sui-table-header-cell>Ville</sui-table-header-cell>
          <sui-table-header-cell> voir equipement</sui-table-header-cell>
          <sui-table-header-cell>Niveau de l'activité</sui-table-header-cell>
          <sui-table-header-cell>boutton voir map ?</sui-table-header-cell>
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
          <sui-table-cell>{{activit.niveau_de_lActivite}}</sui-table-cell>
          <sui-table-cell>{{activit.localisation}} boutton voir map ?</sui-table-cell>
        </sui-table-row>
      </sui-table-body>
    </sui-table>
  </div>
</template>


<script>
  import axios from 'axios'
  import Equipement from "./components/equipement";

  export default {
    name: 'App',
    components: {Equipement},
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
      }
    },
    methods:{
      reinit() {
        this.selectVille=null,
        this.selectAct= null,
        this.activits= []
      },
      envoie() {
        if (this.selectVille==null) {
          axios.get('http://localhost:3000/api/activite/activites/'+this.selectAct).then((response) => {
            this.activits = response.data
          }).catch(error => alert("Cette activité n'existe pas"))
        } else if (this.selectAct==null) {
          axios.get('http://localhost:3000/api/activite/villes/'+this.selectVille).then((response) => {
            this.activits = response.data
          }).catch(error => alert("Cette ville n'existe pas"))
        } else {
          axios.get('http://localhost:3000/api/activite/'+this.selectAct+'&'+this.selectVille).then((response) => {
            this.activits = response.data
          }).catch(error => alert("Cette Activité n'est pas présente dans cette ville"))
        }
      },
    },

    mounted() {
      axios.get('http://localhost:3000/api/activite/liste').then((response) => {
        this.listActs = response.data
      }).catch(error => alert("erreur chargement list des activite :"+erreur));
      axios.get('http://localhost:3000/api/activite/villes').then((response) => {
        this.listVilles = response.data
      }).catch(error => alert("erreur chargement list des villes :"+erreur))
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
    margin-top: 60px;
  }
</style>