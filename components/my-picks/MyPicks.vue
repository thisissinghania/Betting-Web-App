<template>
  <div class="my-pending-picks">
    <div class="content">
      <div class="table-responsive">
        <table>
          <thead>
            <tr>
              <th class="date">DATE</th>
              <th class="detail">PICK DETAIL</th>
              <th class="risk">RISK</th>
              <th class="towin">WIN</th>
              <th class="result">RESULTS</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, index) in currentData"
              :key="'pending-pick-' + index"
            >
              <td class="date">{{ item.pickDate }}</td>
              <td class="detail">
                <div>
                  <span
                    class="text text-ellipse-mobile"
                    @click="detailModal(item.id)"
                    >{{ item.pickDetail }}</span
                  >
                  <span
                    v-if="item.pickToolTip !== ''"
                    class="badge"
                    :style="{ background: randomColor() }"
                    v-tooltip="{
                      content: item.pickToolTip,
                    }"
                    >{{ item.gameType }}</span
                  >
                  <span
                    v-if="item.gameStatus && item.gameStatus !== ''"
                    class="badge"
                    :style="{ background: randomColor() }"
                    v-tooltip="{
                      content: item.gameStatusTitle,
                    }"
                    >{{ item.gameStatus }}</span
                  >
                </div>
              </td>
              <td class="risk">${{ item.pickValue }}</td>
              <td class="towin">${{ item.winAmt }}</td>
              <td class="result">
                <div>
                  <img
                    v-if="picksType === 'pending'"
                    v-tooltip="{
                      content: 'Need to Forfeit?',
                    }"
                    alt="lamp"
                    class="cross"
                    src="@/assets/icon/cross.svg"
                    @click="forFit(item.id)"
                  />
                  <img
                    v-if="picksType !== 'pending' && item.pickStatus === 1"
                    v-tooltip="{
                      content: 'Pick Won',
                    }"
                    src="@/assets/icon/prize_green.png"
                    alt="prize_green"
                  />
                  <img
                    v-if="picksType !== 'pending' && item.pickStatus === 2"
                    v-tooltip="{
                      content: 'Pick Lost',
                    }"
                    src="@/assets/icon/thumb_down.png"
                    alt="thumb_down"
                  />
                  <span
                    v-if="picksType !== 'pending' && item.pickStatus === 3"
                    v-tooltip="{
                      content: 'Pick Pushed',
                    }"
                  >
                    -
                  </span>
                  <img
                    v-if="picksType !== '7d-picks-last-week'"
                    v-tooltip="{
                      content: 'Pick Scored Wrong?',
                    }"
                    class="lamp"
                    alt="lamp"
                    src="@/assets/icon/lamp.svg"
                    @click="goToNewTicket(item.id)"
                  />
                </div>
              </td>
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
        <Pagination
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
      <modal
        class="my-custom-modal my-pending-picks-detail-modal"
        name="detail-modal"
      >
        <div class="modal-content" v-if="!isDetailModalLoading">
          <div class="header mobilenew">
            <h1 class="date-time">{{ pickDetails.gameTime }}</h1>
            <img
              alt="cross"
              src="@/assets/icon/cross-gray.png"
              @click="hideModal('detail')"
            />
          </div>
          <div class="body">
            <div class="table-responsive">
              <table>
                <thead>
                  <tr>
                    <th class="green-bay">{{ pickDetails.awayTeam }}</th>
                    <th class="chicago">{{ pickDetails.homeTeam }}</th>
                  </tr>
                </thead>
                <tbody>
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
                        <span
                          v-if="
                            pickDetails.betLine === 'awayStraight' &&
                            pickDetails.gameStatus && pickDetails.gameStatus !== ''
                          "
                          class="badge"
                          :style="{ background: randomColor() }"
                          v-tooltip="{
                            content: pickDetails.gameStatusTitle,
                          }"
                        >
                          {{ pickDetails.gameStatus }}
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
                        <span
                          v-if="
                            pickDetails.betLine === 'homeStraight' &&
                            pickDetails.gameStatus && pickDetails.gameStatus !== ''
                          "
                          class="badge"
                          :style="{ background: randomColor() }"
                          v-tooltip="{
                            content: pickDetails.gameStatusTitle,
                          }"
                        >
                          {{ pickDetails.gameStatus }}
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
                        <span
                          v-if="
                            pickDetails.betLine === 'awayMoney' &&
                            pickDetails.gameStatus && pickDetails.gameStatus !== ''
                          "
                          class="badge"
                          :style="{ background: randomColor() }"
                          v-tooltip="{
                            content: pickDetails.gameStatusTitle,
                          }"
                        >
                          {{ pickDetails.gameStatus }}
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
                        <span
                          v-if="
                            pickDetails.betLine === 'homeMoney' &&
                            pickDetails.gameStatus && pickDetails.gameStatus !== ''
                          "
                          class="badge"
                          :style="{ background: randomColor() }"
                          v-tooltip="{
                            content: pickDetails.gameStatusTitle,
                          }"
                        >
                          {{ pickDetails.gameStatus }}
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
                        <span
                          v-if="
                            pickDetails.betLine === 'awayOverUnder' &&
                            pickDetails.gameStatus && pickDetails.gameStatus !== ''
                          "
                          class="badge"
                          :style="{ background: randomColor() }"
                          v-tooltip="{
                            content: pickDetails.gameStatusTitle,
                          }"
                        >
                          {{ pickDetails.gameStatus }}
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
                        <span
                          v-if="
                            pickDetails.betLine === 'homeOverUnder' &&
                            pickDetails.gameStatus && pickDetails.gameStatus !== ''
                          "
                          class="badge"
                          :style="{ background: randomColor() }"
                          v-tooltip="{
                            content: pickDetails.gameStatusTitle,
                          }"
                        >
                          {{ pickDetails.gameStatus }}
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
                  <tr class="score resultrow" v-if="pickDetails.isCompleted">
                    <td colspan="2">
                      Result:   
                      <span v-if="pickDetails.result === 'Win'" class="success">{{ pickDetails.result }}</span>
                      <span v-else-if="pickDetails.result === 'Loss'" class="lose">{{ pickDetails.result }}</span>
                      <span v-else >{{ pickDetails.result }}</span>
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
      <modal
        class="my-custom-modal my-pending-picks-delete-modal"
        name="delete-modal"
      >
        <div class="modal-content">
          <img src="@/assets/icon/user-trash.png" alt="user-trash" />
          <h1 class="heading">Are you sure?</h1>
          <p class="info">Are you sure you want to forfeit this pick?</p>
          <span
            class="btn btn-yes"
            @click="forfitApi()"
            :class="`${forFixDisabled ? 'disabled' : ''}`"
            >YES, CONTINUE</span
          >
          <span class="btn btn-no" @click="hideModal('delete')"
            >NO, DON'T FORFEIT IT</span
          >
        </div>
      </modal>
    </client-only>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";

import Pagination from "@/components/common/PaginationPage.vue";

export default {
  name: "MyPicks",
  components: { Pagination },
  props: ["picksType"],
  data() {
    return {
      type: "scores",
      isLoading: true,
      colors: [
        "#6E37E3",
        "#FF1C74",
        "#37B0E3",
        "#0FAE3B",
        "#000000",
        "#F1B93F",
        "#E33737",
        "#96694F",
      ],
      meta: {
        metaTitle: "",
        metaDescription: "",
        sharingImage: "",
      },
      isDetailModalLoading: true,
      pickDetails: {},
      forFitId: "",
      noPickDetailMsg: "",
      forFixDisabled: false,
    };
  },
  head() {
    return {
      charset: "utf-16",
      viewport: "width=500, initial-scale=1",
      title: this.meta.metaTitle,
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.meta.description,
        },
        {
          name: "og:title",
          hid: "og:title",
          content: this.meta.metaTitle,
        },
        {
          name: "og:description",
          hid: "og:description",
          content: this.meta.description,
        },
        {
          name: "og:type",
          hid: "og:type",
          content: "website",
        },
        {
          name: "og:image",
          hid: "og:image",
          content: this.meta.sharingImage,
        },
        {
          name: "og:image:url",
          hid: "og:image:url",
          content: this.meta.sharingImage,
        },
      ],
    };
  },
  computed: {
    ...mapState("mypicks", {
      currentPage: (state) => state.currentPage,
      pageSize: (state) => state.pageSize,
    }),
    ...mapGetters("mypicks", ["currentData", "totalPages", "totalCount"]),
    fromIndex() {
      return this.pageSize * (this.currentPage - 1) + 1;
    },
    toIndex() {
      const endIndex = this.pageSize * this.currentPage;
      return endIndex > this.totalCount ? this.totalCount : endIndex;
    },
  },
  async beforeMount() {
    const params = {
      type: (this.picksType === '7d-picks-last-week') ? 'previous' : this.picksType,
      page: this.$route.query.page ? this.$route.query.page : 1,
    };

    if (this.$route.params.username) {
      params.username = this.$route.params.username;
    }
    
    const response = await this.$store.dispatch("mypicks/apiChallangePicks", params);

    if(response.code === 404) {
      return this.$nuxt.error({ statusCode: 404, message: response.message });
    }

    this.meta.metaTitle = this.$store.getters["mypicks/getMetaData"].title;
    this.meta.metaDescription =
      this.$store.getters["mypicks/getMetaData"].description;
    this.meta.sharingImage =
      this.$store.getters["default/getClient"].sharingImage;
    this.isLoading = false;
  },
  methods: {
    ...mapActions("mypicks", ["setPage", "selectPick"]),
    goPage(page) {
      if (this.$route.params.username) {
        window.location.href = '/' + this.$route.params.username + "/my-picks/" + this.picksType + "?page=" + page;
      } else {
        window.location.href = "/my-picks/" + this.picksType + "?page=" + page;
      }
    },
    randomColor() {
      const cnt = this.colors.length;
      const index = Math.floor(Math.random() * cnt);

      return this.colors[index];
    },
    forFit(pickId) {
      this.forFitId = pickId;
      this.$modal.show("delete-modal");
    },
    showModal(key) {
      this.$modal.show(key + "-modal");
    },
    hideModal(key) {
      this.$modal.hide(key + "-modal");
    },
    async detailModal(pickId) {
      this.$modal.show("detail-modal");

      this.isDetailModalLoading = true;

      const response = await this.$store.dispatch("mypicks/apiPicksDetail", {
        id: pickId,
      });

      this.isDetailModalLoading = false;
      if (response.code === 400) {
        this.pickDetails = [];
        this.noPickDetailMsg = response.message;
      } else {
        this.pickDetails = response.data;
      }
    },
    async forfitApi() {
      this.forFixDisabled = true;

      if (!this.forFitId) {
        alert(
          "It appears that we have encountered an unexpected problem. Please try again."
        );
        window.location.reload();
      }

      const response = await this.$store.dispatch("mypicks/apiForFit", {
        id: this.forFitId,
      });

      if (response.code === 400) {
        alert(response.message);
        window.location.reload();
      } else {
        window.location.reload();
      }
    },
    goToNewTicket(pick) {
      window.location.href = `/support-ticket/new/${pick}/pick`;
    },
  },
  // eslint-disable-next-line vue/order-in-components
  created() {
    const { page } = this.$route.query;
    if (page) {
      this.setPage(Number(page));
    }
  },
};
</script>

<style lang="scss" scoped>
.my-pending-picks {
  margin-top: 16px;
  .my-pending-picks-detail-modal {
    .notfound {
      font-weight: bold;
      text-align: center;
      margin-top: 10%;
      margin-bottom: 10%;
    }
  }
  .modal-footer {
    border-top: 0.5px solid #e0e0e0;
    padding: 15px 0 0;
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
  .modal-content {
    .notfound {
      font-weight: bold;
      text-align: center;
      margin-top: 10%;
      margin-bottom: 10%;
    }
  }
  .modal-content {
    .badge {
      min-width: 16px;
      width: 16px;
      height: 16px;
      border-radius: 500px;
      color: #ffffff;
      font-style: normal;
      font-weight: 700;
      font-size: 6px;
      line-height: 7px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: red;
    }

    table {
      .resultrow {
        font-weight: 500 !important;
        span.success {
          color: #20a013;
          font-weight: 500 !important;
        }
        span.lose {
          color: #e40808;
          font-weight: 500 !important;
        }
      }
    }
  }
  .notfound {
    font-weight: bold;
    text-align: center;
    margin-top: 10%;
    margin-bottom: 10%;
  }
  .content {
    margin-top: 16px;
    background: #ffffff;
    border-radius: 8px;
    padding: 12px;
    .notfound {
      font-weight: bold;
      text-align: center;
      margin-top: 10px;
    }
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
        background: #fafafa;
        border-top: 0.5px solid #e0e0e0;
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
        tr {
          th {
            font-style: normal;
            font-weight: 700;
            font-size: 14px;
            line-height: 17px;
            /* identical to box height */
            text-align: center;
            text-transform: uppercase;
            color: #000000;
            padding: 12px 16px;
            white-space: nowrap;

            @media screen and (max-width: 959px) {
              font-size: 14px !important;
              font-weight: 600 !important;
            }
            &.date {
              width: 15%;
            }
            &.risk,
            &.result,
            &.towin {
              width: 12%;
            }
            &.detail {
              width: 49%;
            }
          }
        }
      }
      tbody {
        tr {
          td {
            padding: 10px 8px;
            font-size: 15px;
            line-height: 18px;
            white-space: nowrap;
            color: #000000;

            @media screen and (max-width: 959px) {
              font-size: 14px !important;
              font-weight: 600 !important;
            }
            &.date {
              font-style: normal;
              /* identical to box height */
              text-align: center;
              text-transform: uppercase;
              color: #000000;
            }
            &.risk,
            &.towin {
              font-style: normal;
              /* identical to box height */
              text-align: center;
              text-transform: uppercase;
              color: #000000;
            }
            &.detail {
              div {
                display: flex;
                align-items: flex-end;
                gap: 12px;
                .text {
                  font-style: normal;
                  cursor: pointer;
                  text-decoration-line: underline;
                  color: #000000;
                  @media screen and (max-width: 959px) {
                    font-size: 14px !important;
                  }
                }

                .text-ellipse-mobile {
                  width: 140px;
                  white-space: nowrap;
                  text-overflow: ellipsis;
                  overflow: hidden;
                  text-decoration: none;

                  @media screen and (max-width: 767px) {
                    font-size: 16px !important;
                  }

                  &:hover {
                    width: auto;
                    white-space: normal;
                  }
                }

                .badge {
                  min-width: 16px;
                  width: 16px;
                  height: 16px;
                  border-radius: 500px;
                  color: #ffffff;
                  font-style: normal;
                  font-weight: 700;
                  font-size: 6px;
                  line-height: 7px;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  background-color: red;
                }
              }
            }
            &.result {
              div {
                display: flex;
                justify-content: space-around;
                align-items: center;
                img {
                  cursor: pointer;
                  @media screen and (max-width: 767px) {
                    width: 20px;
                  }
                }
                span {
                  cursor: pointer;
                }
              }
            }
          }
        }
      }
    }
  }
  @media screen and (max-width: 767px) {
    .content {
      padding: 0;
      table tbody tr td.result div {
        // flex-direction: column;
        gap: 8px;
      }
    }
  }
}
</style>
