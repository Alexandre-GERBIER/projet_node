<template>
  <div id="app">
    <div class="ui four column grid">
      <div class="row">
        <div class="column">
          <label>Activité :</label>
          <sui-dropdown
            :options="listActs"
            placeholder="activite"
            search
            selection
            v-model="selectAct"/>
        </div>
        <div class="column">
          <label>Ville :</label>
          <sui-dropdown
            :options="listVilles"
            placeholder="ville"
            search
            selection
            v-model="selectVille"/>
        </div>
        <div class="column" @click="reinit()">
          <sui-button>Réinitialiser</sui-button>
        </div>
        <div class="column" @click="envoie()">
          <sui-button>valider</sui-button>
        </div>
      </div>
    </div>
    <sui-table celled striped>
      <sui-table-header>
        <sui-table-row>
          <sui-table-headerCell colspan="12"> {{ affiche }}</sui-table-headerCell>
        </sui-table-row>
      </sui-table-header>

      <sui-table-body>
        <sui-table-row>
          <sui-table-cell>Activité</sui-table-cell>
          <sui-table-cell>Département</sui-table-cell>
          <sui-table-cell>Ville</sui-table-cell>
          <sui-table-cell> voir equipement</sui-table-cell>
          <sui-table-cell>Niveau de l'activité</sui-table-cell>
          <sui-table-cell>boutton voir map ?</sui-table-cell>
        </sui-table-row>
        <sui-table-row v-for="activit in activits" :key="activit.id">
          <sui-table-cell>{{activit.activite_libelle}}</sui-table-cell>
          <sui-table-cell>{{activit.libelle_du_departement}}</sui-table-cell>
          <sui-table-cell>{{activit.nom_de_la_commune}}</sui-table-cell>
          <sui-table-cell>{{activit.numero_de_la_fiche_equipement}}</sui-table-cell>
          <sui-table-cell>{{activit.niveau_de_lActivite}}</sui-table-cell>
          <sui-table-cell>{{activit.localisation}} boutton voir map ?</sui-table-cell>
        </sui-table-row>
      </sui-table-body>
    </sui-table>
  </div>
</template>


<script>
  import axios from 'axios'

  export default {
    name: 'App',
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
