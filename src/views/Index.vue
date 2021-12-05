<template>
  <div class="home-container">
    <a-layout :style="{background:'#fff'}">
      <a-layout-header class="header">
        <div class="page-title"><router-link to="/">LowCode</router-link></div>
        <user-profile :user="user"></user-profile>
      </a-layout-header>
      <a-layout-content class="home-layout">
        <router-view/>
      </a-layout-content>
      <a-layout-footer>@copyright</a-layout-footer>
    </a-layout>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'
import { GlobalDataProps } from '@/store'
import UserProfile from '../components/UserProfile.vue'

export default defineComponent({
  name: 'Index',
  components: {
    UserProfile
  },
  setup () {
    const store = useStore<GlobalDataProps>()
    const user = computed(() => store.state.user)
    return {
      user
    }
  }
})
</script>

<style lang="less" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .page-title {
    color: #fff;
  }
}
</style>
