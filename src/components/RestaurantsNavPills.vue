<template>
  <ul class="nav nav-pills mb-4">
    <li class="nav-item">
      <router-link to="/restaurants" class="nav-link"> 全部 </router-link>
    </li>

    <li v-for="category in categories" :key="category.id" class="nav-item">
      <router-link
        :to="{
          name: 'restaurants',
          query: {
            categoryId: category.id,
          },
        }"
        class="nav-link"
      >
        {{ category.name }}
      </router-link>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    categories: {
      type: Array,
      required: true,
    },
  },
};
</script>
