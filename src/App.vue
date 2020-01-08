<template>
  <div id="app">
    <component :is="layout">
      <router-view />
    </component>
  </div>
</template>

<script>
import emptyLayout from './layouts/empty'
import mainLayout from './layouts/main'

export default {
  computed: {
    layout() {
      return (this.$route.meta.layout || 'empty') + '-layout'
    },
  },
  components: { emptyLayout, mainLayout },
}
</script>

<style lang="stylus">
@import '~materialize-css/dist/css/materialize.min.css';
@import 'assets/index.css';
</style>
