<template>
  <pre>{{ pretty(json) }}</pre>
</template>

<script>
export default {
  async created() {
    this.json = await this.$axios.get(`/${this.$route.params.route}`).then((res) => res.data)
    console.log(this.json)
  },
  
  data() {
    return {
      json: '',
    }
  },

  methods: {
    pretty: function(value) {
      return JSON.stringify(value, null, 2);
    }
  }
}
</script>