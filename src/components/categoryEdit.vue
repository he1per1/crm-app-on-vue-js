<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Редактировать</h4>
      </div>

      <form @submit.prevent="submitForm">
        <div class="input-field">
          <select ref="select" v-model="current">
            <option v-for="item in categories" :key="item.id" :value="item.id">{{ item.title }}</option>
          </select>
          <label>Выберите категорию</label>
        </div>

        <div class="input-field">
          <input
            id="edit-name"
            type="text"
            v-model="title"
            :class="{'invalid': ($v.title.$dirty && !$v.title.required)}"
          />
          <label for="edit-name">Название</label>
          <span
            class="helper-text invalid"
            v-if="($v.title.$dirty && !$v.title.required)"
          >Введите название категории</span>
        </div>

        <div class="input-field">
          <input
            id="edit-limit"
            type="number"
            :class="{'invalid': ($v.limit.$dirty && !$v.limit.minValue)}"
            v-model="limit"
          />
          <label for="edit-limit">Лимит</label>
          <span
            class="helper-text invalid"
            v-if="($v.limit.$dirty && !$v.limit.minValue)"
          >Минимальная величина {{ $v.limit.$params.minValue.min }}</span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          Обновить
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { required, minValue } from 'vuelidate/lib/validators'

export default {
  props: {
    categories: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    select: null,
    title: '',
    limit: 1,
    current: null
  }),
  mounted() {
    this.select = M.FormSelect.init(this.$refs.select)
    M.updateTextFields()
  },
  destroyed() {
    if (this.select && this.select.destroy) {
      this.select.destroy()
    }
  },
  created() {
    const { id, title, limit } = this.categories[0]
    this.current = id
    this.title = title
    this.limit = limit
  },
  validations: {
    title: { required },
    limit: { required, minValue: minValue(500) }
  },
  methods: {
    async submitForm() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      try {
        await this.$store.dispatch('updateCategory', {
          title: this.title,
          limit: this.limit,
          id: this.current
        })
        this.$message('Категория успешно обновлена')

        this.$emit('updated', {
          title: this.title,
          limit: this.limit,
          id: this.current
        })
      } catch (error) { }
    }
  },
  watch: {
    current(id) {
      const { title, limit } = this.categories.find(c => c.id === id)
      this.title = title
      this.limit = limit
    }
  }
}
</script>