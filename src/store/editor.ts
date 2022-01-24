import { Module } from 'vuex'
import { GlobalDataProps } from '@/store/index'
import { v4 as uuidv4 } from 'uuid'
import { TextComponentProps } from '@/defaultProps'

export interface ComponentData {
  props: { [key: string]: any };
  id: string;
  name: string
}

export interface EditorProps {
  components: ComponentData[];
  currentElement?: string
}

const testData: ComponentData[] = [
  { id: uuidv4(), name: 'l-text', props: { text: 'hellso', fontSize: '20px', color: 'red', lineHeight: '1', textAlign: 'left', fontFamily: '' } },
  { id: uuidv4(), name: 'l-text', props: { text: 'hello123', fontSize: '28px', actionType: 'url', url: 'https://www.baidu.com' } }
]

const editor: Module<EditorProps, GlobalDataProps> = {
  state: {
    components: testData,
    currentElement: ''
  },
  mutations: {
    addComponent (state, props:Partial<TextComponentProps>) {
      const newComponent:ComponentData = {
        id: uuidv4(),
        name: 'l-text',
        props
      }
      state.components.push(newComponent)
    },
    setActive (state, currentId:string) {
      state.currentElement = currentId
    }
  },
  getters: {
    getCurrentElement (state) {
      return state.components.find(component => component.id === state.currentElement)
    }
  }
}

export default editor
