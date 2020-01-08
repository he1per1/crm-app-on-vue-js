<template>
  <ul class="sidenav app-sidenav" :class="{open: value}">
    <router-link
      tag="li"
      v-for="item of links"
      :key="item.title"
      active-class="active"
      exact
      :to="item.url"
    >
      <a href="#" class="waves-effect waves-orange pointer">{{ item.title }}</a>
    </router-link>
  </ul>
</template>

<script>
export default {
  props: ['value'],
  data: () => ({
    links: [
      { title: 'Счет', url: '/' },
      { title: 'История', url: '/history' },
      { title: 'Планирование', url: '/planning' },
      { title: 'Новая запись', url: '/record' },
      { title: 'Категории', url: '/categories' }
    ]
  })
}
</script>