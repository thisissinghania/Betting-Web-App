<template>
  <div class="consensus-picks-detail">
    <left-panel-vue />
    <div v-if="!isLoading" class="main-class-width-100">
      <div v-if="Object.keys(consensusDetails).length" class="middle-panel">
        <div class="heading">
          <div class="team team-a">
            <p class="left">{{ consensusDetails.awayTeam }}</p>
            <p class="right">{{ consensusDetails.awayScore }}</p>
          </div>
          <div class="team team-b">
            <p class="left">{{ consensusDetails.homeTeam }}</p>
            <p class="right">{{ consensusDetails.homeScore }}</p>
          </div>
        </div>
        <div class="content">
          <div class="tabs">
            <a class="active consensus" :href="getTypeUrl('consensus')"
              >Consensus</a
            >
            <a class="line-tracking" :href="getTypeUrl('line-tracking')"
              >Line Tracking</a
            >
          </div>
          <consensus-detail :consensus-details="consensusDetails" />
        </div>
      </div>
      <div v-else>
        <p class="notification">No games are available.</p>
      </div>
    </div>
    <div v-else class="notfound">
      <v-progress-circular
        color="primary"
        indeterminate
        :size="55"
        :width="8"
      ></v-progress-circular>
    </div>
    <right-panel-vue />
  </div>
</template>
  
  <script>
import LeftPanelVue from "@/components/common/LeftPanel.vue";
import RightPanelVue from "@/components/common/RightPanel.vue";
import ConsensusDetail from "@/components/consensus-picks/ConsensusDetail.vue";

export default {
  name: "ConsensusPickDetail",
  components: { LeftPanelVue, RightPanelVue, ConsensusDetail },
  async asyncData({ $axios, req, params, store }) {
    $axios.onRequest((config) => {
      config.headers.Origin = req.headers.host;
    });
    const clientData = store.getters["default/getClient"];

    const teams = params.teams?.replace("-public-betting-splits-picks", "");

    const splitedTeams = teams?.split("-vs-");
    const teamNameA = splitedTeams["0"].replaceAll("-", " ");
    const teamNameB = splitedTeams["1"].replaceAll("-", " ");

    const teamA =
      teamNameA.replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
        letter.toUpperCase()
      ) || "";
    const teamB =
      teamNameB.replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
        letter.toUpperCase()
      ) || "";

    let faviconVal = ''; 
    for (const ky in store.getters["default/getTypeConfigs"]) {
      if (store.getters["default/getTypeConfigs"][ky].field_name === 'homepage_favicon_image') {
        faviconVal = store.getters["default/getTypeConfigs"][ky].field_value;
      }
    }

    const mainData = {
      title: `${teamA} vs. ${teamB} Betting Splits & Picks | ${clientData?.siteName}`,
      description: `Get ${teamA} vs. ${teamB} betting splits. Find out where the public is betting on this matchup. Spread and total consensus picks are available.`,
      image: clientData?.sharingImage,
      favicon: faviconVal
    };

    const headData = {
      title: mainData.title,
      meta: [
        {
          hid: "description",
          name: "description",
          content: mainData.description,
        },
        {
          hid: "og:title",
          property: "og:title",
          content: mainData.title,
        },
        {
          hid: "og:description",
          property: "og:description",
          content: mainData.description,
        },
        {
          hid: "og:image",
          property: "og:image",
          content: mainData.image,
        },
      ],
      link: [
        {
          hid: "icon",
          rel: "icon",
          type: "image/x-icon",
          href: mainData.favicon,
        }
      ]
    };

    const payload = {
      homeTeam: teamB,
      awayTeam: teamA,
      league: params.league,
      type: "consensus",
    };
    const consensusDetails = (
      await store.dispatch("consensus/detailsApiCall", payload)
    ).data;

    return { teams, teamA, teamB, headData, consensusDetails };
  },
  data() {
    return {
      isLoading: false,
    };
  },
  head() {
    return this.headData;
  },
  methods: {
    getTypeUrl(type) {
      let league = "";
      if (this.$route.params.league) {
        league = this.$route.params.league;
      } else {
        league = this.getLeagues[0].urlSlug;
      }
      return `/${league}/${type}/${this.teams}-${
        type === "line-tracking"
          ? "line-movement"
          : "public-betting-splits-picks"
      }`;
    },
  },
};
</script>
  
  <style lang="scss" scoped>
.consensus-picks-detail {
  display: flex;
  justify-content: space-between;
  padding: 24px 32px;
  gap: 24px;
  background-color: #ececec;

  .notfound {
    font-weight: bold;
    text-align: center;
    margin-top: 10%;
    margin-bottom: 10%;
  }
  .main-class-width-100 {
    width: 100%;
  }
  .middle-panel {
    .heading {
      background: #2e305c;
      border: 0.5px solid #dfe0f4;
      border-radius: 4px;
      padding: 8px 0;
      margin-bottom: 16px;
      .team {
        p {
          font-size: 15px !important;
        }
        display: flex;
        justify-content: space-between;
        padding: 8px 24px;
        font-style: normal;
        font-weight: 600;
        font-size: 10px;
        line-height: 12px;

        color: #ffffff;
      }
    }
    .content {
      background: #ffffff;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      padding: 24px;
      width: 100%;
      .tabs {
        display: flex;
        gap: 5px;
        a {
          text-align: center;
          flex-grow: 1;
          display: inline-block;
          font-style: normal;
          font-weight: 600;
          font-size: 14px;
          line-height: 15px;
          background: #ffffff;
          border: #f1f1f1 solid thin;
          color: #000000;
          padding: 8px;
          text-decoration: none;
          margin-right: 10px;

          &:last-child {
            margin-right: 0px;
          }
          @media screen and (max-width: 959px) {
            font-size: 14px !important;
          }
          &.line-tracking {
            border-radius: 4px 0 0 4px;
          }
          &.consensus {
            border-radius: 0 4px 4px 0;
          }
          &.active {
            background: #fa8c28;
            font-weight: 700;
            color: #ffffff;
          }
        }
      }
    }

    img.bottom-img {
      width: 100%;
    }
  }
  @media screen and (max-width: 768px) {
    padding: 16px;
    background-color: #ffffff;
    .middle-panel {
      min-width: 100%;
      .content {
        padding: 12px;
      }
    }
  }

  .tabs a:first-child {
    float: left;
  }
}
</style>
  