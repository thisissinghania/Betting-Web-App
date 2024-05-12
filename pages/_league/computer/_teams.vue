<template>
  <div class="computer-picks-detail">
    <left-panel-vue />

    <div class="middle-panel custom-container">
      <div class="video-and-promotion">
        <h1>{{ computerDetails.meta.metaTags.h1 }}</h1>
        <div class="video-part">
          <iframe
            width="100%"
            height="390"
            :src="
              'https://www.youtube.com/embed/' +
              computerDetails.data.youtubeVideo
            "
            title="Dummy Video"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
        </div>
      </div>

      <league-list-teams :leagues="leagues" />

      <!-- sportbook-widget -->
      <div class="sportbook-listing">
        <div class="title-list">Best Bonuses</div>
        <div
          v-for="bonus in bonuses"
          :key="`listing-bonus-${bonus.id}`"
          class="sportlist"
        >
          <div class="leftbook">
            <div class="imgpart" v-show="bonus.image">
              <img :src="bonus.image" alt="Image" />
            </div>
            <div class="contpart">
              <span class="subhed">{{ bonus.title }}</span>
              <p class="subcont">
                {{ bonus.description }}
              </p>
            </div>
          </div>
          <div class="rightbook">
            <div class="offerbtn">
              <a :href="bonus.button1Link">
                <span class="codepromo">{{ bonus.button1Text }}</span>
                <span class="codetext">Promo Code</span>
              </a>
              <a :href="bonus.button2Link" target="_blank" class="claimoffer">{{
                bonus.button2Text
              }}</a>
            </div>
          </div>
        </div>
        <div v-if="!bonuses.length">
          <div v-if="!bonusLoaded" class="notfound">
            <v-progress-circular
              color="primary"
              indeterminate
              :size="55"
              :width="8"
            ></v-progress-circular>
          </div>
          <div v-else class="no-bonus">No Bonuses Found</div>
        </div>
      </div>
      <!-- end-sportbook -->

      <div class="content">
        <h2>{{ computerDetails.meta.metaTags.h2 }}</h2>
        <div class="heading">
          <div class="team team-a">
            <p class="left">{{ teamA }}</p>
            <p class="right">{{ consensusData?.awayScore }}</p>
          </div>
          <div class="team team-b">
            <p class="left">{{ teamB }}</p>
            <p class="right">{{ consensusData?.homeScore }}</p>
          </div>
        </div>
        <div class="tabs-parent">
          <div class="tabs">
            <a
              :class="`${currentTab === 'Consensus' ? 'active' : ''} `"
              @click="tabClick('Consensus')"
              >Consensus</a
            >
            <a
              :class="`${currentTab === 'Line Tracking' ? 'active' : ''} `"
              @click="tabClick('Line Tracking')"
              >Line Tracking</a
            >
          </div>
          <line-tracking
            v-if="currentTab == 'Line Tracking'"
            :lineTrackingData="lineTrackingData"
          />
          <consensus-detail
            v-if="currentTab == 'Consensus'"
            :consensusData="consensusData"
          />
        </div>
      </div>

      <div class="promotion-part">
        <div
          class="single-banner"
          v-for="(item, index) in computerDetails.data.advertisements.slice(
            0,
            1
          )"
          :key="`ads-item-${index}`"
        >
          <a :href="item.link" target="_blank">
            <img :src="item.image" :alt="'ad' + index" />
          </a>
        </div>
      </div>

      <div
        class="content"
        v-for="(item, pageIndex) in gameLogs"
        :key="pageIndex"
      >
        <h2>{{ pageIndex }} Last 5 Games</h2>
        <div class="table-responsive blue-table">
          <table>
            <thead>
              <tr>
                <th class="date">DATE</th>
                <th class="buck">OPPONENT</th>
                <th class="buck">SCORE</th>
                <th class="buck">SPREAD</th>
                <th class="buck">OVER/UNDER</th>
                <th class="buck">MONEYLINE</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(i, pi) in item" :key="pi">
                <td class="buck">{{ i.date }}</td>
                <td class="buck">
                  {{ i.opponent }}
                </td>

                <td class="buck">{{ i.score }}</td>
                <td class="buck">{{ i.spread }}</td>
                <td class="buck">{{ i.overUnder }}</td>
                <td class="buck">{{ i.moneyLine }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="content">
        <h2>{{ computerDetails?.meta.metaTags.h3 }}</h2>
        <div class="listings teams" v-html="computerDetails.data.trends"></div>
      </div>

      <div class="white-content differ-part">
        <h2 class="mb-0">
          <a :href="getDetailUrl('line-tracking')">{{
            computerDetails?.meta.metaTags.h7
          }}</a>
        </h2>
      </div>

      <div class="white-content">
        <h2>{{ computerDetails?.meta.metaTags.h4 }}</h2>
        <div class="injuries-table">
          <table>
            <tbody>
              <tr
                v-for="(item, index) in computerDetails.data.injuries"
                :key="`ads-item-${index}`"
              >
                <td>{{ item.playerName }}</td>
                <td>{{ item.pos }}</td>
                <td>{{ item.status }}</td>
                <td>{{ item.injury }}</td>
                <td>{{ item.injuryUpdate }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="white-content">
        <h2>{{ computerDetails.meta.metaTags.h5 }}</h2>
        <div v-html="computerDetails.data.content" class="previewContent"></div>
      </div>

      <div class="white-content differ-part">
        <h2 class="mb-0">
          <a :href="getDetailUrl('consensus')">{{
            computerDetails.meta.metaTags.h6
          }}</a>
        </h2>
      </div>

      <div
        class="replenish"
        v-if="Object.keys(computerDetails.data.prediction).length > 0"
      >
        These picks may change as we get more data. (computer pick in orange)
      </div>
      <div
        class="white-content differ-part"
        v-if="Object.keys(computerDetails.data.prediction).length > 0"
      >
        <h3 class="mb-0">
          Spread Pick: {{ computerDetails.data.prediction.spreadWinTeam }}
          <span class="preOrange">{{
            computerDetails.data.prediction.spreadLine
          }}</span>
        </h3>
      </div>
      <div
        class="white-content differ-part"
        v-if="Object.keys(computerDetails.data.prediction).length > 0"
      >
        <h3 class="mb-0">
          Total Pick:
          <span class="preOrange"
            ><img :src="imagePopu" alt="arrow" />
            {{ computerDetails.data.prediction.totalLine }}
          </span>
        </h3>
      </div>
      <div class="white-content differ-part" v-else>
        <h3 class="mb-0">
          There is not enough data available to make a pick on this game.
        </h3>
      </div>
      <!-- <div class="white-content differ-part">
        <h3 class="mb-0">Spread Pick: {{ teamA }} <span class="preOrange">+7</span>  {{ teamB }} <span >-7</span></h3>
      </div>
      <div class="white-content differ-part">
        <h3 class="mb-0">Total Pick: {{ teamA }} <span class="preOrange"><img
              src="@/assets/icon/up-arrow-white.svg"
              alt="down-arrow"
            />+7</span>  {{ teamB }} <span><img
              src="@/assets/icon/down-arrow-white.svg"
              alt="down-arrow"
            />+7</span> </h3>
      </div> -->

      <div class="white-content bet-game">
        <div class="left_pic">
          <img src="@/assets/image/point.png" alt="point" />
        </div>
        <div v-html="computerDetails.data.bottomText[0].bottomText"></div>
        <div class="right_pic">
          <img src="@/assets/image/point.png" alt="point" />
        </div>
      </div>
    </div>
    <div v-if="!isLoading && computerDetails.length === 0">
      <p class="notification">No sportsbooks available for this league.</p>
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
import LeagueListTeams from "@/components/teama-vs.teamb-picks-odds-trends/LeagueList";
import LineTracking from "@/components/teama-vs.teamb-picks-odds-trends/LineTracking.vue";
import ConsensusDetail from "@/components/teama-vs.teamb-picks-odds-trends/ConsensusDetail.vue";

export default {
  name: "TeamAvsTeamB",
  components: {
    LeagueListTeams,
    LineTracking,
    ConsensusDetail,
    LeftPanelVue,
    RightPanelVue,
  },
  async asyncData({ $axios, req, params, store }) {
    $axios.onRequest((config) => {
      config.headers.Origin = req.headers.host;
    });
    const clientData = store.getters["default/getClient"];

    const teams = params.teams?.replace("-picks-odds-trends", "");

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

    const bonuses = store.getters["default/getWidgetListing"];

    const payload = {
      homeTeam: teamB,
      awayTeam: teamA,
      league: params.league,
    };
    const response = await store.dispatch(
      "computerpicks/detailsApiCall",
      payload
    );

    const computerDetails = response;
    const leagues = response.data.lineData;
    const consensusData = response.data.consensusData;
    const lineTrackingData = response.data.lineTrackingData;
    const gameLogs = response.data.gameLogs;

    let faviconVal = ''; 
    for (const ky in store.getters["default/getTypeConfigs"]) {
      if (store.getters["default/getTypeConfigs"][ky].field_name === 'homepage_favicon_image') {
        faviconVal = store.getters["default/getTypeConfigs"][ky].field_value;
      }
    }

    const mainData = {
      title: response.meta.metaTitle,
      description: response.meta.metaDescription,
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
      teams,
      teamA,
      teamB,
      headData,
      bonuses,
      computerDetails,
      leagues,
      consensusData,
      lineTrackingData,
      gameLogs,
    };
  },
  data() {
    return {
      isLoading: false,
      currentTab: "Consensus",
      bonusLoaded: true,
    };
  },
  head() {
    return this.headData;
  },
  methods: {
    tabClick(tabName) {
      this.currentTab = tabName;
    },
    getDetailUrl(type) {
      const awayTeam = this.teamA.replaceAll(" ", "-").toLowerCase();
      const homeTeam = this.teamB.replaceAll(" ", "-").toLowerCase();

      let league = "";
      if (this.$route.params.league) {
        league = this.$route.params.league;
      }

      const suffixTxt =
        type === "line-tracking"
          ? "line-movement"
          : "public-betting-splits-picks";

      return `/${league}/${type}/${awayTeam}-vs-${homeTeam}-${suffixTxt}`;
    },
  },
  computed: {
    imagePopu() {
      return require(`../../../assets/icon/${
        this.computerDetails.data.prediction.isTotalLineOver
          ? "up-arrow-white.svg"
          : "down-arrow-white.svg"
      }`);
    },
  },
};
</script>

<style lang="scss" scoped>
.computer-picks-detail {
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
    max-width: 1171px;
    margin: 0 auto;

    .video-and-promotion {
      background: #ffffff;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      padding: 12px;
      display: grid;
      grid-template-columns: calc(100% - 6px) calc(100% - 6px);
      grid-column-gap: 12px;
      @media all and (max-width: 767px) {
        grid-template-columns: 100%;
        grid-column-gap: 0px;
        grid-row-gap: 12px;
      }
      h1 {
        grid-column: 1 / span 2;
        color: #000000;
        font-style: normal;
        font-weight: 700;
        margin-bottom: 15px;
        font-size: 20px;
        @media all and (max-width: 767px) {
          grid-column: 1;
        }
      }

      .video-part {
        line-height: 0px;
      }
    }

    .replenish {
      display: flex;
      align-items: center;
      display: -webkit-flex;
      -webkit-align-items: center;
      margin-top: 16px;
      font-size: 16px;
      padding: 9px 8px;
      border-radius: 5px;
      border: 1px solid #ffbcc4;
      background: #fff6f7;
      color: #db001a;
      span {
        line-height: 0px;
        max-width: 20px;
        margin-right: 10px;
        position: relative;
        img {
          max-width: 100%;
        }
        div {
          position: absolute;
          width: 270px;
          left: 50%;
          transform: translateX(-50%);
          -webkit-transform: translateX(-50%);
          background: black;
          line-height: 21px;
          bottom: 30px;
          border-radius: 3px;
          color: #fff;
          font-size: 16px;
          text-align: left;
          display: none;
          padding: 10px;
          @media all and (max-width: 1024px) {
            transform: initial;
            -webkit-transform: initial;
            left: -10px;
          }
          &::after {
            content: "";
            border: 9px solid;
            position: absolute;
            bottom: -18px;
            left: 50%;
            transform: translateX(-50%);
            -webkit-transform: translateX(-50%);
            border-color: black transparent transparent;
            @media all and (max-width: 1024px) {
              transform: initial;
              -webkit-transform: initial;
              left: 12px;
            }
          }
        }
        &:hover {
          div {
            display: block;
          }
        }
      }
    }

    .promotion-part {
      .single-banner {
        width: 100%;
        img {
          width: 100%;
        }
        a {
          width: 100%;
        }
        text-align: center;
        line-height: 0px;
        margin-bottom: 12px;
        margin-top: 12px;
        margin-top: 12px;
        overflow: hidden;
        display: flex;
        display: -webkit-flex;
        justify-content: center;
        -webkit-justify-content: center;
        align-items: center;
        -webkit-align-items: center;
        // &:last-child {
        //   margin-bottom: 0;
        // }
      }
    }

    .sportbook-listing {
      margin-top: 16px;
      background-color: #ffffff;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      padding: 12px;

      .title-list {
        background: #ebebeb;
        color: #000;
        padding: 15px;
        border-radius: 5px;
        font-size: 16px;
        font-weight: 600;
      }
      .sportlist {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 10px 10px;
        border-bottom: #e0e0e0 solid thin;

        &:first-child {
          border-top: #e0e0e0 solid thin;
        }

        @media screen and (max-width: 767px) {
          flex-wrap: wrap;
        }
        @media screen and (min-width: 1025px) and (max-width: 1400px) {
          flex-wrap: wrap;
        }

        .leftbook {
          flex: 0 0 60%;
          flex-shrink: 1;
          flex-direction: row;
          display: flex;
          align-items: center;
          margin-right: 10px;

          @media screen and (max-width: 767px) {
            flex: 0 0 100%;
          }
          @media screen and (min-width: 1025px) and (max-width: 1400px) {
            flex: 0 0 100%;
          }

          .imgpart {
            width: 50px;
            min-width: 50px;
            height: 50px;
            overflow: hidden;
            border-radius: 6px;
            margin-right: 15px;

            img {
              height: 100%;
              width: 100%;
              object-fit: cover;
              object-position: top center;
            }
          }

          .contpart {
            width: calc(100% - 50px);
            span.subhed {
              font-size: 14px;
              font-weight: 500;
              color: #000000;
              @media screen and (max-width: 767px) {
                font-size: 14px !important;
              }
            }
            p.subcont {
              font-size: 16px;
              font-weight: 500;
              color: #000000;

              @media screen and (max-width: 767px) {
                font-size: 14px !important;
              }
            }
          }
        }

        .rightbook {
          flex: 0 0 40%;
          flex-shrink: 1;

          @media screen and (max-width: 767px) {
            flex: 0 0 100%;
          }
          @media screen and (min-width: 1025px) and (max-width: 1400px) {
            flex: 0 0 100%;
          }

          .offerbtn {
            display: flex;
            margin-top: 15px;
            gap: 5px;

            a {
              text-decoration: none;
              flex: 0 0 50%;
              flex-shrink: 1;
              flex-direction: column;
              display: flex;
              justify-content: center;
              background: #ebebeb;
              padding: 8px 12px;
              text-align: center;
              border-radius: 5px;
              margin-right: 10px;

              .codepromo {
                color: #000;
                font-size: 15px;
                text-transform: uppercase;
                font-weight: 600;
                @media screen and (min-width: 1026px) and (max-width: 1299px) {
                  font-size: 12px;
                }
              }
              .codetext {
                font-size: 10px;
                color: #000;
              }
            }

            .claimoffer {
              text-decoration: none;
              flex: 0 0 50%;
              flex-shrink: 1;
              background: #fa8c28;
              color: #ffffff;
              padding: 12px;
              font-size: 15px;
              font-weight: 600;
              border-radius: 5px;
              @media screen and (min-width: 1026px) and (max-width: 1299px) {
                font-size: 12px;
              }
            }
          }
        }
      }
      .no-bonus {
        text-align: center;
        padding-bottom: 15px;
        padding-top: 15px;
      }

      .sportlist + .sportlist {
        border-bottom: #e0e0e0 solid thin;
      }
    }

    .teams {
      line-height: 2.5;
    }
    .content {
      background: #ffffff;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      padding: 12px;
      margin-top: 16px;
      h2 {
        color: #000000;
        font-style: normal;
        font-weight: 700;
        margin-bottom: 15px;
        font-size: 20px;
      }
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
          &.nuxt-link-active {
            background: #fa8c28;
            font-weight: 700;
            color: #ffffff;
          }
        }
      }
      .headline {
        color: #000000;
        font-style: normal;
        font-weight: 700;
        font-size: 20px;
        margin-bottom: 10px;
        a {
          color: #000000;
        }
      }
      .listings {
        ul {
          li {
            list-style-type: none;
            color: #000000;
            font-size: 15px !important;
            line-height: 26px !important;
            padding: 10px 0;
            border-bottom: 1px solid #e0e0e0;
          }
        }
      }
      .tabs-parent {
        .tabs {
          a {
            cursor: pointer;
            &.active {
              background: #fa8c28;
              font-weight: 700;
              color: #ffffff;
            }
          }
        }
      }

      .blue-table {
        table {
          background: #ffffff;
          border-spacing: 0;
          border-collapse: separate;
          width: 100%;
          @media screen and (max-width: 1024px) {
            margin: 0 0 16px !important;
          }
          tr th,
          tr td {
            border-right: 0.5px solid #e0e0e0;
            border-bottom: 0.5px solid #e0e0e0;
            &:first-child {
              border-left: 0.5px solid #e0e0e0;
            }
          }
          tr th {
            background: #eee;
            border-top: 0.5px solid #e0e0e0;
            text-align: left;
          }

          /* top-left border-radius */
          tr:first-child th:first-child {
            border-top-left-radius: 4px;
          }

          /* top-right border-radius */
          tr:first-child th:last-child {
            border-top-right-radius: 4px;
          }

          /* bottom-left border-radius */
          tr:last-child td:first-child {
            border-bottom-left-radius: 4px;
          }

          /* bottom-right border-radius */
          tr:last-child td:last-child {
            border-bottom-right-radius: 4px;
          }
          thead {
            font-style: normal;
            font-weight: 600;
            font-size: 14px;
            line-height: 12px;
            text-transform: uppercase;

            color: #ffffff;
            tr {
              th {
                padding: 10px 10px;
                background: #2e305c;
                white-space: nowrap;
                @media screen and (max-width: 959px) {
                  font-size: 14px !important;
                }
                &.date {
                  width: 10%;
                  text-align: center;
                }
                &.desc {
                  width: 40%;
                }
                &.delta {
                  width: 17%;
                }
                &.buck {
                  width: 23%;
                  text-align: center;
                }
              }
            }
          }
          tbody {
            tr {
              td {
                padding: 10px 8px;
                font-size: 15px;
                white-space: nowrap;
                color: #000000;
                font-weight: 400;
                @media screen and (max-width: 959px) {
                  font-size: 14px !important;
                  font-weight: 500;
                }
                @media screen and (max-width: 600px) {
                  padding: 10px 8px !important;
                }
                &.date {
                  font-style: normal;
                  text-align: center;
                }
                &.desc {
                  font-style: normal;
                  /* or 130% */
                  .text {
                    cursor: pointer;
                    font-weight: 500;
                    color: #079d30;
                  }

                  color: #000000;
                }
                &.delta {
                  font-style: normal;
                  text-align: center;
                  &.pos {
                    color: #079d30;
                  }
                  &.neg {
                    color: #eb0d0d;
                  }
                }
                &.buck {
                  text-align: center;
                }
              }
            }
          }
        }
      }
    }
    .white-content {
      background: #ffffff;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      padding: 12px;
      margin-top: 16px;
      h2 {
        color: #000000;
        font-style: normal;
        font-weight: 700;
        margin-bottom: 15px;
        font-size: 20px;
      }
      h3 {
        color: #000000;
        font-style: normal;
        font-weight: 700;
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
      &.differ-part {
        background: #666dff;
        padding: 7px 12px;
        @media all and (max-width: 340px) {
          padding: 12px;
        }
        a {
          color: #fff;
          text-decoration: none;
        }
        img {
          width: 12px;
          line-height: 0;
          margin-right: 8px;
        }
        .preOrange {
          background: #fa8c28;
        }
        h3 {
          color: #fff;
          span {
            padding: 4px 10px;
            display: inline-block;
            border-radius: 3px;
            margin-left: 15px;
            margin-right: 15px;
            @media all and (max-width: 340px) {
              margin-left: 10px;
              margin-right: 10px;
              margin-top: 10px;
            }
          }
        }
      }
      .injuries-table {
        width: 100%;
        background: #fafaff;
        border: 0.5px solid #e4e4ed;
        border-radius: 8px;
        overflow: hidden;
        table {
          border-spacing: 0;
          width: 100%;
          tbody {
            tr {
              td {
                padding: 11px 0 11px 10px;
                font-size: 16px;
                font-weight: 400;
                @media all and (max-width: 960px) {
                  font-size: 16px !important;
                  padding: 10px;
                }
                @media all and (max-width: 767px) {
                  display: block;
                  padding: 7px 10px !important;
                }
              }

              @media all and (max-width: 767px) {
                padding: 10px;
                display: block;
              }
            }
            tr + tr td {
              border-top: 1px solid #e0e0e0;
              @media all and (max-width: 767px) {
                border: none;
              }
            }
            tr + tr {
              @media all and (max-width: 767px) {
                border-top: 1px solid #e0e0e0;
                display: block;
              }
            }
          }
        }
      }
      &.bet-game {
        text-transform: uppercase;
        text-align: center;
        font-size: 20px;
        font-weight: 500;
        display: flex;
        display: -webkit-flex;
        align-items: center;
        -webkit-align-items: center;
        justify-content: center;
        -webkit-justify-content: center;
        span {
          color: #fa8c28;
          margin: 0 10px;
        }
        img {
          max-width: 100%;
        }
        .left_pic {
          max-width: 25px;
          margin-right: 15px;
          line-height: 0px;
          position: relative;
        }
        .right_pic {
          max-width: 25px;
          margin-left: 15px;
          transform: rotateY(180deg);
          -webkit-transform: rotateY(180deg);
          line-height: 0px;
        }
      }
    }
  }
  .mb-0 {
    margin-bottom: 0px !important;
  }
  .middle-panel + .left-panel {
    margin-left: 10px;
    margin-right: 0;
    .email-form {
      display: none !important;
    }
  }
  @media screen and (max-width: 768px) {
    padding: 16px;
    background-color: #ffffff;
    .middle-panel {
      min-width: 100%;
    }
  }
}
</style>
