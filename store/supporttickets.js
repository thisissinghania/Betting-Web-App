export const strict = false

export const state = () => ({
  pageSize: 30,
  currentPage: 1,
  totalRecords: 0,
  totalPages: 0,
  data: [],
});


export const getters = {
  totalCount(state) {
    return state.totalRecords;
  },
  totalPages(state) {
    return state.totalPages
  },
  currentData(state) {
    return state.data;
  },
}

export const mutations = {
  setCurrentPage(state, newPage) {
    state.currentPage = parseInt(newPage);
  },
  setTotalRecords(state, count) {
    state.totalRecords = count;
  },
  setTtalPages(state, pages) {
    state.totalPages = pages;
  },
  setData(state, records) {
    state.data = records;
  },
  setReloadPage(state, page) {
    window.location.href = "/support-ticket?page=" + page;
  }
}

export const actions = {
  async fetchSupportTickets({ commit, state, dispatch }) {
    await this.$axios.$get("support-ticket/?status=closed&page=" + state.currentPage)
      .then(response => {
        commit("setTotalRecords", response.data.totalRecords);
        commit("setTtalPages", response.data.totalPages);
        commit("setData", response.data.records);
        if (response.data.totalPages < state.currentPage) commit("setCurrentPage", response.data.totalPages);
      });
  },

  // async apiPicksDetail({ commit }, data) {
  //   return await this.$axios
  //     .$post("/picks/detail", data)
  //     .then((response) => {
  //         return response;
  //     }).catch(error => {
  //         return error.response.data;
  //     });
  // },
  async setPage(context, newPage) {
    if (newPage >= 1) {
      await context.commit("setCurrentPage", newPage);
    }
  },
}
