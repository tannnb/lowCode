import { Module } from 'vuex'
import { GlobalDataProps } from '@/store/index'
import { v4 as uuidv4 } from 'uuid'

interface ComponentData {
  props: { [key: string]: any };
  id: string;
  name: string
}

export interface EditorProps {
  components: ComponentData[];
  currentElement?: string
}

const testData: ComponentData[] = [
  { id: uuidv4(), name: 'l-text', props: { text: 'hello', fontSize: '20px', color: 'red' } },
  { id: uuidv4(), name: 'l-text', props: { text: 'hello123', fontSize: '28px' } }
]

const editor: Module<EditorProps, GlobalDataProps> = {
  state: {
    components: testData,
    currentElement: ''
  },
  mutations: {}
}

export default editor
