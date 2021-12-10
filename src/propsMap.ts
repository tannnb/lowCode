import { TextComponentProps } from '@/defaultProps'

export interface PropToForm {
  component: string;
  value?: string
}

export type PropsToForms = {
  [p in keyof TextComponentProps]?: PropToForm
}

export const mapPropsToForms: PropsToForms = {
  text: {
    component: 'a-input'
  }
}
