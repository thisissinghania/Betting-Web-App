export const strict = false

export const state = () => ({
  data: [],
  pageSize: 30,
  currentPage: 1,
  scores: {
    records: {}
  },
  metaData: {
    title: '',
    description: ''
  }
});


export const getters = {
  totalCount(state){
    return state.scores.totalRecords
  },
  totalPages(state){
   return state.scores.totalPages
  },
  currentData(state) {
    return state.scores.records
  },
  getMetaData(state) {
    return state.metaData
  }
}

export const actions = {
  async apiCall({ commit }, data) {
      await this.$axios.$get("/scores/" + data.league + "/" + data.type + "/" + data.page)
          .then(response => {
              commit("setCurrentPage", response.data.currentPage);
              commit("setScores", response.data);
              commit("setMetaData", response.data.meta);
          });
  },
  async setPage(context, newPage) {
    if (newPage >= 1 && newPage <= context.getters.totalPages) {
      await context.commit("setCurrentPage", newPage);
    }
  },
};

export const mutations = {
  setCurrentPage(state, newPage) {
    state.currentPage = parseInt(newPage);
  },
  setScores(state, scores) {
    state.scores = scores;
  },
  setMetaData(state, metaData) {
    state.metaData = metaData;
  },
}