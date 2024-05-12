<template>
  <div class="balance">
    <left-panel />
    <div class="middle-panel">
      <div class="header" v-if="blueBarData.day">
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
      <div class="top-show" v-if="blueBarData.currentBalance" @click="linkWithTimeStamp('/my-picks/')">
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
      <div class="redeem" v-if="blueBarData.isApplicableForCashOut">
        <img
          src="@/assets/image/hand-cash-gray.png"
          alt="gray hand cash"
          class="img"
        />
        <div class="right">
          <div class="text">
            <h1 class="heading">${{ blueBarData.userCashOutAmt }} cash-out!</h1>
            <p class="info">
              Congrats {{ $auth.user.username }}! You earned your 7 day
              challenge ${{ blueBarData.userCashOutAmt }}
              cash-out!
            </p>
          </div>
          <a href="/redeem" class="btn">REDEEM NOW</a>
        </div>
      </div>
      
      <common-slider :sliderItem=sliderItem />

      <div class="content">
        <div class="table-responsive">
          <table>
            <thead>
              <tr>
                <th class="date">DATE</th>
                <th class="desc">DESCRIPTION</th>
                <th class="buck" colspan="2">BALANCE</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, pageIndex) in currentData" :key="pageIndex">
                <td class="date">{{ item.dateCreated }}</td>
                <td class="desc">
                  {{ item.msg }}
                  <span
                    class="text"
                    v-if="item.isPick"
                    @click="detailModal(item.isPick)"
                  >
                    (view bet)
                  </span>
                </td>
                <td :class="`delta ${item.isDebit ? 'neg' : 'pos'}`">
                  {{ item.amount }}
                </td>
                <td class="buck">{{ item.balance }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-if="!isLoading && currentData.length === 0">
          <p class="notification">No picks are available.</p>
        </div>
        <div v-else-if="isLoading" class="notfound">
          <v-progress-circular
            color="primary"
            indeterminate
            :size="55"
            :width="8"
          ></v-progress-circular>
        </div>
        <client-only>
          <PaginationPage
            :from-index="fromIndex"
            :to-index="toIndex"
            :total-count="totalCount"
            :total-pages="totalPages"
            :current-page="currentPage"
            @goPage="goPage"
            v-if="currentData.length > 0"
          />
        </client-only>
      </div>
      <client-only>
        <modal class="my-custom-modal balance-modal" name="detail-modal">
          <div class="modal-content" v-if="!isDetailModalLoading">
            <div class="modal-header">
              <h1 class="date-time">{{ pickDetails.gameTime }}</h1>
              <img
                src="@/assets/icon/cross-gray.png"
                alt="cross"
                @click="hideModal('detail')"
              />
            </div>
            <div class="body">
              <div class="table-responsive">
                <table>
                  <tbody>
                    <tr>
                      <td class="green-bay">{{ pickDetails.awayTeam }}</td>
                      <td class="chicago">{{ pickDetails.homeTeam }}</td>
                    </tr>
                    <tr class="straight">
                      <td class="green-bay">
                        <div>
                          <span class="title">Straight: </span>
                          <span class="value">{{
                            pickDetails.awayStraight
                          }}</span>
                          <!-- <img src="@/assets/icon/tick-green.png" alt="tick" /> -->
                          <img
                            src="@/assets/icon/done.svg"
                            alt="done"
                            class="donetik"
                            v-if="pickDetails.betLine === 'awayStraight'"
                          />
                          <span
                            v-if="
                              pickDetails.betLine === 'awayStraight' &&
                              pickDetails.pickToolTip !== ''
                            "
                            class="badge"
                            :style="{ background: randomColor() }"
                            v-tooltip="{
                              content: pickDetails.pickToolTip,
                            }"
                          >
                            {{ pickDetails.gameType }}
                          </span>
                        </div>
                      </td>
                      <td class="chicago">
                        <div>
                          <span class="title">Straight: </span>
                          <span class="value">{{
                            pickDetails.homeStraight
                          }}</span>
                          <img
                            src="@/assets/icon/done.svg"
                            alt="done"
                            class="donetik"
                            v-if="pickDetails.betLine === 'homeStraight'"
                          />
                          <span
                            v-if="
                              pickDetails.betLine === 'homeStraight' &&
                              pickDetails.pickToolTip !== ''
                            "
                            class="badge"
                            :style="{ background: randomColor() }"
                            v-tooltip="{
                              content: pickDetails.pickToolTip,
                            }"
                          >
                            {{ pickDetails.gameType }}
                          </span>
                        </div>
                      </td>
                    </tr>
                    <tr class="money">
                      <td class="green-bay">
                        <div>
                          <span class="title">Money: </span>
                          <span class="value">{{ pickDetails.awayMoney }}</span>
                          <img
                            src="@/assets/icon/done.svg"
                            alt="done"
                            class="donetik"
                            v-if="pickDetails.betLine === 'awayMoney'"
                          />
                          <span
                            v-if="
                              pickDetails.betLine === 'awayMoney' &&
                              pickDetails.pickToolTip !== ''
                            "
                            class="badge"
                            :style="{ background: randomColor() }"
                            v-tooltip="{
                              content: pickDetails.pickToolTip,
                            }"
                          >
                            {{ pickDetails.gameType }}
                          </span>
                        </div>
                      </td>
                      <td class="chicago">
                        <div>
                          <span class="title">Money: </span>
                          <span class="value">{{ pickDetails.homeMoney }}</span>
                          <img
                            src="@/assets/icon/done.svg"
                            alt="done"
                            class="donetik"
                            v-if="pickDetails.betLine === 'homeMoney'"
                          />
                          <span
                            v-if="
                              pickDetails.betLine === 'homeMoney' &&
                              pickDetails.pickToolTip !== ''
                            "
                            class="badge"
                            :style="{ background: randomColor() }"
                            v-tooltip="{
                              content: pickDetails.pickToolTip,
                            }"
                          >
                            {{ pickDetails.gameType }}
                          </span>
                        </div>
                      </td>
                    </tr>
                    <tr class="over">
                      <td class="green-bay">
                        <div>
                          <span class="title">Over: </span>
                          <span class="value">{{
                            pickDetails.awayOverUnder
                          }}</span>
                          <img
                            src="@/assets/icon/done.svg"
                            alt="done"
                            class="donetik"
                            v-if="pickDetails.betLine === 'awayOverUnder'"
                          />
                          <span
                            v-if="
                              pickDetails.betLine === 'awayOverUnder' &&
                              pickDetails.pickToolTip !== ''
                            "
                            class="badge"
                            :style="{ background: randomColor() }"
                            v-tooltip="{
                              content: pickDetails.pickToolTip,
                            }"
                          >
                            {{ pickDetails.gameType }}
                          </span>
                        </div>
                      </td>
                      <td class="chicago">
                        <div>
                          <span class="title">Under: </span>
                          <span class="value">{{
                            pickDetails.homeOverUnder
                          }}</span>
                          <img
                            src="@/assets/icon/done.svg"
                            alt="done"
                            class="donetik"
                            v-if="pickDetails.betLine === 'homeOverUnder'"
                          />
                          <span
                            v-if="
                              pickDetails.betLine === 'homeOverUnder' &&
                              pickDetails.pickToolTip !== ''
                            "
                            class="badge"
                            :style="{ background: randomColor() }"
                            v-tooltip="{
                              content: pickDetails.pickToolTip,
                            }"
                          >
                            {{ pickDetails.gameType }}
                          </span>
                        </div>
                      </td>
                    </tr>
                    <tr class="score">
                      <td class="green-bay">
                        <div>
                          <span class="title">Score: </span>
                          <span class="value">{{ pickDetails.awayScore }}</span>
                        </div>
                      </td>
                      <td class="chicago">
                        <div>
                          <span class="title">Score: </span>
                          <span class="value">{{ pickDetails.homeScore }}</span>
                        </div>
                      </td>
                    </tr>
                    <tr class="resultrow">
                      <td colspan="2">
                        Result:
                        <span
                          v-if="pickDetails.result === 'Win'"
                          class="success"
                          >{{ pickDetails.result }}</span
                        >
                        <span
                          v-else-if="pickDetails.result === 'Loss'"
                          class="lose"
                          >{{ pickDetails.result }}</span
                        >
                        <span v-else>{{ pickDetails.result }}</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div class="modal-footer">
              <button @click="hideModal('detail')">Close</button>
            </div>
          </div>
          <div v-if="isDetailModalLoading" class="notfound">
            <v-progress-circular
              color="primary"
              indeterminate
              :size="55"
              :width="8"
            ></v-progress-circular>
          </div>
        </modal>
      </client-only>
      <!-- <img src="@/assets/image/image 5.png" alt="image 5" class="bottom-img" /> -->
    </div>
    <right-panel />
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'

import PaginationPage from '@/components/common/PaginationPage.vue';
import RightPanel from '@/components/common/RightPanel.vue';
import LeftPanel from '@/components/common/LeftPanel.vue';
import CommonSlider from '@/components/common/CommonSlider.vue';

export default {
  name: 'Balance',
  components: { RightPanel, LeftPanel, PaginationPage, CommonSlider },
  middleware: "auth-user",
  data() {
    return {
      isLoading: true,
      meta: {
        metaTitle: '',
        metaDescription: '',
        sharingImage: '',
      },
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
      isDetailModalLoading: true,
      pickDetails: {},
      noPickDetailMsg: '',
      sliderItem: [
        {
          'titleDsp' : 'BALANCE',
          'urlSlug' : '/balance/',
          'isActive': true
        },
        {
          'titleDsp' : 'LAST WEEKS 7D',
          'urlSlug' : '/balance-last-week/',
          'isActive': false
        },
        {
          'titleDsp' : 'PICK POINTS',
          'urlSlug' : '/balance-pick-points/',
          'isActive': false
        },
      ]
    }
  },
  computed: {
    ...mapState('balance', {
      currentPage: (state) => state.currentPage,
      pageSize: (state) => state.pageSize,
    }),
    ...mapGetters('balance', [
      'currentData',
      'totalPages',
      'totalCount',
      'blueBarData',
    ]),
    fromIndex() {
      return this.pageSize * (this.currentPage - 1) + 1
    },
    toIndex() {
      const endIndex = this.pageSize * this.currentPage
      return endIndex > this.totalCount ? this.totalCount : endIndex
    },
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
          content: this.meta.description,
        },
        {
          name: 'og:title',
          hid: 'og:title',
          content: this.meta.metaTitle,
        },
        {
          name: 'og:description',
          hid: 'og:description',
          content: this.meta.description,
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
  async beforeMount() {
    this.$store.dispatch('balance/userBalancePoint')
    const params = {
      page: this.$route.query.page ? this.$route.query.page : 1,
    }
    
    if (this.$route.params.username) {
      params.username = this.$route.params.username;
    }

    const response = await this.$store.dispatch('balance/apiBalance', params)

    if(response.code === 404) {
      return this.$nuxt.error({ statusCode: 404, message: response.message })
    }

    this.meta.metaTitle = this.$store.getters['balance/getMetaData'].title
    this.meta.metaDescription =
      this.$store.getters['balance/getMetaData'].description
    this.meta.sharingImage =
      this.$store.getters['default/getClient'].sharingImage
    this.isLoading = false
  },
  methods: {
    ...mapActions('balance', ['setPage']),
    goPage(page) {
      if (this.$route.params.username) {
        window.location.href = '/' + this.$route.params.username + '/balance?page=' + page
      } else {
        window.location.href = '/balance?page=' + page
      }
    },
    showModal(key) {
      this.$modal.show(key + '-modal')
    },
    hideModal(key) {
      this.$modal.hide(key + '-modal')
    },
    linkWithTimeStamp(link) {
      window.location.href = link + "?t=" + new Date().getTime()
    },
    async detailModal(pickId) {
      this.$modal.show('detail-modal')

      this.isDetailModalLoading = true

      const response = await this.$store.dispatch('mypicks/apiPicksDetail', {
        id: pickId,
      })

      if (response.code === 400 || response.code === 500) {
        this.pickDetails = []
        this.noPickDetailMsg = response.message
        window.location.reload()
      } else {
        this.isDetailModalLoading = false
        this.pickDetails = response.data
      }
    },
    randomColor() {
      const cnt = this.colors.length
      const index = Math.floor(Math.random() * cnt)

      return this.colors[index]
    },
  },
  // eslint-disable-next-line vue/order-in-components
  created() {
    const page = this.$route.query.page
    if (page) {
      this.setPage(Number(page))
    }
  },
}
</script>

<style lang="scss" scoped>
.balance {
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
  .modal-footer {
    padding: 0 15px 15px;
    display: flex;
    display: -webkit-flex;
    justify-content: flex-end;
    -webkit-justify-content: flex-end;
    button {
      padding: 10px 15px;
      background: #6c757d;
      color: #fff;
      border-radius: 2px;
      font-size: 16px;
    }
  }

  .redeem {
    background: linear-gradient(95.98deg, #ebfff8 16.15%, #f9ffe7 83.13%);
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    margin-bottom: 16px;
    padding: 24px;
    display: flex;
    align-items: center;
    gap: 25px;
    @media screen and (min-width: 1024px) and (max-width: 1300px) {
      flex-wrap: wrap;
      gap: 20px;
      justify-content: center;
      flex-direction: column;
    }
    .right {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 30px;
      margin-left: 10px;
      @media screen and (min-width: 1024px) and (max-width: 1300px) {
        flex-wrap: wrap;
        grid-gap: 20px;
        gap: 20px;
        justify-content: center;
        text-align: center;
        flex-direction: column;
        align-items: center;
      }
      .text {
        margin-right: 20px;
        .heading {
          font-style: normal;
          font-weight: 400;
          font-size: 18px;
          line-height: 24px;
          color: #000000;
          margin-bottom: 4px;

          @media screen and (max-width: 767px) {
            font-weight: 500;
          }
        }
        .info {
          font-style: normal;
          font-weight: 400;
          font-size: 15px;
          color: #000;
          @media screen and (max-width: 767px) {
            font-size: 15px !important;
          }
          @media screen and (min-width: 960px) and (max-width: 1023px) {
            font-size: 12px;
          }
        }
      }
      .btn {
        text-decoration: none;
        background: #fa8c28;
        border-radius: 4px;
        padding: 8px 16px;
        font-style: normal;
        font-weight: 600;
        font-size: 12px;
        line-height: 15px;
        color: #ffffff;
        white-space: nowrap;
        &:hover {
          opacity: 0.8;
        }
      }
    }
  }

  .modal-content {
    .badge {
      min-width: 16px;
      width: 16px !important;
      height: 16px !important;
      border-radius: 500px;
      color: #ffffff;
      font-style: normal;
      font-weight: 700;
      font-size: 6px;
      line-height: 7px;
      display: inline;
      justify-content: center;
      align-items: center;
      background-color: red;
      margin-left: 10px;
    }

    table {
      .resultrow {
        span.success {
          color: #20a013;
          font-weight: 600 !important;
        }
        span.lose {
          color: #e40808;
          font-weight: 600 !important;
        }
      }
    }
  }
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
          img {
            @media screen and (max-width: 599px) {
              width: 32px;
            }
          }
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

    .tabs {
      display: flex;
      gap: 6px;
      margin-bottom: 16px;
      background: #ffffff;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      padding: 20px 16px;
      @media screen and (max-width: 767px) {
        padding: 10px 16px;
      }
      span {
        padding: 4.5px 16px;
        border-radius: 100px;
        font-style: normal;
        font-weight: 600;
        font-size: 12px;
        line-height: 15px;
        text-transform: uppercase;
        color: #000;
        background: #f9f9fc;
        cursor: pointer;
        margin-right: 10px;
        &.active {
          color: #ffffff;
          background: #fa8c28;
          a {
            color: #ffffff;
            background: #fa8c28;
          }
        }

        a {
          color: #000;
          text-decoration: none;
        }
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
    .modal-header {
      background: #ffffff;
      padding: 0;
      text-align: left;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 15px;
      h1 {
        text-align: left;
        width: 100%;
        font-size: 18px;
      }
    }
    .content {
      margin-top: 16px;
      background-color: #ffffff;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      padding: 12px;
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
    img.bottom-img {
      width: 100%;
      margin-top: 34px;
    }
  }

  .balance-modal {
    padding: 15px;
    .modal-content {
      .modal-header {
        padding: 15px;
        margin: 0;

        h1.date-time {
          color: #000000;
          font-weight: 500;
        }
      }

      .body {
        padding: 15px;
        table {
          width: 100%;
          border-collapse: collapse;
          tbody {
            tr {
              &:nth-child(even) {
                background: #fff;
              }
              &:nth-child(odd) {
                background: #f1f1f1;
              }
              td {
                padding: 15px !important;
                border: #e3e3e3 solid thin;
                font-size: 15px !important;
                text-transform: capitalize;
                white-space: nowrap;
                font-weight: 500;
                color: #000;

                @media screen and (max-width: 767px) {
                  padding: 15px 10px !important;
                }

                .title {
                  font-size: 15px;
                  font-weight: 500;
                }
                .value {
                  font-size: 15px;
                  font-weight: 500;
                }

                .donetik {
                  margin-left: 10px;
                  width: 22px;
                }
              }
            }
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
          margin-bottom: 0px;
          .item {
            width: 100%;
            padding: 8px;
          }
        }
      }
      .header {
        flex-wrap: wrap;
      }
      .content {
        table {
          thead {
            tr {
              th {
                width: 25% !important;
              }
            }
          }
        }
      }
      img.bottom-img {
        display: none;
      }
    }
  }
}
</style>
