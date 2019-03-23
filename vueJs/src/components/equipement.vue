<template>
  <div>
    <sui-button floated="left" @click.native="toggle" color="teal"> détails équipement</sui-button>
    <sui-modal v-model="open" id="small_popup">
      <sui-modal-header>
        <span v-if="equipementData[0]!=null">{{equipementData[0].nom}}</span>
      </sui-modal-header>
      <sui-modal-content v-if="equipementData[0]!=null"  text-align="center">
        {{equipementData[0].numDeLaVoie}} {{equipementData[0].nomDeLaVoie}} <br>
        {{equipementData[0].codePostal}} {{equipementData[0].commune}}
      </sui-modal-content>
    </sui-modal>
  </div>
</template>

<script>
  import axios from 'axios'
  import SuiModalHeader from "semantic-ui-vue/dist/commonjs/modules/Modal/ModalHeader";
  import SuiModalContent from "semantic-ui-vue/dist/commonjs/modules/Modal/ModalContent";

  export default {
    name: "equipement",
    components: {SuiModalContent, SuiModalHeader},
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
        this.open = !this.open;
        axios.get('http://localhost:3000/api/activite/adresse/' + this.activite + '&' + this.equipement).then((response) => {
          this.equipementData = response.data;
        }).catch(e => console.log("erreur equipement :" + e));
      }
    }
  }
</script>

<style scoped>

</style>
