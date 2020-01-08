<template>
  <div>
    <div class="page-title">
      <h3>Категории</h3>
    </div>
    <section>
      <loader v-if="loading" />

      <div class="row" v-else>
        <create @created="addNewCategory" />
        <edit
          v-if="categories.length"
          :key="categories.length + updateCount"
          :categories="categories"
          @updated="updateCategories"
        />
        <p v-else class="center">Категорий пока нет</p>
      </div>
    </section>
  </div>
</template>


<script>
import create from '@/components/categoryCreate'
import edit from '@/components/categoryEdit'

export default {
  data: () => ({
    categories: [],
    loading: true,
    updateCount: 0
  }),
  methods: {
    addNewCategory(category) {
      this.categories.push(category)
    },
    updateCategories(category) {
      const id = this.categories.findIndex(item => item.id === category.id)
      this.categories[id].title = category.title
      this.categories[id].limit = category.limit

      this.updateCount++
    }
  },
  async mounted() {
    this.categories = await this.$store.dispatch('fetchCategories')
    this.loading = false
  },
  components: { create, edit }
}
</script>