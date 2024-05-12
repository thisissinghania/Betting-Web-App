export const getters = {
  isAuthenticated(state) {
    return state.auth.loggedIn
  },

  loggedInUser(state) {
    return state.auth.user
  }
}

export const actions = {
  async nuxtServerInit({ dispatch, state }, { req, $axios }) {
    if (process.server) {
      $axios.onRequest((config) => {
        config.headers.Origin = req.headers.host;
      });
    }
    const myRequests =
      [
        dispatch('default/general'),
        dispatch("default/getclient")
      ];
    if (state.auth.loggedIn) {
      myRequests.push(dispatch("default/fetchChatLink"));
      myRequests.push(dispatch("default/fetchRewards"));
    }

    await Promise.all(
      myRequests
    )
  }
}