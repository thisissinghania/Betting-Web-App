<template>
  <div class="consensus-picks-detail">
    <left-panel-vue />
    <div class="middle-panel" v-if="!isLoading">
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
          <a
            :class="`${
              this.$route.params.type === 'consensus' ? 'active' : ''
            } consensus`"
            :href="getTypeUrl('consensus')"
            >Consensus</a
          >
          <a
            :class="`${
              this.$route.params.type === 'line-tracking' ? 'active' : ''
            } line-tracking`"
            :href="getTypeUrl('line-tracking')"
            >Line Tracking</a
          >
        </div>
        <line-tracking
          :consensus-details="consensusDetails"
          v-if="$route.params.type == 'line-tracking'"
        />
        <consensus-detail :consensus-details="consensusDetails" v-else />
      </div>
    </div>
    <div v-if="!isLoading && consensusDetails.length === 0">
      <p class="notification">No games are available.</p>
    </div>
    <div v-else-if="isLoading" class="notfound">
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
import LineTracking from "@/components/consensus-picks/LineTracking.vue";
import ConsensusDetail from "@/components/consensus-picks/ConsensusDetail.vue";

export default {
  name: "ConsensusPickDetail",
  components: { LeftPanelVue, RightPanelVue, LineTracking, ConsensusDetail },
  data() {
    return {
      isLoading: true,
      consensusDetails: [],
    };
  },
  methods: {
    getTypeUrl(type) {
      let league = "";
      if (this.$route.params.league) {
        league = this.$route.params.league;
      } else {
        league = this.getLeagues[0].urlSlug;
      }

      return (
        "/" +
        league +
        "/consensus-picks/detail/" +
        this.$route.params.id +
        "/" +
        type
      );
    },
  },
  computed: {},
  async beforeMount() {
    this.isLoading = true;
    // Fetch a random list of articles
    const payload = {
      id: this.$route.params.id,
      type: this.$route.params.type,
    };
    const response = await this.$store.dispatch(
      "consensus/detailsApiCall",
      payload
    );

    this.consensusDetails = response.data;
    // this.meta.metaTitle = response.meta.metaTitle;
    // this.meta.metaDescription = response.meta.metaDescription;
    this.isLoading = false;
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
