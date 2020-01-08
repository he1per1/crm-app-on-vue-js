<template>
  <table>
    <thead>
      <tr>
        <th>#</th>
        <th>Сумма</th>
        <th>Дата</th>
        <th>Категория</th>
        <th>Тип</th>
        <th>Открыть</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="(item, index) in records" :key="item.id">
        <td>{{ index + 1 }}</td>
        <td>{{ item.amount | currency }}</td>
        <td>{{ item.date | date('datetime') }}</td>
        <td>{{ item.categoryName }}</td>
        <td>
          <span class="white-text badge" :class="item.typeClass">{{ item.typeText }}</span>
        </td>
        <td>
          <router-link class="btn-small btn" tag="button" :to="`/detail-record/${item.id}`" v-tooltipe="'Открыть'">
            <i class="material-icons">open_in_new</i>
          </router-link>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    records: {
      required: true,
      type: Array
    }
  }
}
</script>