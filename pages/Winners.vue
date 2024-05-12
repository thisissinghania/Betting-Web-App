<template>
  <div class="winners">
    <left-panel />
    <div class="middle-panel">
      <div class="top-panel" v-if="!isLoading && currentData.length > 0">
        <div class="item">
          <p class="desc">Cashout Last 7 Days</p>
          <p class="amount">{{ (allData.lastWeekCashOut) ? allData.lastWeekCashOut : '$0.00' }}</p>
          <img src="@/assets/image/win_a.svg" alt="win_a" />
        </div>
        <div class="item">
          <p class="desc">Cashout Last 30 Days</p>
          <p class="amount">{{ (allData.lastMonthCashOut) ? allData.lastMonthCashOut : '$0.00' }}</p>
          <img src="@/assets/image/win_b.svg" alt="win_a" />
        </div>
        <div class="item">
          <p class="desc">Lifetime Cashouts</p>
          <p class="amount">{{ (allData.lifeTimeCashOut) ? allData.lifeTimeCashOut : '$0.00' }}</p>
          <img src="@/assets/image/win_c.svg" alt="win_a" />
        </div>
      </div>
      <div class="content">
        <div class="table-responsive" v-if="!isLoading && currentData.length > 0">
          <table>
            <thead>
              <tr>
                <th class="date">DATE</th>
                <th class="username">USERNAME</th>
                <th class="type">TYPE</th>
                <th class="amount">AMOUNT</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in currentData" :key="index">
                <td class="date">{{ item.date }}</td>
                <td class="username">{{ item.username }}</td>
                <td class="type">{{ item.cashOutType }}</td>
                <td class="amount">
                  {{ item.amount }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-if="!isLoading && currentData.length === 0">
          <p class="notification">No Winners are available.</p>
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
      <!-- <img src="@/assets/image/image 5.png" alt="image 5" class="bottom-img" /> -->
    </div>
    <right-panel />
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";

import Pagination from "@/components/common/PaginationPage.vue";
import RightPanel from "@/components/common/RightPanel.vue";
import LeftPanel from "@/components/common/LeftPanel.vue";

export default {
  name: "Winners",
  components: { LeftPanel, RightPanel, Pagination },
  data() {
    return {
      isLoading: true,
      meta: {
        metaTitle: '',
        metaDescription: '',
      },
      pickDetails: {},
      noPickDetailMsg: '',
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
          content: this.meta.description,
        },
      ],
    }
  },
  computed: {
    ...mapState("winners", {
      currentPage: (state) => state.currentPage,
      pageSize: (state) => state.pageSize,
    }),
    ...mapGetters("winners", ["currentData", "totalPages", "totalCount", "allData"]),
    fromIndex() {
      return this.pageSize * (this.currentPage - 1) + 1;
    },
    toIndex() {
      const endIndex = this.pageSize * this.currentPage
      return endIndex > this.totalCount ? this.totalCount : endIndex
    },
  },
  async beforeMount() {
    const params = {
      page: this.$route.query.page ? this.$route.query.page : 1,
    }
    await this.$store.dispatch('winners/apiWinners', params)

    this.meta.metaTitle = this.$store.getters['winners/getMetaData'].title
    this.meta.metaDescription =
      this.$store.getters['winners/getMetaData'].description
    this.isLoading = false
  },
  methods: {
    ...mapActions("winners", ["setPage"]),
    goPage(page) {
      window.location.href = "/winners?page=" + page;
    },
  },
  // eslint-disable-next-line vue/order-in-components
  created() {
    const page = this.$route.query.page
    if (page) {
      this.setPage(Number(page))
    }
  },
};
</script>

<style lang="scss" scoped>
.winners {
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
    .top-panel {
      background: #ffffff;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      display: flex;
      align-items: center;
      margin-bottom: 16px;

      @media screen and (max-width: 467px) {
        flex-direction: column;
      }
      .item {
        flex-grow: 1;
        text-align: center;
        padding-bottom: 15px;

        @media screen and (max-width: 467px) {
          width: 100%;
        }
        &:not(:last-child) {
          border-right: 1px solid #e0e0e0;
          @media screen and (max-width: 467px) {
            border-right: none;
            border-bottom: 1px solid #e0e0e0;
          }
        }
        p.desc {
          font-style: normal;
          font-weight: 400;
          font-size: 16px;
          text-align: center;
          color: #000000;
          margin-bottom: 14px;
          margin-top: 14px;

          @media screen and (max-width: 767px) {
            font-size: 14px !important;
            font-weight: 500 !important;
          }
          @media screen and (min-width: 768px) and (max-width: 959px) {
            font-size: 14px !important;
            font-weight: 500 !important;
          }
        }
        p.amount {
          font-style: normal;
          font-weight: 700;
          font-size: 30px;
          line-height: 30px;
          /* identical to box height */

          text-align: center;
          color: #000000;
          margin-top: 6px;
          @media screen and (max-width: 767px) {
            font-size: 28px !important;
          }
          @media screen and (min-width: 768px) and (max-width: 959px) {
            font-size: 28px !important;
          }
        }
        img {
          margin: 18px auto 20px;
          display: none;
          @media screen and (max-width: 767px) {
            display: none;
          }
        }
      }
    }
    .content {
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
          @media screen and (max-width: 767px) {
            font-size: 13px !important;
          }
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
          text-transform: uppercase;
          color: #ffffff;

          tr {
            th {
              padding: 10px 10px;
              background: #2e305c;
              @media screen and (max-width: 959px) {
                text-align: center;
                font-size: 14px !important;
              }
              &.type,
              &.amount {
                text-align: center;
              }
            }
          }
        }
        tbody {
          tr {
            td {
              color: #000000;
              font-style: normal;
              font-size: 15px;
              padding: 10px 8px;
              white-space: nowrap;
              @media screen and (max-width: 959px) {
                font-size: 14px !important;
                font-weight: 500 !important;
              }
              @media screen and (max-width: 600px) {
                padding: 10px 8px !important;
              }
              &.date {
                font-weight: 400;
                width: 130px;
                @media screen and (max-width: "767px") {
                  width: auto;
                  text-align: center;
                }
              }
              &.username {
                font-weight: 400;
                @media screen and (max-width: "767px") {
                  text-align: center;
                }
              }
              &.type {
                font-weight: 400;
                text-align: center;
                width: 150px;
                @media screen and (max-width: "767px") {
                  width: auto;
                }
              }
              &.amount {
                font-weight: 400;
                text-align: center;
                width: 150px;
                @media screen and (max-width: "767px") {
                  width: auto;
                }
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
}
</style>
