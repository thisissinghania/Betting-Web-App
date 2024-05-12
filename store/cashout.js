export const state = () => ({
    cashkout: {}
});

export const getters = {
    getCashoutDetails(state) {
        return state.cashout;
    }
};

export const actions = {
    async apiCall({ commit }, payload) {
        return await this.$axios
            .$post("/cash-out/check-user-applicable", payload)
            .then((response) => {
                commit("setCashoutDetails", response.data);
                
                return response;
            }).catch(error => {
                return error.response.data;
            });
    },
    async generateCashoutAmount({ commit }, payload) {
        return await this.$axios
            .$post("/cash-out/generate-cash-out-amount", payload)
            .then((response) => {
                return response;
            }).catch(error => {
                return error.response.data;
            });
    },
    async getCashoutDetail({ commit }, cashoutId) {
        return await this.$axios.$get("/cash-out/" + cashoutId)
            .then((response) => {
                return response;
            }).catch(error => {
                return error.response.data;
            });
    },
};

export const mutations = {
    setCashoutDetails(state, cashout) {
        state.cashout = cashout;
    },
};