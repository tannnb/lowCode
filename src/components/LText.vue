<template>
<component :is="tag"  class="l-text-component" :style="styleProps">
  {{text}}
</component>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { pick } from 'lodash-es'

export default defineComponent({
  name: 'l-text',
  props: {
    text: {
      type: String
    },
    fontSize: {
      type: String
    },
    color: {
      type: String
    },
    tag: {
      type: String,
      default: 'div'
    }
  },
  setup (props) {
    console.log(props)
    const styleProps = computed(() => pick(props, ['fontSize', 'color']))
    return {
      styleProps
    }
  }
})
</script>

<style lang="less" scoped>
h2.l-text-component, p.l-text-component {
  margin-bottom: 0;
}
button.l-text-component {
  padding: 5px 10px;
  cursor: pointer;
}
.l-text-component {
  box-sizing: border-box;
  white-space: pre-wrap;
  position: relative !important;
}
</style>
