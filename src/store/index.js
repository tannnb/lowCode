import { createStore } from 'vuex'
const testData = [
  {
    id: 1,
    title: '测试',
    author: '化石',
    copiedCount: 100,
    coverImg: 'https://img1.baidu.com/it/u=1138353382,2851748851&fm=26&fmt=auto'
  }
]
export default createStore({
  state: {
    template: testData,
    user: { isLogin: false }
  },
  mutations: {
    login (state) {
      state.user = { ...state.user, isLogin: true, userName: 'tannnb' }
    },
    logout (state) {
      state.user = { ...state.user, isLogin: false, userName: 'tannnb' }
    }
  },
  actions: {},
  modules: {},
  getters: {
    getTemplateById: (state) => (id) => {
      return state.template.find(template => template.id === parseFloat(id))
    }
  }
})
// # sourceMappingURL=index.js.map
