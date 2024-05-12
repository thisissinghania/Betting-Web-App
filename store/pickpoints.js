export const strict = false

export const state = () => ({
  data: [],
  pageSize: 30,
  myPickPoints: {
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
    return state.myPickPoints.totalRecords;
  },
  totalPages(state) {
    return state.myPickPoints.totalPages;
  },
  getMetaData(state) {
    return state.metaData;
  },
  getMyPickPoints(state) {
    return state.myPickPoints.records;
  },
  getMyPickPointsData(state) {
    return state.myPickPoints;
  }
}

export const actions = {
  async setPage(context, newPage) {
    if (newPage >= 1 && newPage <= context.getters.totalPages) {
      await context.commit("setCurrentPage", newPage);
    }
  },
  async apiPickPoints({ commit }, data) {
    let url = "/user/pick-points/" + data.page;
    if (data.routeName === 'my-picks-pick-points-last-week') {
      url =  "/picks/previous/" + data.page;
    }

    if (typeof data.username !== 'undefined') {
      url = url + "/" + data.username
    }

    return await this.$axios.$get(url)
      .then(response => {
        commit("setCurrentPage", response.data.currentPage);
        commit("setMyPicksPoints", response.data);
        commit("setMetaData", response.data.meta);

        return response;
      }).catch(error => {
        return error.response.data;
      });
  },
  async apiPickPointsDetail({ commit }, data) {
    return await this.$axios
      .$post("/picks/pick-point-detail", data)
      .then((response) => {
        return response;
      }).catch(error => {
        return error.response.data;
      });
  },
}

export const mutations = {
  setCurrentPage(state, newPage) {
    state.currentPage = parseInt(newPage);
  },
  setMetaData(state, metaData) {
    state.metaData = metaData;
  },
  setMyPicksPoints(state, myPickPoints) {
    state.myPickPoints = myPickPoints;
  }
}