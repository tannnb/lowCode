import { shallowMount, mount } from '@vue/test-utils'
import HelloWorld from '@/components/HelloWorld.vue'
import Hello from '@/components/Hello.vue'

// mount和shallowMount区别
// mount 会全部渲染出来
// shallowMount 只渲染组件本身，外来的子组件都不渲染(更合适单元测试)

// get和find使用与区别
// wrapper.get('h1').text() || wrapper.find('h1')
// 找不到的时候，find返回的null,case不会出错，get则是抛出错误throw
// 使用准则：总是使用get，除了想判断一些元素不存在的时候，这种情况下使用find

// 使用getComponent的意义
// 不必须测试子组件里面的内容，只要判断知否渲染了子组件，是否传递了正确的属性就可以了
describe('HelloWorld.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = '这是新传入的信息'
    const wrapper = shallowMount(HelloWorld, {
      props: { msg }
    })
    // console.log(wrapper.get('h1').text())
    // expect(wrapper.text()).toMatch(msg)
    console.log(wrapper.findAllComponents(Hello))
  })
})
