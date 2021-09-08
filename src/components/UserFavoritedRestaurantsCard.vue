<template>
  <div class="card">
    <div class="card-header"><strong></strong> 收藏的餐廳</div>
    <div class="card-body">
      <router-link
        v-for="favorited in favoritedRestaurants"
        :key="favorited.id"
        :to="{ name: 'restaurant', params: { id: favorited.id } }"
      >
        <img :src="favorited.image" width="60" height="60" class="avatar m-1" />
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    favoritedRestaurants: {
      type: Array,
      required: true,
    },
  },
};
</script>
