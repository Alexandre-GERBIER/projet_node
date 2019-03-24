<template>
  <div>
    <sui-button @click="toggle()" color="teal">En savoir plus</sui-button>
    <sui-modal v-model="open">
      <sui-modal-header>
        {{activite.activite_libelle}} à {{installation.nomDeLaCommune}}
      </sui-modal-header>
      <sui-modal-content>
        <sui-list>
          <sui-item>
            <sui-item-content v-if="activite.niveau_de_lActivite != null">
              Niveau de l'acvtivité : {{activite.niveau_de_lActivite}}
            </sui-item-content>
          </sui-item>
          <sui-item>
            <sui-item-content v-if="equipementData.natureDeLEquipement != null">
              type d'équipement : {{equipementData.natureDeLEquipement}}
            </sui-item-content>
          </sui-item>
          <sui-item>
            <sui-item-content v-if="installation.installationPariculiere != null">
              {{installation.installationPariculiere}}
            </sui-item-content>
          </sui-item>
          <sui-item>
            <sui-item-content v-if="installation.nbrplaceparking != null">
              nombre de places de parking au sein de l'équipement : {{installation.nbrplaceparking}}
            </sui-item-content>

          </sui-item>


        </sui-list>

      </sui-modal-content>
    </sui-modal>
  </div>
</template>

<script>
  import axios from 'axios';
  import global from '@/globals.json';
  import SuiButton from "semantic-ui-vue/dist/commonjs/elements/Button/Button";
  import SuiModal from "semantic-ui-vue/dist/commonjs/modules/Modal/Modal";
  import SuiTable from "semantic-ui-vue/dist/commonjs/collections/Table/Table";
  import SuiTableRow from "semantic-ui-vue/dist/commonjs/collections/Table/TableRow";
  import SuiTableCell from "semantic-ui-vue/dist/commonjs/collections/Table/TableCell";
  import SuiItemContent from "semantic-ui-vue/dist/commonjs/views/Item/ItemContent";

  export default {
    name: "détails",
    components: {SuiItemContent, SuiTableCell, SuiTableRow, SuiTable, SuiModal, SuiButton},
    props: {
      activite: '',
    },
    data() {
      return {
        open: false,
        equipementData: "",
        installation: "",
      }
    },
    methods: {
      toggle() {
        this.open = !this.open;
        axios.get(global.API + '/equipement/' + this.activite.numero_de_la_fiche_equipement).then((response) => {
          this.equipementData = response.data;
          axios.get(global.API + '/installation/' + this.equipementData.noDeLInstallation).then((response) => {
            this.installation = response.data;
          }).catch(e => console.log("erreur détails installation :" + e));
        }).catch(e => console.log("erreur détails equipement:" + e));
      },
      mounted() {

      }
    }
  }
</script>

<style scoped>

</style>
