import { TextComponentProps } from '@/defaultProps'

export interface PropToForm {
  text?: string;
  component: string;
  subComponent?: string;
  extraProps?: { [key: string]: any };
  options?: { value: any; text: string }[];
  initalTransform?: (value: any) => any;
  afterTransform?: (value: any) => any;
  valueProp?: string;
  eventName?: string;
}

export type PropsToForms = {
  [p in keyof TextComponentProps]?: PropToForm;
};

export const mapPropsToForms: PropsToForms = {
  text: {
    text: '文本',
    component: 'a-textarea',
    extraProps: { rows: 3 },
    afterTransform: (e: any) => e.target.value
  },
  fontSize: {
    text: '字号',
    component: 'a-input-number',
    initalTransform: (value) => parseInt(value),
    afterTransform: (e: number) => (e ? `${e}px` : '')
  },
  lineHeight: {
    text: '行高',
    component: 'a-slider',
    extraProps: { min: 0, max: 3, step: 0.1 },
    initalTransform: (value) => parseFloat(value),
    afterTransform: (e: number) => e.toString()
  },
  textAlign: {
    text: '对齐',
    component: 'a-raido-group',
    subComponent: 'a-radio-button',
    options: [
      { value: 'left', text: '左' },
      { value: 'center', text: '中' },
      { value: 'right', text: 'right' }
    ],
    afterTransform: (e: any) => e.target.value
  },
  fontFamily: {
    text: '字体',
    component: 'a-select',
    subComponent: 'a-select-option',
    options: [
      { text: '无', value: '' },
      { text: '宋体', value: '"SimSun","STSong"' },
      { text: '黑体', value: '"SimHei","STHeiti"' },
      { text: '楷体', value: '"KaiTi","STKaiti"' },
      { text: '仿宋', value: '"FangSong","STFangsong"' }
    ]
  }
}
