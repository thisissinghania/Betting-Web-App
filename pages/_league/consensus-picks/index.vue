<template>
  <div class="consensus-picks">
    <left-panel-vue />
    <div class="middle-panel">
      <slider-comp :type="type" />
      <!-- <div class="tabs">
          <span class="active">FULL GAME</span>
          <span>1ST HALF</span>
          <span>1ST QTR</span>
          <span>2ND HALF</span>
        </div> -->
      <div class="content">
        <div
          v-for="(consensusPick, leagues_index) in consensusPicks"
          :key="leagues_index"
          :class="leagues_index > 0 ? 'm-top-10' : ''"
          class="item"
        >
          <h1 class="date">{{ consensusPick.date }}</h1>
          <div
            v-for="(item, data_index) in consensusPick.gameDetail"
            :key="data_index"
            class="slot"
          >
            <p class="time">{{ item.time }}</p>
            <div class="body">
              <div class="left">
                <p class="team-a">{{ item.away }}</p>
                <p class="team-b">{{ item.home }}</p>
              </div>
              <a class="right" :href="getDetailUrl(item)">
                <img alt="arrow" src="@/assets/icon/arrow-round-yellow.svg" />
              </a>
            </div>
          </div>
        </div>
        <div v-if="!isLoading && consensusPicks.length === 0">
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
      </div>
      <!-- <img src="@/assets/image/image 5.png" alt="image 5" class="bottom-img" /> -->
      <div class="white-content">
        <h1 v-html="headingTitle"></h1>
        <p v-html="headingContent"></p>
      </div>
    </div>
    <right-panel-vue />
  </div>
</template>

<script>
import LeftPanelVue from "@/components/common/LeftPanel.vue";
import RightPanelVue from "@/components/common/RightPanel.vue";
import SliderComp from "@/components/common/DefaultSlider.vue";
export default {
  name: "ConsensusPicks",
  components: { LeftPanelVue, RightPanelVue, SliderComp },
  async asyncData({ $axios, params, req, store }) {
    $axios.onRequest((config) => {
      config.headers.Origin = req
        ? req.headers.host
        : window.location.host.split(":")[0];
    });
    const clientData = store.getters["default/getClient"];

    const getLeagues = store.getters["default/getLeagues"].filter(
      (league) => league.urlSlug !== "next-30"
    );
    let currentLeague = "";
    if (params.league) {
      currentLeague = params.league;
    } else if (typeof getLeagues[0] !== "undefined") {
      currentLeague = getLeagues[0].urlSlug;
    }

    const response = (await store.dispatch("consensus/apiCall", currentLeague))
      .data;
    const consensusPicks = response.data;
    const headingContent = response.content;
    const headingTitle = response.title;

    let faviconVal = ''; 
    for (const ky in store.getters["default/getTypeConfigs"]) {
      if (store.getters["default/getTypeConfigs"][ky].field_name === 'homepage_favicon_image') {
        faviconVal = store.getters["default/getTypeConfigs"][ky].field_value;
      }
    }

    const mainData = {
      title: response?.meta?.title,
      description: response?.meta?.description,
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

    return {
      headData,
      consensusPicks,
      headingTitle,
      headingContent,
      getLeagues,
      currentLeague,
    };
  },
  data() {
    return {
      type: "consensus-picks",
      isLoading: false,
    };
  },
  head() {
    return this.headData;
  },

  methods: {
    getTypeHead() {
      let type = "";
      if (this.$route.params.type) {
        type = this.$route.params.type;
      } else {
        type = "full-game";
      }

      return type;
    },
    getTypeUrl(type) {
      return "/" + this.currentLeague + "/consensus/" + type;
    },
    getCurrentLeagueData() {
      for (const league in this.getLeagues) {
        if (this.getLeagues[league].urlSlug === this.currentLeague) {
          return this.getLeagues[league].lineType;
        }
      }
    },
    goToDetail() {
      this.$router.push({ path: "consensus-picks/detail/consensus" });
    },
    getDetailUrl(item) {
      let league = "";
      if (this.$route.params.league) {
        league = this.$route.params.league;
      } else {
        league = this.getLeagues[0].urlSlug;
      }
      const homeTeam = item.home.replaceAll(" ", "-").toLowerCase();
      const awayTeam = item.away.replaceAll(" ", "-").toLowerCase();

      return `/${league}/consensus/${awayTeam}-vs-${homeTeam}-public-betting-splits-picks`;
    },
  },
};
</script>

<style lang="scss" scoped>
.consensus-picks {
  display: flex;
  justify-content: space-between;
  padding: 24px 32px;
  gap: 24px;
  background-color: #ececec;

  .header {
    background: linear-gradient(
      90.39deg,
      #656bff 1.04%,
      #6892ff 44.46%,
      #557aff 91.44%
    );
    border-radius: 4px;
    flex-direction: row;
    align-items: center;
    padding: 16px;
    gap: 6px;
    color: #ffffff;
    // height: 50px;
    margin-bottom: 16px;
    @media screen and (min-width: 1024px) and (max-width: 1299px) {
      flex-wrap: wrap;
    }
    span {
      font-size: 17px !important;
      @media screen and (max-width: 767px) {
        font-size: 16px !important;
      }
    }
  }

  .notfound {
    font-weight: bold;
    text-align: center;
    margin-top: 10%;
    margin-bottom: 10%;
  }
  .m-top-10 {
    margin-top: 10px;
  }

  .middle-panel {
    .tabs {
      margin-top: 16px;
      span {
        display: inline-block;
        font-weight: 600;
        font-size: 12px;
        padding: 12px 16px;
        border-radius: 4px;
        background: #e3e3e3;
        border: 0.5px solid #d2d2d2;
        margin-right: 12px;
        @media screen and (max-width: 767px) {
          padding: 8px 8px !important;
          font-size: 12px !important;
          margin-right: 4px !important;
        }
        @media screen and (min-width: 1024px) and (max-width: 1299px) {
          margin-right: 6px;
        }
        &.active {
          background: #fa8c28;
          border-color: #fa8c28;
          color: #ffffff;
        }
      }
    }
    .content {
      background: #ffffff;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      padding: 12px;
      margin-top: 16px;
      .item {
        .date {
          background: #2e305c;
          border-radius: 4px;
          text-align: center;
          font-style: normal;
          font-weight: 600;
          font-size: 16px;
          line-height: 19px;
          /* identical to box height */

          text-transform: uppercase;

          color: #ffffff;
          padding: 12px 0;
          margin-bottom: 8px;
        }
        .slot {
          &:not(:last-child) {
            margin-bottom: 8px;
          }
          .time {
            background: #f5f5f5;
            border: 0.5px solid #e0e0e0;
            border-radius: 4px 4px 0px 0px;
            border-bottom: none;
            font-style: normal;
            font-weight: 700;
            font-size: 12px;
            line-height: 10px;
            /* identical to box height */

            text-transform: uppercase;

            color: #212237;
            padding: 7px 12px;
          }
          .body {
            padding: 12px 16px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            background: #ffffff;
            border: 0.5px solid #e0e0e0;
            border-radius: 0 0 4px 4px;
            .left {
              p {
                font-style: normal;
                font-weight: 600;
                font-size: 15px;
                line-height: 15px;
                text-transform: uppercase;

                color: #000000;

                @media screen and (max-width: 959px) {
                  font-size: 14px !important;
                }
                &.team-a {
                  margin-bottom: 12px;
                }
              }
            }
            .right {
              img {
                cursor: pointer;
              }
            }
          }
        }
      }
    }
    img.bottom-img {
      margin-top: 16px;
      width: 100%;
    }
    .white-content {
      background: #fff;
      border: #e0e0e0 solid thin;
      padding: 15px;
      border-radius: 8px;
      margin-top: 20px;

      h1 {
        color: #000000;
        font-style: normal;
        font-weight: 700;
        font-size: 28px;
        margin-bottom: 15px;
      }
      h2 {
        color: #000000;
        font-style: normal;
        font-weight: 700;
        margin-top: 15px;
        margin-bottom: 15px;
        font-size: 20px;
      }
      p {
        margin-bottom: 10px;
        margin-top: 10px;
        color: #000000;
        font-size: 15px !important;
        line-height: 26px !important;
      }
      ul {
        margin: 0px;
        padding: 0px;
        text-indent: 8px;

        li {
          list-style-position: inside;
          margin-bottom: 10px;
        }
      }
    }
  }
  @media screen and (max-width: 768px) {
    padding: 16px;
    background-color: #ffffff;
    .middle-panel {
      min-width: 100%;
      img.bottom-img {
        display: none;
      }
    }
  }
  @media screen and (max-width: 390px) {
    .middle-panel {
      span {
        font-size: 10px !important;
      }
    }
  }
}
</style>
