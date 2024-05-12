<template>
  <div class="scores">
    <left-panel-vue />
    <div class="middle-panel">
      <slider-comp :type="type" />
      <div class="tabs">
        <a
          v-for="(ltype, index) in this.getCurrentLeagueData()"
          :key="'linetype-' + index"
          :class="getTypeHead() === ltype.urlSlug ? 'active' : ''"
          :href="getTypeUrl(ltype.urlSlug)"
          >{{ ltype.titleDsp }}</a
        >
      </div>
      <div class="content">
        <div class="list">
          <div
            class="item"
            v-for="(score, index) in currentData"
            :key="'score-' + index"
          >
            <div class="head">
              <div class="left">
                <span class="date-time">{{ score.gameDateTime }}</span>
                <span
                  class="first"
                  v-if="score.tag"
                  :style="{ background: randomColor() }"
                  v-tooltip="{
                    content: score.tagTitle,
                  }"
                  >{{ score.tag }}</span
                >
              </div>
              <div class="right">
                <span class="second">{{ score.is_final ? 'FINAL' : '-' }}</span>
              </div>
            </div>
            <div class="body">
              <div class="forest" :class="`${
        score.who_win == 2 ? 'winbold' : ''
      }`">
                <span class="left">{{ score.away_team_name }}</span>
                <span class="right">{{ score.awayScore }}</span>
              </div>
              <div class="united" :class="`${
        score.who_win == 1 ? 'winbold' : ''
      }`">
                <span class="left">{{ score.home_team_name }}</span>
                <span class="right">{{ score.homeScore }}</span>
              </div>
            </div>
          </div>
        </div>
          <div v-if="!isLoading && currentData.length === 0">
            <p class="notification">No scores available for this league.</p>
          </div>
        <div v-else-if="isLoading" class="notfound">
          <v-progress-circular
            color="primary"
            indeterminate
            :size="55"
            :width="8"
          ></v-progress-circular>
        </div>
        <pagination-vue
          :from-index="fromIndex"
          :to-index="toIndex"
          :total-count="totalCount"
          :total-pages="totalPages"
          :current-page="currentPage"
          @goPage="goPage"
          v-if="currentData.length > 0"
        />
      </div>
      <!-- <img src="@/assets/image/image 5.png" alt="image 5" class="bottom-img" /> -->
    </div>
    <right-panel-vue />
  </div>
</template>
  
  <script>
import { mapState, mapGetters, mapActions } from 'vuex'
import LeftPanelVue from '@/components/common/LeftPanel.vue'
import RightPanelVue from '@/components/common/RightPanel.vue'
import PaginationVue from '@/components/common/PaginationPage.vue'
import SliderComp from '@/components/common/DefaultSlider.vue'
export default {
  name: 'Scores',
  components: {
    LeftPanelVue,
    RightPanelVue,
    PaginationVue,
    SliderComp,
  },
  data() {
    return {
      type: 'scores',
      isLoading: true,
      colors: [
        '#6E37E3',
        '#FF1C74',
        '#37B0E3',
        '#0FAE3B',
        '#000000',
        '#F1B93F',
        '#E33737',
        '#96694F',
      ],
      meta: {
        metaTitle: '',
        metaDescription: '',
        sharingImage: '',
      },
    }
  },
  head() {
    return {
      charset: 'utf-16',
      viewport: 'width=500, initial-scale=1',
      title: this.meta.metaTitle,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.meta.metaDescription,
        },
        {
          name: 'og:title',
          hid: 'og:title',
          content: this.meta.metaTitle,
        },
        {
          name: 'og:description',
          hid: 'og:description',
          content: this.meta.metaDescription,
        },
        {
          name: 'og:type',
          hid: 'og:type',
          content: 'website',
        },
        {
          name: 'og:image',
          hid: 'og:image',
          content: this.meta.sharingImage,
        },
        {
          name: 'og:image:url',
          hid: 'og:image:url',
          content: this.meta.sharingImage,
        },
      ],
    }
  },
  computed: {
    ...mapState('scores', {
      currentPage: (state) => state.currentPage,
      pageSize: (state) => state.pageSize,
    }),
    ...mapGetters('scores', ['currentData', 'totalPages', 'totalCount']),
    fromIndex() {
      return this.pageSize * (this.currentPage - 1) + 1
    },
    toIndex() {
      const endIndex = this.pageSize * this.currentPage
      return endIndex > this.totalCount ? this.totalCount : endIndex
    },
    getLeagues() {
      const finalLeagues = []

      this.$store.getters['default/getLeagues'].forEach((league) => {
        if (league.urlSlug !== 'next-30' && league.urlSlug !== 'live') {
          finalLeagues.push(league)
        }
      })

      return finalLeagues;
    },
  },
  async beforeMount() {
    const params = {
      league: this.getCurrentLeague(),
      type: this.getTypeHead(),
      page: this.$route.query.page ? this.$route.query.page : 1,
    }
    await this.$store.dispatch('scores/apiCall', params)

    this.meta.metaTitle = this.$store.getters['scores/getMetaData'].title
    this.meta.metaDescription =
      this.$store.getters['scores/getMetaData'].description
    this.meta.sharingImage =
      this.$store.getters['default/getClient'].sharingImage
    this.isLoading = false;
  },
  methods: {
    ...mapActions('scores', ['setPage']),
    goPage(page) {
      window.location.href =
        '/' +
        this.getCurrentLeague() +
        '/scores' +
        this.getType() +
        '?page=' +
        page
    },
    randomColor() {
      const cnt = this.colors.length
      const index = Math.floor(Math.random() * cnt)
      return this.colors[index]
    },
    getCurrentLeague() {
      let league = ''
      if (this.$route.params.league) {
        league = this.$route.params.league
      } else {
        league = this.getLeagues[0].urlSlug
      }

      return league
    },
    getTypeUrl(type) {
      return '/' + this.getCurrentLeague() + '/scores/' + type
    },
    getType() {
      let type = ''
      if (this.$route.params.type) {
        type = '/' + this.$route.params.type
      } else {
        type = '/full-game'
      }

      return type
    },
    getTypeHead() {
      let type = ''
      if (this.$route.params.type) {
        type = this.$route.params.type
      } else {
        type = 'full-game'
      }

      return type
    },
    getCurrentLeagueData() {
      for (const league in this.getLeagues) {
        if (this.getLeagues[league].urlSlug === this.getCurrentLeague()) {
          return this.getLeagues[league].lineType
        }
      }
    },
  },
  created() {
    const { page } = this.$route.query
    if (page) {
      this.setPage(Number(page))
    }
  },
}
</script>
  
<style lang="scss" scoped>
.scores {
  display: flex;
  justify-content: space-between;
  padding: 24px 32px;
  gap: 24px;
  background-color: #ececec;
  .middle-panel {
    .tabs {
      margin-top: 16px;
      a {
        color: #000000;
        text-decoration: none;
        display: inline-block;
        font-weight: 600;
        font-size: 12px;
        padding: 12px 16px;
        border-radius: 4px;
        background: #e3e3e3;
        border: 0.5px solid #d2d2d2;
        margin-right: 12px;
        @media screen and (max-width: 767px) {
          margin-right: 4px !important;
          padding: 8px 8px !important;
          font-size: 12px !important;
        }
        &.active {
          background: #fa8c28;
          border-color: #fa8c28;
          color: #fff;
        }
      }
    }
    .content {
      background: #ffffff;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      padding: 12px 12.5px 20px;
      margin-top: 16px;
      .notfound {
        font-weight: bold;
        text-align: center;
      }
      .list {
        display: flex;
        flex-wrap: wrap;
        gap: 12px;
        margin-bottom: 20px;
        .item {
          width: calc(100% - 6px);
          border: 0.5px solid #e0e0e0;
          border-radius: 4px;
          .head {
            background: #f5f5f5;
            border-bottom: 0.5px solid #e0e0e0;
            border-radius: 4px 4px 0px 0px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 11px 12px;
            .left {
              $tooltip-background-color: red;
              $tooltip-font-size: 1.875rem;
              $tooltip-text-color: rgb(242, 17, 17);
              display: flex;
              align-items: center;
              .date-time {
                margin-right: 12px;
                font-style: normal;
                font-weight: 700;
                font-size: 14px;
                line-height: 10px;
                /* identical to box height */

                text-transform: uppercase;

                color: #000000;
              }
              .first {
                font-style: normal;
                font-weight: 700;
                font-size: 6px;
                line-height: 7px;
                text-align: center;
                text-transform: uppercase;

                color: #ffffff;
                border-radius: 500px;
                width: 16px;
                height: 16px;
                line-height: 16px;
              }
            }
            .right {
              display: flex;
              align-items: center;
              .second {
                font-style: normal;
                font-weight: 600;
                font-size: 14px;
                line-height: 10px;
                /* identical to box height */

                text-transform: uppercase;

                color: #000000;
              }
            }
          }
          .body {
            padding: 12px;
            .winbold span {
              font-weight: 600;
            }

            & > div {
              display: flex;
              justify-content: space-between;
              span {
                font-style: normal;
                font-weight: 400;
                font-size: 15px !important;
                line-height: 11px;
                /* identical to box height */
                text-transform: uppercase;
                color: #000000;

                @media screen and (max-width: '767px') {
                  font-size: 14px !important;
                }
              }
              &.forest {
                margin-bottom: 12px;
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
  }
  @media screen and (max-width: 768px) {
    background-color: #ffffff;
    padding: 16px;
    .middle-panel {
      min-width: 100%;
      .content {
        .list {
          display: block;
          .item {
            width: 100%;
            margin-bottom: 12px;
          }
        }
      }
    }
  }
}
</style>
  