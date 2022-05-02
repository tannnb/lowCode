import { mount, VueWrapper } from '@vue/test-utils'
import ColorPicker from '@/components/ColorPicker.vue'
const defaultColors = ['#ffffff', '#f5222d', '#fa541c', '#fadb14', '#52c41a', '#1890ff', '#722ed1', '#8c8c8c', '#000000', '']
let wrapper:VueWrapper<any>

describe('测试ColorPicker组件', () => {
  beforeAll(() => {
    wrapper = mount(ColorPicker, {
      props: {
        value: '#ffffff'
      }
    })
  })
  it('测试ColorPicker结构', () => {
    // <div><input></div>
    // <ul class="picked-color-list">
    //   <li class="item-0" or class="transparent-back">
    //     <div></div>
    //   </li>
    // </ul>
    // 判断左侧是否为input，类型和值是否正确
    expect(wrapper.find('input').exists()).toBeTruthy()
    const input = wrapper.get('input').element
    expect(input.type).toBe('color')
    expect(input.value).toBe('#ffffff')
    // 测试右侧是否有颜色的列表
    expect(wrapper.findAll('.picked-color-list li').length).toBe(defaultColors.length)
    // 检查一个元素的 css backgroundColor属性是否相等对应的颜色
    const firstItem = wrapper.get('.li:first-child div').element as HTMLElement
    expect(firstItem.style.backgroundColor).toBe(defaultColors[0])
    // 测试最后一个元素是否有特殊的类名 - 透明
    const lastItem = wrapper.get('.li:last-child div').element as HTMLElement
    expect(lastItem.classList.contains('transparent-back')).toBeTruthy()
  })

  it('测试Input派发change事件', async () => {
    const blackHex = '#000000'
    const input = wrapper.get('input')
    await input.setValue(blackHex)
    // 是否派发的emit='change'事件
    expect(wrapper.emitted()).toHaveProperty('change')
    const events = wrapper.emitted('change')
    if (events) {
      expect(events[0]).toEqual([blackHex])
    }
  })

  it('测试右侧色块点击事件触发事件', async () => {
    const firstItem = wrapper.get('li:first-child div')
    await firstItem.trigger('click')
    const events = wrapper.emitted('change')
    if (events) {
      expect(events[1]).toEqual([defaultColors[0]])
    }
  })
})
