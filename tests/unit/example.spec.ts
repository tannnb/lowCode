import { shallowMount, mount, flushPromises, VueWrapper } from '@vue/test-utils'
import HelloWorld from '@/components/HelloWorld.vue'
import Hello from '@/components/Hello.vue'
import axios from 'axios'
import { wrap } from 'lodash-es'
jest.mock('axios')
const mockAxios = axios as jest.Mocked<typeof axios>
// mount和shallowMount区别
// mount 会全部渲染出来
// shallowMount 只渲染组件本身，外来的子组件都不渲染(更合适单元测试)

// get和find使用与区别
// wrapper.get('h1').text() || wrapper.find('h1')
// 找不到的时候，find返回的null,case不会出错，get则是抛出错误throw
// 使用准则：总是使用get，除了想判断一些元素不存在的时候，这种情况下使用find

// 使用getComponent的意义
// 不必须测试子组件里面的内容，只要判断知否渲染了子组件，是否传递了正确的属性就可以了

const msg = '这是新传入的信息'
let wrapper:VueWrapper<any>
describe('HelloWorld.vue', () => {
  // 执行测试之前勾子
  beforeAll(() => {
    wrapper = shallowMount(HelloWorld, {
      props: { msg }
    })
  })
  it('测试组件渲染与props数据传递:', () => {
    // console.log(wrapper.get('h1').text())
    console.log(wrapper.findAllComponents(Hello))
  })

  it('测试HelloWorld组件内按钮点击事件:', async () => {
    // trigger为异步,需等到view更新后在断言
    await wrapper.get('button').trigger('click')
    console.log(wrapper.html())
    expect(wrapper.get('button').text()).toBe('101')
  })

  it('测试输入框更改后,点击按钮，渲染时候时候更新:', async () => {
    const todoContent = '找到input元素调用setValue设置值'
    await wrapper.get('input').setValue(todoContent)
    console.log('input当前设置的值:', wrapper.get('input').element.value)

    expect(wrapper.get('input').element.value).toBe(todoContent)
    await wrapper.get('.addTodo').trigger('click')
    expect(wrapper.findAll('li')).toHaveLength(1) // 判断li的长度
    expect(wrapper.get('li').text()).toBe(todoContent) // 判断第一个li的内容是否相等

    // 验证点击按钮之后是否派发的emit='send'事件
    expect(wrapper.emitted()).toHaveProperty('send')
    const event = wrapper.emitted('send') || []
    expect(event[0]).toEqual([todoContent])
  })

  it.only('测试异步请求数据:', async () => {
    // 拦截axios的get请求
    mockAxios.get.mockResolvedValueOnce({ data: { username: '张三' } })
    await wrapper.get('.loadUser').trigger('click')
    expect(mockAxios.get).toHaveBeenCalled() // 判断axios是否被调用了
    expect(wrapper.find('.loading').exists()).toBeTruthy()
    await flushPromises()
    // 界面更新完毕、
    expect(wrapper.find('.loading').exists()).toBeFalsy()
    expect(wrapper.get('.userName').text()).toBe('张三')
  })

  afterEach(() => {
    //  测试用例执行完之后，进行一些处理
  })
})
