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
       {{comments}}
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
      comments:[],
    }
  },
  methods: {
    activite(){
      this.recher="act"
      this.colact="blue"
      this.colvil="grey"
    },
    ville(){
      this.recher="vil"
      this.colvil="blue"
      this.colact="grey"
    },
  },
  mounted () {
      axios.get('http://localhost:3000/api/activite').then((response)=> {
        this.comments = response.data
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
