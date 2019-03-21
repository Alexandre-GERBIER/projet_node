<template>
  <div id="app">
    <sui-divider></sui-divider>
    
    <button name="envoyer" @click="envoie()">envoyer</button>
    {{envoyer}}
    <router-view/>
  </div>
</template>



<script>
  import axios from 'axios'

export default {
  name: 'App',
  data () {
    return {
      dep:"",
      commune:"",
      nom:"",
      nomDep:"",
      envoyer:"",
      recher:"",
      handicape:false,
    }
  },
  methods: {
    envoie (){

    }
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
