<template>
  <div class="about">
    <h1>This is an about page</h1>
    <div v-for="item in items">{{item}}</div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  asyncData({ store, route }) {
    return store.dispatch('fetchItem')
  },
  computed: {
    items() {
      console.log(this.$store.state.items)
      return this.$store.state.items
    }
  },
  beforeMount() {
    this.fetchItem()
  },
  methods: {
    ...mapActions(['fetchItem'])
  }
}
</script>
