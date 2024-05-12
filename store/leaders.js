export const strict = false

export const state = () => ({
  data: [],
  pageSize: 30,
  currentPage: 1,
  metaData: {
    title: '',
    description: ''
  },
  leaders: {
    records: {}
  },
});

export const getters = {
  totalCount(state) {
    return state.leaders.totalRecords
  },
  totalPages(state) {
    return state.leaders.totalPages
  },
  currentData(state) {
    return state.leaders.records
  },
  getMetaData(state) {
    return state.metaData
  },
  async setPage(context, newPage) {
    if (newPage >= 1 && newPage <= context.getters.totalPages) {
      await context.commit("setCurrentPage", newPage);
    }
  },
}

export const actions = {
  async apiLeaders({ commit }, data) {
    await this.$axios.$get("/user/leader/" + data.type + '/' + data.page)
      .then(response => {
        commit("setCurrentPage", response.data.currentPage);
        commit("setLeaders", response.data);
        commit("setMetaData", response.meta);
      });
  },
}

export const mutations = {
  setCurrentPage(state, newPage) {
    state.currentPage = parseInt(newPage);
  },
  setLeaders(state, leaders) {
    state.leaders = leaders;
  },
  setMetaData(state, metaData) {
    state.metaData = metaData;
  },
}