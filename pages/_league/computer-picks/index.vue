<template>
  <div class="pick-resource">
    <left-panel />

    <div class="middle-panel">
      <slider-comp :type="type" />
      <div class="content">
        <div
          v-for="(item, index) in picks"
          :key="`computer-item-${index}`"
          :class="index > 0 ? 'm-top-10' : ''"
          class="item"
        >
          <h1 class="date">{{ index }}</h1>
          <div v-for="(v, k) in item" :key="`computer-item-${k}`" class="slot">
            <div class="body">
              <div class="left">
                <p class="team-a">{{ v.awayTeam }}</p>
                <p class="team-b">{{ v.homeTeam }}</p>
              </div>
              <a class="right" :href="v.pageUrl">
                <img alt="arrow" src="@/assets/icon/arrow-round-yellow.svg" />
              </a>
            </div>
          </div>
        </div>
        <!-- <div
          v-for="(item, index) in picks"
          :key="`computer-item-${index}`"
          class="item"
        >
          <h1 class="date">{{ index }}</h1>
          <div class="game-listing"
              v-for="(v, k) in item"
              :key="`computer-item-${k}`"
          >
            <div class="single-block">
              <div class="title">&nbsp; <a :href="v.pageUrl">>></a></div>
              <div class="third-block">
                <div class="team">{{ v.awayTeam }}</div>
                <div class="or">vs</div>
                <div class="team2">{{ v.homeTeam }}</div>
              </div>
            </div>
          </div>
        </div> -->
        <div v-if="!isLoading && picks.length === 0">
          <p class="notification">
            NO COMPUTER PICKS AVAILABLE FOR THIS LEAGUE.
          </p>
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
      <div class="white-content">
        <h1 v-html="headingTitle"></h1>
        <p v-html="headingContent"></p>
      </div>
    </div>

    <right-panel />
  </div>
</template>

<script>
import RightPanel from "@/components/common/RightPanel.vue";
import LeftPanel from "@/components/common/LeftPanel.vue";
import SliderComp from "@/components/common/DefaultSlider.vue";

export default {
  name: "ComputerPicks",
  components: { RightPanel, LeftPanel, SliderComp },
  async asyncData({ $axios, params, req, store }) {
    //  if (process.server) {
    $axios.onRequest((config) => {
      config.headers.Origin = req
        ? req.headers.host
        : window.location.host.split(":")[0];
    });
    const clientData = store.getters["default/getClient"];

    const getLeagues = store.getters["default/getLeagues"];
    let league = "";
    if (params.league) {
      league = params.league;
    } else if (typeof getLeagues[0] !== "undefined") {
      league = getLeagues[0].urlSlug;
    }

    const response = await store.dispatch("computerpicks/apiCall", { league });

    const picks = response.data;
    const headingContent = response.content;
    const headingTitle = response.title;
    const metaData = store.getters["computerpicks/getPicksMeta"];

    let faviconVal = ''; 
    for (const ky in store.getters["default/getTypeConfigs"]) {
      if (store.getters["default/getTypeConfigs"][ky].field_name === 'homepage_favicon_image') {
        faviconVal = store.getters["default/getTypeConfigs"][ky].field_value;
      }
    }

    const mainData = {
      title: metaData?.metaTitle,
      description: metaData?.metaDescription,
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

    return { headData, picks, headingTitle, headingContent };
  },
  data() {
    return {
      type: "computer-picks",
      isLoading: false,
    };
  },
  head() {
    return this.headData;
  },
  computed: {
    getLeagues() {
      this.$store.commit(
        "default/setLeagues",
        this.$store.getters["default/getComputerLeagues"]
      );

      return this.$store.getters["default/getComputerLeagues"];
    },
  },
};
</script>

<style lang="scss" scoped>
.pick-resource {
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
          margin-top: 15px;
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
  .mb-0 {
    margin-bottom: 0px !important;
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
