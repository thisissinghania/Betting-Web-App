export const actions = {
    async apiCall({ commit }, data) {
        return await this.$axios.$get("/consensus/" + data)
            .then(response => {
                return response;
            });
    },
    async detailsApiCall({ commit }, data) {
        return await this.$axios.$get(`/consensus-detail/${data.league}/${data.homeTeam}/${data.awayTeam}/${data.type}`)
            .then(response => {
                return response;
            }).catch(exception => {
                return exception.response.data;
            });
    },
};