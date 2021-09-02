<template>
  <div class="card mb-3">
    <div class="row no-gutters">
      <div class="col-md-4">
        <img :src="profile.image" width="300px" height="300px" />
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">{{ profile.name }}</h5>
          <p class="card-text">{{ profile.email }}</p>
          <ul class="list-unstyled list-inline">
            <li>
              <strong>{{ profile.commentsLength }}</strong> 已評論餐廳
            </li>
            <li>
              <strong>{{ profile.favoritedRestaurantsLength }}</strong>
              收藏的餐廳
            </li>
            <li>
              <strong>{{ profile.follwingsLength }}</strong> followings (追蹤者)
            </li>
            <li>
              <strong>{{ profile.followersLength }}</strong> followers (追隨者)
            </li>
          </ul>
          <p></p>
          <template v-if="profile.id === currentUser.id">
            <router-link :to="{ name:'user-edit', params:{ id: profile.id } }">
              <button type="submit" class="btn btn-primary">Edit</button>
            </router-link>
          </template>
          
          <template v-else>
            <button
              v-if="profile.isFollowed"
              type="submit"
              class="btn btn-danger"
              @click.stop.prevent="unfollow"
            >
              取消追蹤
            </button>
            <button
              v-else
              type="submit"
              class="btn btn-primary"
              @click.stop.prevent="follow"
            >
              追蹤
            </button>

          </template>
          <p></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    initialProfile: {
      type: Object,
      required: true,
    },
    currentUser: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      profile: this.initialProfile,
    };
  },
  methods: {
    follow() {
      this.profile = {
        ...this.profile,
        isFollowed: true,
      };
    },
    unfollow() {
      this.profile = {
        ...this.profile,
        isFollowed: false,
      };
    },
  },
};
</script>