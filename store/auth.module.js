import * as AuthService from "../services/auth.service";

const user = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem("user")) : null;

const initialState = (typeof(user) !== 'undefined' && user !== null)
  ? { loggedIn: false, user }
  : { loggedIn: false, user: null };
export const auth = {
  namespaced: true,
  state: initialState,
  actions: {
    login({ commit }, user) {
      AuthService.login(user);
      commit("loginSuccess", user);
      // return AuthService.login(user).then(
      //   (user) => {
      //     commit("loginSuccess", user);
      //     return Promise.resolve(user);
      //   },
      //   (error) => {
      //     commit("loginFailure");
      //     return Promise.reject(error);
      //   }
      // );
    },
    logout({ commit }) {
      AuthService.logout();
      commit("logout");
    },
    register({ commit }, user) {
      return AuthService.register(user).then(
        (response) => {
          commit("registerSuccess");
          return Promise.resolve(response.data);
        },
        (error) => {
          commit("registerFailure");
          return Promise.reject(error);
        }
      );
    },
  },
  mutations: {
    loginSuccess(state, user) {
      state.loggedIn = true;
      state.user = user;
    },
    loginFailure(state) {
      state.loggedIn = false;
      state.user = null;
    },
    logout(state) {
      state.loggedIn = false;
      state.user = null;
    },
    registerSuccess(state) {
      state.loggedIn = false;
    },
    registerFailure(state) {
      state.loggedIn = false;
    },
  },
};
