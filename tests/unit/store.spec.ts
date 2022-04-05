import store from '@/store/index'
import { testData } from '@/store/templates'
import { testComponents, ComponentData } from '@/store/editor'
import { clone, last } from 'lodash-es'
const cloneComponents = clone(testComponents)

describe('测试vuex store', () => {
  it('测试加载user模块加载', () => {
    expect(store.state).toHaveProperty('user')
  })
  it('测试加载templates模块加载', () => {
    expect(store.state).toHaveProperty('templates')
  })
  it('测试加载editor模块加载', () => {
    expect(store.state).toHaveProperty('editor')
  })

  describe('测试user模块', () => {
    it('测试 login mutation', () => {
      store.commit('login')
      expect(store.state.user.isLogin).toBeTruthy()
    })
    it('测试 logout mutation', () => {
      store.commit('logout')
      expect(store.state.user.isLogin).toBeFalsy()
    })
  })

  describe('测试 templates 模块', () => {
    it('templates默认数据长度', () => {
      expect(store.state.templates.data).toHaveLength(testData.length)
    })
    it('测试template第一个标题', () => {
      const selectTemplate = store.getters.getTemplateById(1)
      expect(selectTemplate.title).toBe('test title 1')
    })
  })

  describe('测试 editor 模块', () => {
    it('测试组件数据是否正确', () => {
      expect(store.state.editor.components).toHaveLength(cloneComponents.length)
    })
    it('测试设置组件点击高亮情况', () => {
      store.commit('setActive', cloneComponents[0].id)
      expect(store.state.editor.currentElement).toBe(cloneComponents[0].id)
      const currentElement = store.getters.getCurrentElement
      expect(currentElement.id).toBe(cloneComponents[0].id)
    })
    it('测试添加组件到画布中', () => {
      const payload: ComponentData = {
        name: 'l-text',
        id: '1234',
        props: {
          text: 'text1'
        }
      }
      store.commit('addComponent', payload)
      expect(store.state.editor.components).toHaveLength(cloneComponents.length + 1)

      const lastItem = last(store.state.editor.components)
      expect(lastItem?.props.text).toBe('text1')
    })
    it('测试组件更新数据', () => {
      const newProps = {
        key: 'text',
        value: 'update'
      }
      store.commit('updateComponent', newProps)
      const currentElement: ComponentData = store.getters.getCurrentElement
      expect(currentElement.props.text).toBe('update')
    })
  })
})
