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

const testData:ComponentData[] = [
  { id: uuidv4(), name: 'a-input', props: { text: 'hello' } }
]

const editor: Module<EditorProps, GlobalDataProps> = {
  state: {
    components: testData,
    currentElement: ''
  },
  mutations: {}
}

export default editor
