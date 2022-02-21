<template>
  <component :is="tag" class="l-text-component" :style="styleProps" @click="handleClick">
    {{ text }}
  </component>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import useComponentCommon from '../hooks/useComponentCommon'
import { transformToComponentProps, textDefaultProps, textStylePropNames } from '@/defaultProps'

const defaultProps = transformToComponentProps(textDefaultProps)
export default defineComponent({
  name: 'l-text',
  props: {
    tag: {
      type: String,
      default: 'div'
    },
    ...defaultProps
  },
  setup (props) {
    console.log(props)

    const { styleProps, handleClick } = useComponentCommon(props, textStylePropNames)
    return {
      styleProps,
      handleClick
    }
  }
})
</script>

<style lang="less" scoped>
h2.l-text-component,
p.l-text-component {
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
