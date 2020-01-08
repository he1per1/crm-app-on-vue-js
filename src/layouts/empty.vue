<template>
  <div class="grey darken-1 empty-layout">
    <router-view />
  </div>
</template>

<script>
import messages from '@/common/options.message'

export default {
  computed: {
    error() {
      return this.$store.getters.error
    }
  },
  watch: {
    error(error) {
      this.$error(messages[error.code] || 'Что-то пошло не так')
    }
  }
}
</script>