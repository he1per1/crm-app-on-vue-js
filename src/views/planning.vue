<template>
  <div>
    <div class="page-title">
      <h3>Планирование</h3>
      <h4>{{ info.bill | currency('RUB') }}</h4>
    </div>

    <loader v-if="loading" />

    <p class="center" v-else-if="!categories.length">
      Категорий пока нет.
      <router-link tag="a" to="/categories">Создать категорию</router-link>
    </p>

    <section v-else>
      <div v-for="item in categories" :key="item.id">
        <p>
          <strong>{{ item.title }}</strong>
          {{ item.spend | currency }} из {{ item.limit | currency }}
        </p>
        <div class="progress" v-tooltipe="item.tooltipe">
          <div class="determinate" :class="[item.color]" :style="{width: item.progress + '%'}"></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import currency from '@/filters/currency'

export default {
  data: () => ({
    loading: true,
    categories: []
  }),
  async mounted() {
    const records = await this.$store.dispatch('fetchRecords')
    const categories = await this.$store.dispatch('fetchCategories')

    this.categories = categories.map(categories => {
      const spend = records
        .filter(r => r.category === categories.id)
        .filter(r => r.type === 'outcome')
        .reduce((total, record) => total += +record.amount, 0)

      const percent = 100 * spend / categories.limit
      const progress = percent > 100 ? 100 : percent
      const color = percent < 60
        ? 'green'
        : percent < 100
          ? 'yellow'
          : 'red'

      const tooltipeValue = categories.limit - spend
      const tooltipe = `${tooltipeValue < 0 ? 'Превышение на:' : 'Осталось:'} ${currency(Math.abs(tooltipeValue))}`

      return {
        ...categories,
        progress,
        color,
        tooltipe,
        spend
      }
    })
    this.loading = false
  },
  computed: {
    ...mapGetters(['info'])
  }
}
</script>