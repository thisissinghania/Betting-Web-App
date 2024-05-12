export const strict = false

export const state = () => ({
  data: [],
  pageSize: 30,
  balance: {
    records: {}
  },
  currentPage: 1,
  selectedPick: {},
  metaData: {
    title: '',
    description: ''
  },
  blueBar: {}
});

export const getters = {
  totalCount(state) {
    return state.balance.totalRecords
  },
  totalPages(state) {
    return state.balance.totalPages
  },
  currentData(state) {
    return state.balance.records
  },
  getMetaData(state) {
    return state.metaData
  },
  blueBarData(state) {
    return state.blueBar;
  }
}

export const actions = {
  async apiBalance({ commit }, data) {
    let url = "/user/balance/" + data.page;
    
    if (typeof data.username !== 'undefined') {
      url = url + "/" + data.username
    }
    return await this.$axios.$get(url)
      .then(response => {
        commit("setCurrentPage", response.data.currentPage);
        commit("setBalance", response.data);
        commit("setMetaData", response.meta);

        return response;
      }).catch(error => {
        return error.response.data;
      });
  },
  async apiPreviousBalance({ commit }, data) {
    let url = "/user/previous-balance/" + data.page;
    
    if (typeof data.username !== 'undefined') {
      url = url + "/" + data.username
    }

    return await this.$axios.$get(url)
      .then(response => {
        commit("setCurrentPage", response.data.currentPage);
        commit("setBalance", response.data);
        commit("setMetaData", response.meta);

        return response;
      }).catch(error => {
        return error.response.data;
      });
  },
  async apiPicksDetail({ commit }, data) {
    return await this.$axios
      .$post("/picks/detail", data)
      .then((response) => {
        return response;
      }).catch(error => {
        return error.response.data;
      });
  },
  userBalancePoint({ commit }) {
    return this.$axios
      .$get("/user/user-balance-point")
      .then((response) => {
        commit("setBlueBarData", response.data);
      }).catch(error => {
        return error.response.data;
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
  setBalance(state, balance) {
    state.balance = balance;
  },
  setMetaData(state, metaData) {
    state.metaData = metaData;
  },
  setBlueBarData(state, blueBarData) {
    state.blueBar = blueBarData;
  }
}