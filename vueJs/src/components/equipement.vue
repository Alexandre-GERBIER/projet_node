<template>
  <div>
    <sui-button floated="left" @click.native="toggle" color="teal"> détails équipement</sui-button>
    <sui-modal v-model="open" id="small_popup">
      test
      {{equipementData}}
    </sui-modal>
  </div>
</template>

<script>
  export default {
    name: "equipement",
    props: {
      activite: '',
      equipement: ''
    },
    data() {
      return {
        open: false,
        equipementData: ""
      }
    },
    methods: {
      toggle() {
        this.open = !this.open
      }
    },
    mounted() {
      axios.get('http://localhost:3000/api/activite/addresse/'+this.activite+"&"+this.equipement).then((response) => {
        this.equipementData = response.data
      }).catch(error => alert("erreur equipement :"+erreur));
    }
  }
</script>

<style scoped>

</style>
