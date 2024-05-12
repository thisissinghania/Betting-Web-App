export const state = () => ({
    picks: [],
    picksMeta: []
});

export const getters = {
    getPicks(state) {
        return state.picks;
    },
    getPicksMeta(state) {
        return state.picksMeta;
    }
};

export const actions = {
    async apiCall({ commit }, payload) {
        return await this.$axios.$get("/article/" + payload.league + "/trends")
            .then(response => {
                commit("setPicks", response.data);
                commit("setPicksMeta", response.meta);

                return response;
            });
    },
    async detailsApiCall({ commit }, data) {
        return await this.$axios.$get(`/article/${data.league}/trends/${data.awayTeam}/${data.homeTeam}`)
            .then(response => {
                return response;
            });
    },
};

export const mutations = {
    setPicks(state, picks) {
        state.picks = picks;
    },
    setPicksMeta(state, picksMeta) {
        state.picksMeta = picksMeta;
    },
};