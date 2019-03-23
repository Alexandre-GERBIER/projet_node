<template>
  <div>
    <sui-button floated="left" @click.native="toggle" color="teal" icon="settings"> Éditer</sui-button>
    <sui-modal v-model="open">
      test {{local}}
      <google-map />

    </sui-modal>
  </div>
</template>

<script>
  import * as VueGoogleMaps from 'vue2-google-maps'
  import GoogleMap from "./googleMap";
  import SuiCheckbox from "semantic-ui-vue/dist/commonjs/modules/Checkbox/Checkbox";
  import SuiModal from "semantic-ui-vue/dist/commonjs/modules/Modal/Modal";
  // AIzaSyA5sybGvF05vsMGIyNRTGoqusIyG-5yNOU


  export default {
    components: {
      GoogleMap,
      SuiModal,
      SuiCheckbox,
    },
    props: {
      local: "",
    },
    data() {
      return {
        open: false,
        equipementData: "",
        markers: [],
        map: "",
        center: { lat: -19.8934596, lng: -44.0586543 }
      }
    },
    methods: {
      toggle () {
        this.open = !this.open;
        //this.map = new VueGoogleMap.Map(document.getElementById('map'), {
          //center: {lat: -34.397, lng: 150.644},
          //zoom: 8
        //});
      },
      /*
      newMarker (mouseArgs) {
        const createdMarker = this.addMarker();
        createdMarker.position.lat = mouseArgs.latLng.lat();
        createdMarker.position.lng = mouseArgs.latLng.lng();
        console.log(createdMarker.position.lat, createdMarker.position.lng)
      },
      addMarker () {
        this.markers.push({
          position: { lat: 48.8538302, lng: 2.2982161 },
          draggable: true,
          enabled: true
        })
        return this.markers[this.markers.length - 1]
      },
      updMarker (m, event) {
        m.position = {
          lat: event.lat(),
          lng: event.lng()
        }
      },
      logMarker (m) {
        console.log(m.position.lat, m.position.lng)
      }
    },
    mounted() {
      //set bounds of the map
      this.$refs.gmap.$mapPromise.then((map) => {
        const bounds = new google.maps.LatLngBounds()
        for (let m of this.markers) {
          bounds.extend(m.position)
        }
        map.fitBounds(bounds);
      });
      */
    },


  }
</script>

<style scoped>

</style>
