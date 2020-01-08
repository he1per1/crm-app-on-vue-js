<template>
  <div>
    <div class="page-title">
      <h3>Счет</h3>

      <button class="btn waves-effect waves-light btn-small" @click="refresh">
        <i class="material-icons">refresh</i>
      </button>
    </div>

    <loader v-if="loading" />

    <div class="row" v-else>
      <bill :rates="currency.rates" />
      <currency :rates="currency.rates" :date="currency.date" />
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    loading: true,
    currency: null
  }),
  components: {
    bill: () => import('@/components/homeBill'),
    currency: () => import('@/components/homeCurrency')
  },
  async mounted() {
    this.currency = await this.$store.dispatch('fetchCurrency')
    this.loading = false
  },
  methods: {
    async refresh() {
      this.loading = true
      this.currency = await this.$store.dispatch('fetchCurrency')
      this.loading = false
    }
  }
}
</script>