export const strict = false

export const state = () => ({
  data: [],
  pageSize: 30,
  myPicks: {
    records: {}
  },
  currentPage: 1,
  selectedPick: {},
  metaData: {
    title: '',
    description: ''
  }
});

export const getters = {
  totalCount(state) {
    return state.myPicks.totalRecords
  },
  totalPages(state) {
    return state.myPicks.totalPages
  },
  currentData(state) {
    return state.myPicks.records
  },
  getMetaData(state) {
    return state.metaData
  }
}

export const actions = {
  async apiChallangePicks({ commit }, data) {
    let url = "picks/challenge-picks/" + data.type + "/" + data.page;
    
    if (typeof data.username !== 'undefined') {
      url = url + "/" + data.username
    }

    return await this.$axios.$get(url)
      .then(response => {
        commit("setCurrentPage", response.data.currentPage);
        commit("setMyPicks", response.data);
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
  async apiForFit({ commit }, data) {
    return await this.$axios
      .$post("/picks/forfeit", data)
      .then((response) => {
        return response;
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
  setMyPicks(state, myPicks) {
    state.myPicks = myPicks;
  },
  setMetaData(state, metaData) {
    state.metaData = metaData;
  },
}