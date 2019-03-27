<template>
  <section class="location-result">
    <div v-show="!hideCoordinates">
      <div>Lat: {{ entry.lat }}</div>
      <div>Long: {{ entry.lng }}</div>
    </div>
    <div>Adres: {{ address }}</div>
  </section>
</template>

<script>
import geocoder from '@/api/geocoder';

export default {
  props: {
    entry: {
      type: Object,
      required: true
    },
    hideCoordinates: Boolean
  },

  data: () => ({
    results: []
  }),

  computed: {
    address() {
      return this.results
        ? (this.results[0] || {}).formattedAddress
        : '-';
    }
  },

  async mounted() {
    this.results = await geocoder.decode(this.entry.lat, this.entry.lng);
  }
};
</script>

<style lang="scss" scoped>
.location-result {
  display: block;
  width: 100%;
  margin-bottom: 40px;

  > div {
    display: inline-block;
    width: calc(80% - 30px);
    margin-right: 20px;

    &:first-child {
      width: 20%;
    }

    &:last-child {
      margin-right: 0;
    }
  }
}
</style>
