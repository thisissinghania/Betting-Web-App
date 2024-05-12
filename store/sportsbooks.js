export const state = () => ({
    sportsbooks: [],
    sportsbooksMeta: []
});

export const getters = {
    getSportsbooks(state) {
        return state.sportsbooks;
    },
    getSportsbooksMeta(state) {
        return state.sportsbooksMeta;
    }
};

export const actions = {
    async apiCall({ commit }) {
        await this.$axios.$get("/sports-books")
            .then(response => {
                commit("setSportsbooks", response.data);
                commit("setSportsbooksMeta", response.meta);
            });
    },
};

export const mutations = {
    setSportsbooks(state, sportsbooks) {
        state.sportsbooks = sportsbooks;
    },
    setSportsbooksMeta(state, sportsbooksMeta) {
        state.sportsbooksMeta = sportsbooksMeta;
    },
};