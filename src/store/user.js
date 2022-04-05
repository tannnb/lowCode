const user = {
    state: {
        userName: '',
        isLogin: false
    },
    mutations: {
        login(state) {
            state.isLogin = true;
            state.userName = '法外狂徒-张三';
        },
        logout(state) {
            state.isLogin = false;
        }
    }
};
export default user;
//# sourceMappingURL=user.js.map