import { Module } from 'vuex'
import { GlobalDataProps } from '@/store/index'

export interface UserProps {
  isLogin: boolean;
  userName?: string
}

const user: Module<UserProps, GlobalDataProps> = {
  state: {
    userName: '',
    isLogin: false
  },
  mutations: {
    login (state) {
      state.isLogin = true
      state.userName = '法外狂徒-张三'
    },
    logout (state) {
      state.isLogin = false
    }
  }
}

export default user
