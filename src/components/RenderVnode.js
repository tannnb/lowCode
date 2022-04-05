import { defineComponent } from 'vue';
const RenderVnode = defineComponent({
    props: {
        vNode: {
            type: [Object, String],
            required: true
        }
    },
    render() {
        return this.vNode;
    }
});
export default RenderVnode;
//# sourceMappingURL=RenderVnode.js.map