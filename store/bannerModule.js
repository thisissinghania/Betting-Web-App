export const state = () => ({
    allBanner: []
});

export const getters = {
    getAllBanner(state) {
        return state.allBanner;
    },
};

export const actions = {
    async apiCall({ commit }) {
        await this.$axios.$get("/getBanners")
            .then(response => {
                commit("setAllBanner", response.data);
            });
    },
};

export const mutations = {
    setAllBanner(state, allBanner) {
        state.allBanner = allBanner;
    },
};