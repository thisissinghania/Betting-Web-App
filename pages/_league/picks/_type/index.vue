<template>
  <div class="home">
    <left-panel />
    <div class="middle-panel">
      <div v-if="blueBarData.day" class="header">
        <!-- <img src="@/assets/icon/star.png" alt="start image" /> -->
        <span
          >{{ blueBarData.day }} Days, {{ blueBarData.hour }} Hours &
          {{ blueBarData.minute }} Minutes</span
        >
        <!-- <img src="@/assets/icon/question.svg" alt="question image" /> -->
        <span>
          to turn {{ blueBarData.currentBalance }} into
          {{ blueBarData.challengeCashOutAmount }}</span
        >
      </div>

      <div
        v-if="blueBarData.currentBalance"
        class="top-show"
        @click="linkWithTimeStamp('/my-picks/')"
      >
        <div class="left">
          <div class="item">
            <img src="@/assets/image/dollar.svg" alt="cash" />
            <div class="info">
              <p class="heading">YOUR BALANCE</p>
              <p class="amount">{{ blueBarData.currentBalance }}</p>
            </div>
          </div>
          <div class="item">
            <img src="@/assets/image/dollar.svg" alt="redeem" />
            <div class="info">
              <p class="heading">PENDING BALANCE</p>
              <p class="amount">{{ blueBarData.pendingBalance }}</p>
            </div>
          </div>
        </div>
        <!-- <div class="right">
            <router-link to="/redeem">REDEEM NOW</router-link>
          </div> -->
      </div>

      <tell-friends v-if="$auth.loggedIn" />

      <slider-comp :type="type" />

      <div class="tabs">
        <a
          v-for="(ltype, index) in getCurrentLeagueData()"
          :key="'linetype-' + index"
          :class="getTypeHead() === ltype.urlSlug ? 'active' : ''"
          :href="getTypeUrl(ltype.urlSlug)"
          >{{ ltype.titleDsp }}</a
        >
      </div>

      <league-list
        :leagues="games"
        :is-loading="isLoading"
        :content="headingContent"
        :title="headingTitle"
      />
    </div>
    <right-panel />
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import LeagueList from "@/components/home/LeagueList";
import LeftPanel from "@/components/common/LeftPanel.vue";
import RightPanel from "@/components/common/RightPanel.vue";
import SliderComp from "@/components/common/DefaultSlider.vue";
import TellFriends from "@/components/common/TellFriends.vue";

export default {
  name: "Home",
  components: {
    LeagueList,
    LeftPanel,
    RightPanel,
    SliderComp,
    TellFriends,
  },
  async asyncData({ app, $axios, params, req, store, error }) {
    $axios.onRequest((config) => {
      config.headers.Origin = req
        ? req.headers.host
        : window.location.host.split(":")[0];
    });

    const getLeagues = store.getters["default/getLeagues"];
    let league = "";
    if (params.league) {
      league = params.league;
    } else if (typeof getLeagues[0] !== "undefined") {
      league = getLeagues[0].urlSlug;
    }

    const type = params.type ? params.type : "full-game";

    const myRequests = [store.dispatch("picks/getList", { league, type })];
    if (app.$auth.loggedIn) {
      myRequests.push(store.dispatch("balance/userBalancePoint"));
    }

    const [response] = await Promise.all(myRequests);

    if (response.code !== 200) {
      return error({ statusCode: 404, message: "Page Not Found" });
    }

    const games = store.getters["picks/getPicks"];

    let faviconVal = "";
    for (const ky in store.getters["default/getTypeConfigs"]) {
      if (
        store.getters["default/getTypeConfigs"][ky].field_name ===
        "homepage_favicon_image"
      ) {
        faviconVal = store.getters["default/getTypeConfigs"][ky].field_value;
      }
    }

    const headingContent = response.content;
    const headingTitle = response.title;
    const mainData = {
      title: response?.meta?.metaTitle,
      description: response?.meta?.metaDescription,
      image: store.getters["default/getClient"]?.sharingImage,
      favicon: faviconVal,
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
        },
      ],
    };

    return { headData, games, headingTitle, headingContent };
  },
  data() {
    return {
      type: "picks",
      lives: [
        {
          date: "August 18, 2022",
          data: [
            {
              time: "3:00 AM EDT",
              entries: [
                {
                  time: "EDUARDO BAEZ",
                  score: "20",
                  spread: "38.5 (-110)",
                  moneyLine: "-25000",
                  total: "289.5 (-110)",
                  imageUrl:
                    "https://cdn-icons-png.flaticon.com/512/130/130906.png",
                },
                {
                  time: "EMANUEL NAVARRETE",
                  score: "15",
                  spread: "38.5 (-110)",
                  moneyLine: "-25000",
                  total: "289.5 (-110)",
                  imageUrl:
                    "https://cdn-icons-png.flaticon.com/512/656/656979.png",
                },
              ],
            },
          ],
        },
      ],
      leagues: [],
      isLoading: false,
    };
  },

  head() {
    return this.headData;
  },
  computed: {
    getLeagues() {
      return this.$store.getters["default/getLeagues"];
    },
    ...mapGetters("balance", ["blueBarData"]),
  },
  methods: {
    getCurrentLeagueData() {
      for (const league in this.getLeagues) {
        if (this.getLeagues[league].urlSlug === this.getCurrentLeague()) {
          return this.getLeagues[league].lineType;
        }
      }
    },
    linkWithTimeStamp(link) {
      window.location.href = link + "?t=" + new Date().getTime();
    },
    getTypeHead() {
      let type = "";
      if (this.$route.params.type) {
        type = this.$route.params.type;
      } else {
        type = "full-game";
      }

      return type;
    },
    getCurrentLeague() {
      let league = "";
      if (this.$route.params.league) {
        league = this.$route.params.league;
      } else if (
        typeof this.getLeagues[0] !== "undefined" ||
        typeof window !== "undefined"
      ) {
        if (typeof this.getLeagues[0] !== "undefined") {
          league = this.getLeagues[0].urlSlug;
        } else if (typeof window !== "undefined") {
          window.location.href = "/";
        }
      }

      return league;
    },
    getTypeUrl(type) {
      return "/" + this.getCurrentLeague() + "/picks/" + type;
    },

    getType() {
      let type = "";
      if (this.$route.params.type) {
        type = "/" + this.$route.params.type;
      } else {
        type = "/full-game";
      }

      return type;
    },
  },
};
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 24px 32px;
  gap: 24px;
  background-color: #ececec;

  .middle-panel {
    .top-show {
      cursor: pointer;
      padding: 12px;
      background: linear-gradient(95.98deg, #ffebeb 16.15%, #fff2e7 83.13%);
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 16px;
      .left {
        display: grid;
        grid-template-columns: calc(50% - 6px) calc(50% - 6px);
        grid-column-gap: 12px;
        width: 100%;
        // flex-grow: 1;
        .item {
          display: flex;
          align-items: center;
          flex-grow: 1;
          padding: 12px 15px;
          background: #fff;
          border-radius: 6px;
          box-shadow: 0 0 30px rgba(0, 0, 0, 0.1);
          .info {
            color: #000000;
            font-style: normal;
            margin-left: 15px;
            padding-left: 15px;
            border-left: 1px solid #d3d3d3;
            .heading {
              font-weight: 500;
              font-size: 16px;
              @media screen and (max-width: 767px) {
                font-size: 12px !important;
              }
              @media screen and (min-width: 1024px) and (max-width: 1299px) {
                font-size: 12px !important;
              }
            }
            .amount {
              font-weight: 600;
              font-size: 20px;
              margin-top: 5px;
              @media screen and (max-width: 767px) {
                font-size: 14px !important;
              }
              @media screen and (min-width: 1024px) and (max-width: 1299px) {
                font-size: 14px !important;
              }
            }
            @media all and (max-width: 767px) {
              margin-left: 10px;
              padding-left: 10px;
            }
          }
        }
        @media all and (max-width: 767px) {
          grid-template-columns: 100%;
          grid-column-gap: 0px;
          grid-row-gap: 10px;
        }
      }
      .right {
        display: flex;
        // flex-grow: 1;
        justify-content: center;
        align-items: center;
        a {
          text-decoration: none;
          background: #fa8c28;
          border-radius: 4px;
          padding: 8px 16px;
          font-style: normal;
          font-weight: 800;
          font-size: 12px;
          line-height: 15px;
          text-transform: uppercase;
          color: #ffffff;
          &:hover {
            opacity: 0.8;
          }
        }
      }
      @media all and (max-width: 767px) {
        padding: 10px !important;
      }
    }
    .header {
      background: linear-gradient(
        90.39deg,
        #656bff 1.04%,
        #6892ff 44.46%,
        #557aff 91.44%
      );
      border-radius: 4px;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      padding: 16px;
      gap: 6px;
      color: #ffffff;
      // height: 50px;
      margin-bottom: 16px;
      font-size: 15px;
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
    .tabs {
      margin-top: 16px;
      a {
        color: #000000;
        text-decoration: none;
        display: inline-block;
        font-weight: 600;
        font-size: 12px !important;
        padding: 12px 16px;
        border-radius: 4px;
        background: #e3e3e3;
        border: 0.5px solid #d2d2d2;
        margin-right: 12px;

        @media screen and (max-width: 767px) {
          padding: 8px 8px !important;
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
    img.bottom-img {
      margin-top: 16px;
      width: 100%;
    }
    .refresh-timing {
      background: #d1e4d1;
      color: #379937;
      font-size: 18px;
      margin-top: 16px;
      padding: 15px;
      border-radius: 5px;
      text-align: center;
      font-weight: 500;
      border: 1px solid #b0d9b0;
    }
    .all_checkboxes {
      margin-top: 16px;
      background-color: #ffffff;
      border: 1px solid #e0e0e0;
      padding: 16px 16px 1px 16px;
      position: relative;
      @media all and (max-width: 767px) {
        padding-bottom: 16px;
      }
      ul {
        display: grid;
        grid-template-columns: 32% 32% 32%;
        grid-column-gap: 2%;
        @media all and (max-width: 767px) {
          grid-template-columns: 100%;
          grid-column-gap: 0;
        }
        li {
          background: #fff;
          margin-bottom: 15px;
          border: 1px solid #e0e0e0;
          border-radius: 5px;
          list-style-type: none;
          display: flex;
          align-items: center;
          display: -webkit-flex;
          -webkit-align-items: center;
          overflow: hidden;
          label {
            line-height: 0px;
            input {
              display: none;
            }
            span {
              width: 40px;
              height: 40px;
              display: block;
              background: #f1f1f1;
              margin-right: 15px;
            }
            input:checked + span {
              background: #379937;
              position: relative;
              &::after {
                content: "";
                width: 15px;
                height: 8px;
                border-left: 2px solid #fff;
                border-bottom: 2px solid #fff;
                position: absolute;
                top: 45%;
                left: 50%;
                transform: translate(-50%, -50%);
                -webkit-transform: translate(-50%, -50%) rotate(-45deg);
              }
            }
          }
          p {
            font-size: 16px !important;
            text-transform: uppercase;
            font-weight: 400;
          }
        }
      }
      .update-cta {
        position: absolute;
        bottom: 16px;
        right: 16px;
        @media all and (max-width: 767px) {
          position: relative;
          bottom: 0;
          right: 0;
          margin-top: 0;
        }
        button {
          background: #379937;
          border-radius: 4px;
          white-space: nowrap;
          padding: 9px 20px;
          color: #fff;
          font-size: 16px;
          text-transform: capitalize;
          height: 42px;
          @media all and (max-width: 767px) {
            width: 100%;
          }
        }
      }
    }
  }
  @media screen and (max-width: 767px) {
    padding: 16px;
    background-color: #ffffff;
    .middle-panel {
      min-width: 100%;
      .top-show {
        display: block;
        padding: 0px;
        .left {
          margin-bottom: 0;
          .item {
            width: 100% !important;
            padding: 8px !important;
            gap: 0 !important;
          }
        }
      }
      .header {
        flex-wrap: wrap;
      }
    }
  }
}
</style>
