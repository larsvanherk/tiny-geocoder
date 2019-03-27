import NodeGeocoder from 'node-geocoder';

const options = {
  provider: 'openstreetmap'
};

const geocoder = NodeGeocoder(options);

export default {
  async decode(lat, lon) {
    try {
      return await geocoder.reverse({ lat, lon });
    } catch (error) {
      return { location: '', error };
    }
  }
};
