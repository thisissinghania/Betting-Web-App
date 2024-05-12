export const strict = false

export const state = () => ({
  pageSize: 30,
  currentPage: 1,
  winners: {
    records: {}
  },
  metaData: {
    title: '',
    description: ''
  },
});


export const getters = {
  totalCount(state) {
    return state.winners.totalRecords
  },
  totalPages(state) {
    return state.winners.totalPages
  },
  currentData(state) {
    return state.winners.records
  },
  allData(state) {
    return state.winners
  },
  getMetaData(state) {
    return state.metaData
  },
}

export const actions = {
  async apiWinners({ commit }, data) {
    await this.$axios.$get("/winner/" + data.page)
      .then(response => {
        commit("setCurrentPage", response.data.currentPage);
        commit("setWinners", response.data);
        commit("setMetaData", response.meta);
      });
  },
  async setPage(context, newPage) {
    if (newPage >= 1 && newPage <= context.getters.totalPages) {
      await context.commit("setCurrentPage", newPage);
    }
  },
}

export const mutations = {
  setCurrentPage(state, newPage) {
    state.currentPage = parseInt(newPage);
  },
  setWinners(state, winners) {
    state.winners = winners;
  },
  setMetaData(state, metaData) {
    state.metaData = metaData;
  },
}