<template>
  <div class="editor-container">
    <a-layout>
      <a-layout-sider width="300" style="background: #fff">
        <div class="sidebar-container">
          组件列表
          <components-list :list="defaultTextTemplates" @onItemClick="addItem"/>
        </div>
      </a-layout-sider>
      <a-layout style="padding: 0 24px 24px">
        <a-layout-content class="preview-container">
          <p>画布区域</p>
          <div class="preview-list" id="canvas-area">
            <edit-wrapper v-for="component in components"
                          :id="component.id"
                          :key="component.id"
                          :active="component.id === ( currentElement && currentElement.id)"
                          @setActive="setActive">
              <component :is="component.name" v-bind="component.props"/>
            </edit-wrapper>
          </div>
        </a-layout-content>
      </a-layout>
      <a-layout-sider width="300" style="background: #fff" class="settings-panel">
        组件属性
        <props-table
        @change="handleChange"
         v-if="currentElement && currentElement.props" :props="currentElement.props" />
      </a-layout-sider>
    </a-layout>
  </div>
</template>

<script lang="ts">
import { useStore } from 'vuex'
import { GlobalDataProps } from '@/store'
import { ComponentData } from '@/store/editor'
import { computed, defineComponent } from 'vue'

import { defaultTextTemplates } from '@/defaultTemplates'
import { TextComponentProps } from '@/defaultProps'

import LText from '@/components/LText.vue'
import PropsTable from '@/components/PropsTable.vue'
import EditWrapper from '@/components/EditWrapper.vue'
import ComponentsList from '@/components/ComponentsList.vue'

export default defineComponent({
  name: 'Editor',
  components: {
    LText,
    PropsTable,
    EditWrapper,
    ComponentsList
  },
  setup () {
    const store = useStore<GlobalDataProps>()

    const components = computed(() => store.state.editor.components)
    const currentElement = computed<ComponentData | null>(() => store.getters.getCurrentElement)

    const addItem = (component: TextComponentProps) => {
      store.commit('addComponent', component)
    }
    const setActive = (id: string) => {
      store.commit('setActive', id)
    }
    const handleChange = (e:any) => {
      store.commit('updateComponent', e)
    }
    return {
      components,
      addItem,
      setActive,
      currentElement,
      handleChange,
      defaultTextTemplates
    }
  }
})
</script>

<style lang="less" scoped>
.editor-container {
  .preview-container {
    padding: 24px;
    margin: 0;
    height: 95vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
  }

  .preview-list {
    padding: 0;
    margin: 50px 0 0 0;
    min-width: 375px;
    min-height: 200px;
    border: 1px solid #efefef;
    background: #fff;
    overflow-x: hidden;
    overflow-y: auto;
    position: fixed;
    max-height: 80vh;
  }
}
</style>
