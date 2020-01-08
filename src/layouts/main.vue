<template>
  <div>
    <loader v-if="loading" />

    <div class="app-main-layout" v-else>
      <navbar @openSideBar="sidebar = !sidebar" />

      <sidebar v-model="sidebar" />

      <main class="app-content" :class="{full: !sidebar}">
        <div class="app-page">
          <router-view />
        </div>
      </main>

      <div class="fixed-action-btn">
        <router-link class="btn-floating btn-large blue" to="/record" v-tooltipe="'Создать запись'">
          <i class="large material-icons">add</i>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    sidebar: true,
    loading: true
  }),
  components: {
    navbar: () => import('../components/app/navbar'),
    sidebar: () => import('../components/app/sidebar')
  },
  async mounted() {
    if (!Object.keys(this.$store.getters.info).length) {
      await this.$store.dispatch('fetchInfo')
    }
    this.loading = false
  },
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