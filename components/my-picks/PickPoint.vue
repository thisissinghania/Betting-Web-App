<template>
  <div class="pick-points">
    <div class="content">
      <div class="table-responsive">
        <table>
          <tbody>
            <tr>
              <th class="date">DATE</th>
              <th class="three-points">PICK 3</th>
              <th class="five-points">PICK 5</th>
              <th class="moneyLine-points">MONEYLINE</th>
              <th class="live-points">EXTRA</th>
              <th class="total-points">TOTAL</th>
            </tr>
            <tr
              v-for="(item, index) in getMyPickPoints"
              :key="'point-row-' + index"
            >
              <td class="date">{{ item.date }}</td>
              <td class="three-points">
                <span
                  class="double-divider-span"
                  @click="pickPointDetail(item['3p'])"
                >
                  <span class="texts">
                    <!-- {{ item.three ? `$${item.three.toFixed(2)}` : "-" }} -->
                    {{
                      item["3p"] && item["3p"] !== "-"
                        ? `(${item["3p"].pickCount} of ${item["3p"].total})`
                        : "-"
                    }}
                  </span>
                  <span class="greenclass">
                    {{
                      item["3p"] && item["3p"] !== "-"
                        ? `${item["3p"].point}`
                        : ""
                    }}
                  </span>
                </span>
              </td>
              <td class="five-points">
                <span
                  class="double-divider-span"
                  @click="pickPointDetail(item['5p'])"
                >
                  <span class="texts">
                    {{
                      item["5p"] && item["5p"] !== "-"
                        ? `(${item["5p"].pickCount} of ${item["5p"].total})`
                        : "-"
                    }}
                  </span>
                  <span class="greenclass">
                    {{
                      item["5p"] && item["5p"] !== "-"
                        ? `${item["5p"].point}`
                        : ""
                    }}
                  </span>
                </span>
              </td>
              
              <td class="money-line">
                <span
                  class="double-divider-span"
                  @click="pickPointDetail(item['mmp'])"
                >
                  <span class="texts">
                    {{
                      item["mmp"] && item["mmp"] !== "-"
                        ? `(${item["mmp"].pickCount} of ${item["mmp"].total})`
                        : "-"
                    }}
                  </span>
                  <span class="greenclass">
                    {{
                      item["mmp"] && item["mmp"] !== "-"
                        ? `${item["mmp"].point}`
                        : ""
                    }}
                  </span>
                </span>
              </td>
              <td class="three-points">
                <span>
                  <span class="greenclass">
                    {{
                      item["ap"] && item["ap"] !== "-"
                        ? item["ap"].point
                        : "-"
                    }}
                  </span>
                </span>
              </td>
              <td class="total">
                <span class="texts">
                  {{ item.totalPoint }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-if="!isLoading && getMyPickPoints.length === 0">
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
          @goPage="$parent.goPage"
          v-if="getMyPickPoints.length > 0"
        />
      </client-only>
    </div>

    <client-only>
      <modal
        class="my-custom-modal my-pending-picks-detail-modal new-modal-design"
        name="detail-modal"
      >
        <div class="modal-content" v-if="!isDetailModalLoading">
          <div class="modal-header text-right">
            <img
              alt="cross"
              src="@/assets/icon/cross-gray.png"
              @click="hideModal('detail')"
            />
          </div>
          <div class="body">
            <div class="table-responsive" v-if="pickDetails.length > 0">
              <table
                v-for="(item, index) in pickDetails"
                :key="'point-row-' + index"
                class="new-modal-design"
              >
                <thead>
                  <tr>
                    <th colspan="3">
                      Pick {{ index + 1 }}
                      <img
                        v-tooltip="{
                          content: 'Pick Scored Wrong?',
                        }"
                        class="lamp"
                        alt="lamp"
                        src="@/assets/icon/lamp.svg"
                        @click="goToNewTicket(item.pickId)"
                      />
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Date</td>
                    <td colspan="2">{{ item.gameTime }}</td>
                  </tr>
                  <tr>
                    <td>Teams</td>
                    <td>{{ item.awayTeam }}</td>
                    <td>{{ item.homeTeam }}</td>
                  </tr>
                  <tr>
                    <td>{{ item.pickOn }}</td>
                    <td>
                      <span v-if="item.isTotalLine" class="arrowspan"
                        ><img
                          src="https://cdn-icons-png.flaticon.com/512/130/130906.png"
                          alt="arrow"
                      /></span>
                      {{ item.awayLine }}
                      <span
                        class="check-img"
                        v-if="item.pickLine === 'awayLine'"
                        ><img src="@/assets/image/check-icon.png"
                      /></span>
                      <span
                        v-if="
                          item.pickLine === 'awayLine' &&
                          item.pickToolTip !== ''
                        "
                        class="badge"
                        :style="{ background: randomColor() }"
                        v-tooltip="{
                          content: item.pickToolTip,
                        }"
                      >
                        {{ item.gameType }}
                      </span>
                      <span
                        v-if="
                          item.pickLine === 'awayLine' &&
                          item.gameStatus &&
                          item.gameStatus !== ''
                        "
                        class="badge"
                        :style="{ background: randomColor() }"
                        v-tooltip="{
                          content: item.gameStatusTitle,
                        }"
                      >
                        {{ item.gameStatus }}
                      </span>
                    </td>
                    <td>
                      <span v-if="item.isTotalLine" class="arrowspan"
                        ><img
                          src="https://cdn-icons-png.flaticon.com/512/656/656979.png"
                          alt="arrow"
                      /></span>
                      {{ item.homeLine }}
                      <span
                        class="check-img"
                        v-if="item.pickLine === 'homeLine'"
                        ><img src="@/assets/image/check-icon.png"
                      /></span>
                      <span
                        v-if="
                          item.pickLine === 'homeLine' &&
                          item.pickToolTip !== ''
                        "
                        class="badge"
                        :style="{ background: randomColor() }"
                        v-tooltip="{
                          content: item.pickToolTip,
                        }"
                      >
                        {{ item.gameType }}
                      </span>
                      <span
                        v-if="
                          item.pickLine === 'homeLine' &&
                          item.gameStatus &&
                          item.gameStatus !== ''
                        "
                        class="badge"
                        :style="{ background: randomColor() }"
                        v-tooltip="{
                          content: item.gameStatusTitle,
                        }"
                      >
                        {{ item.gameStatus }}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>Score</td>
                    <td>{{ item.awayScore }}</td>
                    <td>{{ item.homeScore }}</td>
                  </tr>
                  <tr
                    v-if="
                      item.result === 'Win' ||
                      item.result === 'Loss' ||
                      item.result === 'Push'
                    "
                  >
                    <td>Result</td>
                    <td colspan="2">
                      <span v-if="item.result === 'Win'" class="success">{{
                        item.result
                      }}</span>
                      <span v-else-if="item.result === 'Loss'" class="lose">{{
                        item.result
                      }}</span>
                      <span v-else>{{ item.result }}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div v-else class="body oops_mode">
              <div class="image"><img src="@/assets/image/oops.png" /></div>
              <div class="text-data" v-html="noPickDetailMsg"></div>
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
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";

import Pagination from "@/components/common/PaginationPage.vue";

export default {
  name: "PickPoints",
  components: { Pagination },
  computed: {
    ...mapState("pickpoints", {
      currentPage: (state) => state.currentPage,
      pageSize: (state) => state.pageSize,
    }),
    ...mapGetters("pickpoints", [
      "getMyPickPoints",
      "totalPages",
      "totalCount",
    ]),
    fromIndex() {
      return this.pageSize * (this.currentPage - 1) + 1;
    },
    toIndex() {
      const endIndex = this.pageSize * this.currentPage;
      return endIndex > this.totalCount ? this.totalCount : endIndex;
    },
  },
  data() {
    return {
      type: "PickPoints",
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
      noPickDetailMsg: "",
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
  async beforeMount() {
    const params = {
      page: this.$route.query.page ? this.$route.query.page : 1,
      routeName: this.$route.name
    };

    if (this.$route.params.username) {
      params.username = this.$route.params.username;
    }

    const response = await this.$store.dispatch("pickpoints/apiPickPoints", params);

    if(response.code === 404) {
      return this.$nuxt.error({ statusCode: 404, message: response.message })
    }

    this.meta.metaTitle = this.$store.getters["pickpoints/getMetaData"].title;
    this.meta.metaDescription =
      this.$store.getters["pickpoints/getMetaData"].description;
    this.meta.sharingImage =
      this.$store.getters["default/getClient"].sharingImage;
    this.isLoading = false;
  },
  methods: {
    showModal(key) {
      this.$modal.show(key + "-modal");
    },
    hideModal(key) {
      this.$modal.hide(key + "-modal");
    },
    ...mapActions("pickpoints", ["setPage"]),
    randomColor() {
      const cnt = this.colors.length;
      const index = Math.floor(Math.random() * cnt);

      return this.colors[index];
    },
    async pickPointDetail(pickDetail) {
      if (!pickDetail || pickDetail === "-") {
        return false;
      }

      this.$modal.show("detail-modal");

      this.isDetailModalLoading = true;

      const response = await this.$store.dispatch(
        "pickpoints/apiPickPointsDetail",
        {
          pickId: pickDetail.pickId,
        }
      );

      this.isDetailModalLoading = false;
      if (response.code === 400 || response.code === 500) {
        this.pickDetails = [];
        this.noPickDetailMsg = response.message;
        window.location.reload();
      } else {
        this.pickDetails = response.data;
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
.modal-footer {
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

span.double-divider-span {
  display: grid;
  grid-template-columns: 56px 32px;
  justify-content: center;
  > span + span {
    text-align: left;
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
  max-height: calc(100vh - 100px);
  overflow-y: auto;

  td {
    .arrowspan {
      width: 12px !important;
      img {
        width: 100%;
        max-width: 12px;
      }
    }
  }

  .body {
    &.oops_mode {
      font-size: 16px;
      font-weight: 500;
      color: #2e305c;
      max-width: 523px;
      flex-wrap: wrap;
      margin: 0 auto;
      -webkit-flex-wrap: wrap;
      .image {
        max-width: 60px;
        margin: 0 auto;

        img {
          max-width: 100%;
        }
      }
      .text-data {
        margin-top: 15px;
        line-height: 35px;
        font-size: 20px;
        text-align: center;
        width: 100%;
        &::v-deep span {
          background: #fe646f;
          padding: 5px 10px;
          border-radius: 3px;
          color: #fff;
          margin: 0 5px;
        }
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

.text-right {
  text-align: right;
}
.content {
  background: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 12px;
  margin-top: 16px;
  .notfound {
    font-weight: bold;
    text-align: center;
    margin-top: 10%;
    margin-bottom: 10%;
  }
  .heading {
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 24px;
    color: #2e305c;
    margin-bottom: 12px;
  }
  table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
    tbody {
      tr {
        th {
          text-align: center;
          padding: 10px 16px;
          font-style: normal;
          font-size: 14px;
          line-height: 17px;
          color: #000000;
          border-top: 0.5px solid #e0e0e0;
          border-right: 0.5px solid #e0e0e0;
          border-bottom: 0.5px solid #e0e0e0;
          white-space: nowrap;
          @media screen and (max-width: 959px) {
            font-size: 14px !important;
          }
          &.date {
            width: 18%;
          }
          &.three,
          &.five {
            width: 30%;
          }
          &:first-child {
            border-left: 0.5px solid #e0e0e0;
          }
        }
        td {
          text-align: center;
          padding: 12px 12px;
          font-style: normal;
          font-size: 15px;
          line-height: 18px;
          color: #000000;
          border-right: 0.5px solid #e0e0e0;
          border-bottom: 0.5px solid #e0e0e0;
          white-space: nowrap;
          @media screen and (max-width: 959px) {
            font-size: 14px !important;
            font-weight: 500;
          }

          &.date {
            width: 18%;
          }
          &.three,
          &.five {
            width: 30%;
          }
          &:first-child {
            border-left: 0.5px solid #e0e0e0;
          }
        }
        &:nth-child(odd) {
          background: #fafafa;
        }
        &:first-child {
          td {
            border-top: 0.5px solid #e0e0e0;
            &:first-child {
              border-top-left-radius: 4px;
            }
            &:last-child {
              border-top-right-radius: 4px;
            }
          }
        }
        &:last-child {
          td {
            &:first-child {
              border-bottom-left-radius: 4px;
            }
            &:last-child {
              border-bottom-right-radius: 4px;
            }
          }
        }

        .three-points,
        .five-points,
        .money-line,
        .total {
          .texts {
            cursor: pointer;
          }
          .greenclass {
            color: #0db702;
          }
          .redclass {
            color:#b72f02;
          }
        }
      }
    }
  }
}

.my-pending-picks-detail-modal {
  z-index: 9999;
  .modal-content {
    table.new-modal-design {
      margin-top: 15px;
      thead {
        tr {
          th {
            background: #2e305c !important;
            color: #fff;
            font-size: 18px;
            border-radius: 0px !important;
            padding: 12px 14px;
            border: none;
            .lamp {
              float: right;
              cursor: pointer;
            }
          }
        }
      }
      tbody {
        tr {
          td {
            border-color: #c8c8c8;
            padding: 9px 14px !important;
            color: #000;
            vertical-align: middle;
            font-size: 16px !important;
            font-weight: 500;
            white-space: initial;
            @media all and (max-width: 600px) {
              white-space: nowrap;
            }
            span.check-img {
              display: inline-block;
              line-height: 0;
              max-width: 22px;
              margin-left: 10px;
              position: relative;
              top: 2px;
              img {
                max-width: 100%;
              }
            }
            span.success {
              color: #20a013;
              font-weight: 600 !important;
            }
            span.lose {
              color: #e40808;
              font-weight: 600 !important;
            }
            &.orange {
              background: #fa8c28;
              color: #fff;
            }
            &.sky-blue {
              background: #648cff;
              color: #fff;
            }
            &:nth-child(1) {
              width: 18%;
            }
            &:nth-child(2) {
              width: 35%;
            }
            &:nth-child(3) {
              width: 35%;
            }
          }

          &:nth-child(odd) {
            background: #fff;
          }
          &:last-child {
            td {
              border-bottom: 0.5px solid #c8c8c8;
            }
          }
        }
      }
    }
  }
}

@media screen and (max-width: 767px) {
  .content {
    margin-top: 16px;
    table {
      tbody {
        tr {
          td {
            &.date,
            &.three,
            &.five {
              width: 33.33%;
            }
          }
        }
      }
    }
  }
}
</style>
