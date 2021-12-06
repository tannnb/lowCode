<template>
  <div class="create-component-list">
    <div v-for="(item,index) in list " :key="index" class="component-item" @click="onItemClick(item)">
      <l-text v-bind="item"></l-text>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import LText from '@/components/LText.vue'
import { TextComponentProps } from '@/defaultProps'

export default defineComponent({
  name: 'ComponentsList',
  components: {
    LText
  },
  props: {
    list: {
      type: Array,
      required: true
    }
  },
  emits: ['on-item-click'],
  setup (props, context) {
    const onItemClick = (data: TextComponentProps) => {
      context.emit('on-item-click', data)
    }
    return {
      onItemClick
    }
  }
})
</script>

<style lang="less" scoped>
.component-item {
  width: 100px;
  margin: 0 auto 15px auto;
}
</style>
