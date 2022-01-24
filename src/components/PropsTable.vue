<template>
  <div class="props-table">
    <div v-for="(item, index) in finalProps" :key="index" class="prop-item">
      <span class="label" v-if="item.text">{{ item.text }}</span>
      <component
        v-if="item"
        class="prop-component"
        :is="item.component"
        v-bind="item.extraProps"
        :value="item.value"
      >
        <template v-if="item.options">
          <component
            v-for="(option, key) in item.options"
            :key="key"
            :is="item.subComponent"
            :value="item.value"
          >{{option.text}}</component>
        </template>
      </component>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import { reduce } from 'lodash'
import { TextComponentProps } from '@/defaultProps'
import { mapPropsToForms, PropsToForms } from '@/propsMap'

export default defineComponent({
  name: 'PropsTable',
  props: {
    props: {
      type: Object as PropType<TextComponentProps>,
      required: true
    }
  },
  setup (props) {
    const finalProps = computed(() => {
      return reduce(
        props.props,
        (result, value, key) => {
          // key为string 不能直接从PropsToForms中获取类型，解决方法:将key 断言为TextComponentProps
          // newKey : 'text' | 'fontSize' = keys as keyof xxx  (as理解成作为)
          const newKey = key as keyof TextComponentProps
          const item = mapPropsToForms[newKey]
          if (item) {
            item.value = item.initalTransform ? item.initalTransform(value) : value
            result[newKey] = item
          }
          return result
        },
        {} as Required<PropsToForms>
      )
    })

    return {
      finalProps
    }
  }
})
</script>

<style scoped>
.prop-item {
  display: flex;
  margin-bottom: 10px;
  align-items: center;
}

.label {
  width: 28%;
}
.prop-component {
  width: 70%;
}
</style>
