export const state = () => ({
    profile: {}
});

export const getters = {
    getProfile(state) {
        return state.profile;
    }
};

export const actions = {
    async apiCall({ commit }) {
        await this.$axios.$get("/user/profile")
            .then(response => {
                commit("setProfile", response);
            });
    },
};

export const mutations = {
    setProfile(state, profile) {
        state.profile = profile;
    },
};