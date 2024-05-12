export const state = () => ({
    video: {},
    meta: {}
})
export const getters = {
    getVideo(state) {
        return state.video;
    },
    getMeta(state) {
        return state.meta;
    }

}
export const actions = {
    async fetchVideo({ commit }) {
        await this.$axios.$get("/youtube-videos")
            .then(response => {
                commit("setVideo", response?.data);
                commit("setMeta", response?.meta);
            });
    },
}
export const mutations = {
    setVideo(state, video) {
        state.video = video || {};
    },
    setMeta(state, meta) {
        state.meta = meta || {};
    }
}