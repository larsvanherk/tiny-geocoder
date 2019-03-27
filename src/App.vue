<template>
  <div id="app">
    <h1>Coördinaten Opzoeken</h1>

    <form novalidate="novalidate" @submit.prevent="lookup">
      <input type="text" v-model="lat" placeholder="lat">
      <input type="text" v-model="lon" placeholder="lon">
      <button type="submit">Berekenen</button>
    </form>

    <section>
      <h2>Gevonden locaties</h2>
      <p v-for="(res, index) in result" :key="index">{{ res.formattedAddress }}</p>
    </section>
  </div>
</template>

<script>
import geocoder from '@/api/geocoder';

export default {
  data: () => ({
    lat: 0,
    lon: 0,
    result: {}
  }),

  methods: {
    async lookup() {
      this.result = await geocoder.decode(this.lat, this.lon);
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
}
</style>
