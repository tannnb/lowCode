<template>
  <div class="content-container">
    <template-list :list="testData"></template-list>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { GlobalDataProps } from '@/store'
import TemplateList from '../components/TemplateList.vue'

export default defineComponent({
  name: 'Home',
  components: {
    TemplateList
  },
  setup () {
    const store = useStore<GlobalDataProps>()
    const testData = computed(() => store.state.templates.data)

    const router = useRoute()

    return {
      testData,
      router
    }
  }
})
</script>
<style lang="less" scoped>
.content-container {
  background: #fff;
  padding: 0 24px 24px 30px;
  min-height: 85vh;
  max-width: 1200px;
  margin: 50px auto;
  width: 100%;
}
</style>
