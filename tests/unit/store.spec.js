import store from '@/store/index';
describe('测试vuex store', () => {
    it('测试加载3个模块', () => {
        expect(store.state).toHaveProperty('user');
        // expect(store.state).toHaveProperty('templates')
        expect(store.state).toHaveProperty('editor');
    });
});
//# sourceMappingURL=store.spec.js.map