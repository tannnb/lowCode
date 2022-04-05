import { Module } from 'vuex'
import { GlobalDataProps } from '@/store/index'

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

export const testData: TemplateProps[] = [
  {
    id: 1,
    coverImg: 'https://static.imooc-lego.com/upload-files/screenshot-889755.png',
    title: 'test title 1',
    author: '测试用户',
    copiedCount: 1
  }
]

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
