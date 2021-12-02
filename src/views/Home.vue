<template>
  <div class="home-container">
    <a-layout :style="{background:'#fff'}">
      <a-layout-header class="header">
         <div class="page-title">标题</div>
      </a-layout-header>
      <a-layout-content class="home-layout">
        <div class="content-container">
          <template-list />
        </div>
      </a-layout-content>
      <a-layout-footer>
        @copyright
      </a-layout-footer>
    </a-layout>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import TemplateList from '../components/TemplateList.vue'

export default defineComponent({
  name: 'Home',
  components: {
    TemplateList
  }
})
</script>

<style lang="less" scoped>
.home-container{
  .header{}
  .home-layout{}
  .header{}
}
</style>
