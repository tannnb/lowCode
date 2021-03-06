<template>
  <div class="props-table">
    <div v-for="(item, index) in finalProps" :key="index" class="prop-item">
      <span class="label" v-if="item.text">{{ item.text }}</span>
      <component
        class="prop-component"
        :is="item.component"
        :[item.valueProp]="item.value"
        v-if="item"
        v-bind="item.extraProps"
        v-on="item.events"
      >
        <template v-if="item.options">
          <component
            v-for="(option, key) in item.options"
            :key="key"
            :is="item.subComponent"
            :value="option.value"
            >
            <RenderVnode :vNode='option.text'></RenderVnode>
            </component
          >
        </template>
      </component>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, VNode } from 'vue'
import { reduce } from 'lodash'
import { TextComponentProps } from '@/defaultProps'
import { mapPropsToForms } from '@/propsMap'
import RenderVnode from '@/components/RenderVnode'
import ColorPicker from '@/components/ColorPicker.vue'

interface FormProps {
  text?: string;
  value?: string;
  component: string;
  subComponent?: string;
  extraProps?: { [key: string]: any };
  options?: { value: any; text: string | VNode }[];
  valueProp?: string;
  eventName: string;
  events: { [key: string]: (e: any) => void };
}
export default defineComponent({
  name: 'PropsTable',
  props: {
    props: {
      type: Object as PropType<TextComponentProps>,
      required: true
    }
  },
  components: {
    RenderVnode,
    ColorPicker
  },
  emits: ['change'],
  setup (props, content) {
    console.log('props', props)
    const finalProps = computed(() => {
      return reduce(
        props.props,
        (result, value, key) => {
          // key为string 不能直接从PropsToForms中获取类型，解决方法:将key 断言为TextComponentProps
          // newKey : 'text' | 'fontSize' = keys as keyof xxx  (as理解成作为)
          const newKey = key as keyof TextComponentProps
          const item = mapPropsToForms[newKey]
          if (item) {
            const {
              valueProp = 'value',
              eventName = 'change',
              initalTransform,
              afterTransform
            } = item
            const newItem: FormProps = {
              ...item,
              value: initalTransform ? initalTransform(value) : value,
              valueProp,
              eventName,
              events: {
                [eventName]: (e: any) => {
                  content.emit('change', { key, value: afterTransform ? afterTransform(e) : e })
                }
              }
            }
            result[newKey] = newItem
          }
          return result
        },
        {} as { [key: string]: FormProps }
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
