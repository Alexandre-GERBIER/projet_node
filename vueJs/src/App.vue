<template>
  <div id="app">
    <label>Activité</label>
    <input type="radio" id="a" v-model="recher" value="a">
    <label>Installation</label>
    <input type="radio" id="b" v-model="recher" value="b">
    <label>Equipement</label>
    <input type="radio" id="c" v-model="recher" value="c">
    <div id="activite" v-if="recher==='a'">
        <div id="departement" >
          <label>Departement</label>
          <input type="text" name="Departement" v-model="dep">
        </div>
        <div id="commune">
          <label>Commune</label>
          <input type="text" name="Commune" v-model="commune" >
        </div>
        <div id="activitelibelle">
          <label>Nom activité</label>
          <input type="text" name="activitelibelle" v-model="nomActivite" >
        </div>
        <div id=Libelle_du_departement>
          <label>Nom Departement</label>
          <input type="text" name="Libelle_du_departement" v-model="nomDep">
        </div>
    </div>
    <button name="envoyer" @click="envoie()">envoyer</button>
    {{envoyer}}
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      villes : ['nantes','st herblain'],
      dep:"",
      commune:"",
      nomActivite:"",
      nomDep:"",
      envoyer:"",
      recher:"",
    }
  },
  methods: {
    envoie (){
      this.envoyer=this.dep+" "+this.commune+" "+this.nomActivite+" "+this.nomDep
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
