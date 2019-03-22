<template>
  <div id="app">
    <div class="ui three column grid">
      <div class="row">
        <div class="column">
          <label>Activité :</label>
           <sui-dropdown pointing selection>
            <sui-dropdown-menu>
              <sui-dropdown-item v-for="listAct in listActs" :key="listAct.id">{{listAct}}</sui-dropdown-item>
            </sui-dropdown-menu>
           </sui-dropdown>
        </div>
        <div class="column">
          <label>Ville :</label>
            <sui-dropdown pointing selection>
              <sui-dropdown-menu>
                <option v-for="listVille in listVilles" :key="listVille.id">{{listVille}}</option>
              </sui-dropdown-menu>
            </sui-dropdown>
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
      listActs:[],
      listVilles:[],
      affiche:"",
    }
  },
  mounted () {
      axios.get('http://localhost:3000/api/activite').then((response)=> {
        this.activits = response.data
      })
      axios.get('http://localhost:3000/api/activite/liste').then((response)=> {
        this.listActs = response.data
      })
      axios.get('http://localhost:3000/api/activite/villes').then((response)=> {
        this.listVilles = response.data
      })
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
