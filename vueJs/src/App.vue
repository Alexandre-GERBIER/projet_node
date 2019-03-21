<template>
  <div id="app">
    <sui-button @click="activite()">Activite</sui-button>
    <sui-button class="ui button" @click="ville()">Ville</sui-button>
    <div class="ui three column grid" v-if="recher==='act'">
      <div class="row">
        <div class="column">
          <label>Activité</label>
          <sui-input type="text"/>
        </div>
        <div class="column">
          <label>Ville</label>
          <sui-input type="text"/>
        </div>
        <div class="column">
          <sui-button @click="envoie()">envoyer</sui-button>
        </div>
      </div>  
    </div>
    <div class="ui three column grid" v-if="recher==='vil'">
      <div class="row">
        <div class="column">
          <label>Ville</label>
          <sui-input type="text"/>
        </div>
        <div class="column">
          <label>Activité</label>
          <sui-input type="text"/>
        </div>
        <div class="column">
          <sui-button @click="envoie()">envoyer</sui-button>
        </div>
      </div>  
    </div>    
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
    }
  },
  methods: {
    activite(){
      this.recher="act"
    },
    ville(){
      this.recher="vil"
    },
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
