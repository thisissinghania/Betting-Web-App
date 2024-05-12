export const state = () => ({
    picks: [],
    picksMeta: [],
    lineOptions: [],
    pickToken: '',
    lineDetails: [],
    metaData: {
        title: '',
        description: ''
    }
});

export const getters = {
    getPicks(state) {
        return state.picks;
    },
    getPicksMeta(state) {
        return state.picksMeta;
    },
    getLineOption(state) {
        return state.lineOptions;
    },
    getPickToken(state) {
        return state.pickToken;
    },
    getLineDetails(state) {
        return state.lineDetails;
    },
    getMetaData(state) {
        return state.metaData
    }
};

export const actions = {
    async getList({ commit }, payload) {
        return await this.$axios.$get("/line/get/" + payload.league + '/' + payload.type)
            .then(response => {
                commit("setPicks", response.data);
                commit("setPicksMeta", response.meta);

                return response;
            }).catch(exception => {
                return exception.response;
            });
    },
    async checkLineType({ commit }, payload) {
        return await this.$axios
            .$post("/line/check-line-option", { line_id: payload.lineId, lineType: payload.lineType })
            .then((response) => {
                if (typeof response.data.pickOption !== 'undefined') {
                    commit("setLineOption", response.data.pickOption);
                }

                if (typeof response.data.token !== 'undefined') {
                    commit("setPickToken", response.data.token)
                }

                return response; 
            }).catch(error => {
                return error.response.data;
            });
    },
    async lineDetail({ commit }, payload) {
        return await this.$axios
            .$post("/line/detail", payload)
            .then((response) => {
                commit("setLineDetails", response.data);
                commit("setMetaData", response.meta);

                return response.data;
            }).catch(error => {
                return error.response.data;
            });
    },
    async makePick({ commit }, payload) {
        return await this.$axios
            .$post("/picks/make", payload)
            .then((response) => {
                return response;
            }).catch(error => {
                return error.response.data;
            });
    },
    async getConfirmedPick({ commit }, pickId) {
        return await this.$axios.$get("/picks/" + pickId)
            .then((response) => {
                return response;
            }).catch(error => {
                return error.response.data;
            });
    },
    async getWinAmount({ commit }, payload) {
        return await this.$axios
            .$post("/picks/generateWinAmount", payload)
            .then((response) => {
                return response;
            }).catch(error => {
                return error.response.data;
            });
    },
    async getPitcher({ commit }, payload) {
        return await this.$axios
            .$post("/line/get-pitcher", payload)
            .then((response) => {
                return response;
            }).catch(error => {
                return error.response.data;
            });
    },
    async errorReporting({ commit }, payload) {
        return await this.$axios
            .$post("/pick/errors", payload)
            .then((response) => {
                return response;
            }).catch(error => {
                return error.response.data;
            });
    }
};

export const mutations = {
    setPicks(state, picks) {
        state.picks = picks;
    },
    setPicksMeta(state, picksMeta) {
        state.picksMeta = picksMeta;
    },
    setLineOption(state, lineOptions) {
        state.lineOptions = lineOptions;
    },
    setPickToken(state, pickToken) {
        state.pickToken = pickToken;
    },
    setLineDetails(state, lineDetails) {
        state.lineDetails = lineDetails;
    },
    setMetaData(state, metaData) {
        state.metaData = metaData;
    },
};
