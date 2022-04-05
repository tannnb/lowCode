import { createStore } from 'vuex';
import templates from './templates';
import user from './user';
import editor from './editor';
export default createStore({
    modules: {
        user,
        templates,
        editor
    }
});
//# sourceMappingURL=index.js.map