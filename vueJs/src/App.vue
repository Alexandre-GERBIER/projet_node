<template>
  <div id="app">
    <sui-button :color="colact" @click="activite()">Activite</sui-button>
    <sui-button :color="colvil" @click="ville()">Ville</sui-button>
    <div class="ui three column grid" v-if="recher==='act'">
      <div class="row">
        <div class="column">
          <label>Activité :</label>
          <sui-input type="text"/>
        </div>
        <div class="column">
          <label>Ville :</label>
          <sui-input type="text"/>
        </div>
        <div class="column">
          <sui-button>envoyer</sui-button>
        </div>
      </div>  
    </div>
    <div class="ui three column grid" v-if="recher==='vil'">
      <div class="row">
        <div class="column">
          <label>Ville :</label>
          <sui-input type="text"/>
        </div>
        <div class="column">
          <label>Activité :</label>
          <sui-input type="text"/>
        </div>
        <div class="column">
          <sui-button>envoyer</sui-button>
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
        <sui-table-row v-for="activit in activits" :key="activit.id">
          <sui-table-cell>{{activit.activite_libelle}}</sui-table-cell>
          <sui-table-cell>{{activit.code_du_departement}}</sui-table-cell>
          <sui-table-cell>{{activit.libelle_du_departement}}</sui-table-cell>
          <sui-table-cell>{{activit.nom_de_la_commune}}</sui-table-cell>
          <sui-table-cell>{{activit.numero_de_la_fiche_equipement}}</sui-table-cell>
          <sui-table-cell>{{activit.nombre_dEquipements_identiques}}</sui-table-cell>
          <sui-table-cell>{{activit.activite_praticable}}</sui-table-cell>
          <sui-table-cell>{{activit.activite_pratiquee}}</sui-table-cell>
          <sui-table-cell>{{activit.dans_salle_specialisable}}</sui-table-cell>
          <sui-table-cell>{{activit.niveau_de_lActivite}}</sui-table-cell>
          <sui-table-cell>{{activit.localisation}}</sui-table-cell>
          <sui-table-cell>{{activit.activite_code}}</sui-table-cell>
        </sui-table-row>
      </sui-table-body>
    </sui-table>
    <router-view/>
  </div>
</template>



<script>
import axios from 'axios'

export default {
  name: 'App',
  data () {
    return {
      recher:"",
      envoyer:"",
      colact:"grey",
      colvil:"grey",
      activits:[],
      affiche:"",
    }
  },
  methods: {
    activite(){
      this.affiche="Activité"
      this.recher="act"
      this.colact="blue"
      this.colvil="grey"
      axios.get('http://localhost:3000/api/activite').then((response)=> {
        this.activits = response.data
      })
    },
    ville(){
      this.affiche="Villes"
      this.recher="vil"
      this.colvil="blue"
      this.colact="grey"
    },
  },  
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
