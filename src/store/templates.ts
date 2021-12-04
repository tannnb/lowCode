import { Module } from 'vuex'
import { GlobalDataProps } from '@/store/index'

const testData = [
  {
    id: 1,
    title: '测试',
    author: '化石',
    copiedCount: 100,
    coverImg: 'https://img1.baidu.com/it/u=1138353382,2851748851&fm=26&fmt=auto'
  }
]

export interface TemplateProps {
  id: number;
  title: string;
  coverImg: string;
  author: string;
  copiedCount: number
}

export interface TemplatesProps {
  data: TemplateProps[]
}

const templates: Module<TemplatesProps, GlobalDataProps> = {
  state: {
    data: testData
  },
  getters: {
    getTemplateById: (state) => (id: number) => {
      return state.data.find(template => template.id === Number(id))
    }
  }
}

export default templates
