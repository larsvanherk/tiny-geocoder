<template>
  <section class="location-result">
    <div>
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
    }
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
    margin-left: 30px;

    &:first-child {
      width: 20%;
      margin-left: 0;
    }
  }
}
</style>
