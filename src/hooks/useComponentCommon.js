import { computed } from 'vue';
import { pick } from 'lodash-es';
const useComponentCommon = (props, picks) => {
    const styleProps = computed(() => pick(props, picks));
    const handleClick = () => {
        if (props.url && props.actionType === 'url') {
            window.location.href = props.url;
        }
    };
    return {
        styleProps,
        handleClick
    };
};
export default useComponentCommon;
//# sourceMappingURL=useComponentCommon.js.map