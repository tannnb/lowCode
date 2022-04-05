const testData = [
    {
        id: 1,
        coverImg: 'https://static.imooc-lego.com/upload-files/screenshot-889755.png',
        title: 'test title 1',
        author: '测试用户',
        copiedCount: 1
    }
];
const templates = {
    state: {
        data: testData
    },
    getters: {
        getTemplateById: (state) => (id) => {
            return state.data.find(template => template.id === Number(id));
        }
    }
};
export default templates;
//# sourceMappingURL=templates.js.map