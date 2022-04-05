import { v4 as uuidv4 } from 'uuid';
const testData = [
    { id: uuidv4(), name: 'l-text', props: { text: 'hellso', fontSize: '20px', color: 'red', lineHeight: '1', textAlign: 'left', fontFamily: '' } },
    { id: uuidv4(), name: 'l-text', props: { text: 'hello123', fontSize: '28px', actionType: 'url', url: 'https://www.baidu.com' } }
];
const editor = {
    state: {
        components: testData,
        currentElement: ''
    },
    mutations: {
        addComponent(state, props) {
            const newComponent = {
                id: uuidv4(),
                name: 'l-text',
                props
            };
            state.components.push(newComponent);
        },
        setActive(state, currentId) {
            state.currentElement = currentId;
        },
        updateComponent(state, { key, value }) {
            const updateComponent = state.components.find(component => component.id === state.currentElement);
            if (updateComponent) {
                updateComponent.props[key] = value;
            }
        }
    },
    getters: {
        getCurrentElement(state) {
            return state.components.find(component => component.id === state.currentElement);
        }
    }
};
export default editor;
//# sourceMappingURL=editor.js.map