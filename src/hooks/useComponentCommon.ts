import { computed } from 'vue'
import { pick } from 'lodash-es'

const useComponentCommon = <T extends {[keys:string]:any}>(props: T, picks:string[]) => {
  const styleProps = computed(() => pick(props, picks))
  const handleClick = () => {
    if (props.url && props.actionType === 'url') {
      window.location.href = props.url
    }
  }

  return {
    styleProps,
    handleClick
  }
}

export default useComponentCommon
