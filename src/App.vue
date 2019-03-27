<template>
  <div id="app">
    <h1>Coördinaten Opzoeken</h1>

    <form enctype="multipart/form-data" novalidate @submit.prevent="lookup">
      <input type="file" @change="importCSV">
    </form>

    <template v-if="csv">
      <section v-if="renderResult">
        <h2>Gevonden locaties</h2>
        <button id="hide-coordinates" @click="hideCoordinates = !hideCoordinates">
          Coördinaten verbergen
        </button>
        <location-result
          v-for="(entry, idx) of filtered" :key="idx"
          :entry="entry" :hide-coordinates="hideCoordinates" />
      </section>

      <section v-else>

        <h2>Bestand verwerkt</h2>
        <p>We hebben {{ filtered.length }} coördinaten gevonden, verdergaan?</p>
        <button type="button" @click.stop="renderResult = true">Opzoeken</button>
      </section>
    </template>

    <template v-else>
      <h2>Geen bestand opgeladen</h2>
    </template>
  </div>
</template>

<script>
import filter from 'lodash/filter';
import Papa from 'papaparse';

import LocationResult from '@/components/LocationResult.vue';

export default {
  components: {
    LocationResult
  },

  data: () => ({
    csv: null,
    result: {},
    hideCoordinates: false,
    renderResult: false
  }),

  computed: {
    filtered() {
      return filter(this.result.data, ({ ignition }) => ignition === 'false');
    }
  },

  methods: {
    async importCSV(event) {
      this.renderResult = false;
      [this.csv] = event.target.files;
      Papa.parse(this.csv, {
        header: true,
        complete: (parsed) => {
          this.result = parsed;
        }
      });
    }
  }
};
</script>


<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;

  form {
    padding-bottom: 50px;
    margin-bottom: 50px;
    border-bottom: 1px solid lighten(#2c3e50, 60%);
  }

  #hide-coordinates {
    margin-bottom: 40px;
  }
}
</style>
