<template>
  <div>
    <sui-checkbox toggle @click.native="toggle" color="teal" v-model="open">
      <span v-if="open==false">afficher l'adresse </span>
      <span v-else>masquer l'adresse</span>
    </sui-checkbox>
    <p>
      <span v-show="open" v-if="equipementData[0]!=null"> {{equipementData[0].nom}} </span> <br>
      <span v-show="open" v-if="equipementData[0]!=null"> {{equipementData[0].numDeLaVoie}} {{equipementData[0].nomDeLaVoie}} </span> <br>
      <span v-show="open" v-if="equipementData[0]!=null"> {{equipementData[0].codePostal}} {{equipementData[0].commune}} </span>
    </p>
  </div>
</template>

<script>
  import axios from 'axios'
  import SuiModalHeader from "semantic-ui-vue/dist/commonjs/modules/Modal/ModalHeader";
  import SuiModalContent from "semantic-ui-vue/dist/commonjs/modules/Modal/ModalContent";
  import SuiCheckbox from "semantic-ui-vue/dist/commonjs/modules/Checkbox/Checkbox";

  export default {
    name: "equipement",
    components: {SuiCheckbox, SuiModalContent, SuiModalHeader},
    props: {
      activite: '',
      equipement: '',
    },
    data() {
      return {
        open: false,
        equipementData: "",
      }
    },
    methods: {
      toggle() {
        axios.get('http://localhost:3000/api/activite/adresse/' + this.activite + '&' + this.equipement).then((response) => {
          this.equipementData = response.data;
        }).catch(e => console.log("erreur equipement :" + e));
      }
    }
  }
</script>

<style scoped>

</style>
