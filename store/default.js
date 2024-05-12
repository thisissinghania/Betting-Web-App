export const state = () => ({
    meta: {},
    client: {
        id: '',
        url: '',
        blogOnOff: '',
        siteName: '',
        sharingImage: ''
    },
    typeConfigs: {},
    faqs: {},
    rules: {},
    statics: {},
    iqTypes: {},
    leagues: {},
    computerLeagues: {},
    delayPickButton: '',
    adminPopup: [],
    chatLink: "",
    socialSites: {},
    widgetListing: [],
    widgetTop: [],
    rewards: "",
})

export const getters = {
    getClient(state) {
        return state.client;
    },
    getMeta(state) {
        return state.meta;
    },
    getDepartments(state) {
        return state.departments;
    },
    getFaqs(state) {
        return state.faqs;
    },
    getRules(state) {
        return state.rules;
    },
    getStatics(state) {
        return state.statics;
    },
    getIqTypes(state) {
        return state.iqTypes;
    },
    getLeagues(state) {
        return state.leagues;
    },
    getComputerLeagues(state) {
        return state.computerLeagues;
    },
    getDelayPickButton(state) {
        return state.delayPickButton;
    },
    getTypeConfigs(state) {
        return state.typeConfigs;
    },
    getAdminPopup(state) {
        return state.adminPopup;
    },
    getChatLink(state) {
        return state.chatLink || false;
    },
    getSocialSites(state) {
        return state.socialSites;
    },
    getWidgetListing(state) {
        return state.widgetListing;
    },
    getWidgetTop(state) {
        return state.widgetTop;
    },
    getRewards(state) {
        return state.rewards;
    },
}

export const actions = {
    async general({ commit }) {
        await this.$axios.$get("/general", { useCache: true })
            .then(response => {
                commit("setIqTypes", response.data.iqTypes);
                commit("setLeagues", response.data.leagues);
                commit("setComputerLeagues", response.data.computer_leagues);

                commit("setDelayPickButton", response.data.delay_pick_button);

                commit("setAdminPopup", response.data.popUps || []);
                commit("setSocialSites", response.data.socialSites || {});
                commit("setWidgetListing", response.data.sportBooksWidgetListing || []);
                commit("setWidgetTop", response.data.sportBooksWidgetTop || []);
            });
    },

    async getclient({ commit }) {
        return await this.$axios.$get("/getclient")
            .then(response => {
                if (typeof response.data.client !== "undefined") {
                    commit("setClient", response.data.client);
                    commit("setTypeConfigs", response.data.client.type_configs);
                    commit("setMeta", response.meta);
                }

                return response;
            }).catch(error => {
                console.log('error', error.response);
            });
    },
    async fetchFaq({ commit, state }) {
        if (!state.faqs.length) {
            await this.$axios.$get("/faq")
                .then(response => {
                    commit("setFaqs", response);
                })
        }
    },
    async fetchRules({ commit, state }) {
        if (!state.rules.length) {
            await this.$axios.$get("/rules")
                .then(response => {
                    commit("setRules", response);
                })
        }
    },
    async fetchStatics({ commit, state }, payload) {
        if (!state.statics.length) {
            await this.$axios.$get("/static-page/" + payload.page)
                .then(response => {
                    commit("setStatics", response.data);
                })
        }
    },
    async updatePageView({ commit, state }) {
        if (!state.statics.length) {
            await this.$axios.$put("/page-view/update")
                .then(response => {

                }).catch(error => {
                    console.log('error', error.response);
                });
        }
    },
    async fetchChatLink({ commit }) {
        await this.$axios
            .$get("/chat")
            .then((response) => {
                commit("setChatLink", response.data);
            }).catch(error => {
                return error.response.data;
            });
    },
    async fetchRewards({ commit }) {
        await this.$axios
            .$get("/page-view")
            .then((response) => {
                commit("setRewards", response?.data?.userPageViewInfo?.rewardAmount || "");
            });
    },
}

export const mutations = {
    setClient(state, client) {
        state.client = {
            id: client.id,
            url: client.url,
            blogOnOff: client.blog_on_off,
            sharingImage: client.sharing_image,
            siteName: client.site_name
        };
    },
    setMeta(state, meta) {
        state.meta = meta;
    },
    setIqTypes(state, iqTypes) {
        state.iqTypes = iqTypes;
    },
    setTypeConfigs(state, typeConfigs) {
        state.typeConfigs = typeConfigs;
    },
    setFaqs(state, faqs) {
        state.faqs = faqs;
    },
    setRules(state, rules) {
        state.rules = rules;
    },
    setStatics(state, statics) {
        state.statics = statics;
    },
    setLeagues(state, leagues) {
        state.leagues = leagues;
    },
    setComputerLeagues(state, computerLeagues) {
        state.computerLeagues = computerLeagues;
    },
    setDelayPickButton(state, delayPickButton) {
        state.delayPickButton = delayPickButton;
    },
    setAdminPopup(state, adminPopup) {
        state.adminPopup = adminPopup;
    },
    setChatLink(state, chatLink) {
        state.chatLink = chatLink;
    },
    setSocialSites(state, socialSites) {
        state.socialSites = socialSites;
    },
    setWidgetListing(state, widgetListing) {
        state.widgetListing = widgetListing;
    },
    setWidgetTop(state, widgetTop) {
        state.widgetTop = widgetTop;
    },
    setRewards(state, rewards) {
        state.rewards = rewards;
    },
}