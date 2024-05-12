<template>
  <div class="leaders">
    <left-panel />
    <div class="middle-panel">
      <div class="header" v-if="blueBarData.minute">
        <!-- <img src="@/assets/icon/star.png" alt="start image" /> -->
        <span>{{ blueBarData.day }} Days, {{ blueBarData.hour }} Hours & {{ blueBarData.minute }} Minutes</span>
        <!-- <img src="@/assets/icon/question.svg" alt="question image" /> -->
        <span> to turn {{ blueBarData.currentBalance }} into {{ blueBarData.challengeCashOutAmount }}</span>
      </div>
      <div class="top-show" v-if="blueBarData.minute" @click="linkWithTimeStamp('/my-picks/')">
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
      
      <common-slider :sliderItem=sliderItem />
      
      <div class="content">
        <div class="table-responsive">
          <table>
            <thead>
              <tr>
                <th class="rank">RANK</th>
                <th class="username">MEMBERS</th>
                <th v-if="$route.params.type === 'challenge-picks'" class="balance">BALANCE</th>
                <th v-else class="wins">PICK POINTS</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(item, index) in currentData"
                :key="`leaders-${index}`"
              >
                <td class="rank">
                  <div>
                    <span>{{
                      item.place
                    }}</span>
                    <span class="suffix">{{
                      item.ordinal
                    }}</span>
                  </div>
                </td>
                <td class="username">{{ item.username }}</td>
                <td class="wins">{{ item.balance }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-if="!isLoading && currentData.length === 0">
          <p class="notification">No Leaders are available.</p>
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
      <!-- <img src="@/assets/image/image 5.png" alt="image 5" class="bottom-img" /> -->
    </div>
    <right-panel />
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";

import PaginationPage from '@/components/common/PaginationPage.vue'
import RightPanel from "@/components/common/RightPanel.vue";
import LeftPanel from "@/components/common/LeftPanel.vue";
import CommonSlider from '@/components/common/CommonSlider.vue';

export default {
  name: "Leaders",
  components: { RightPanel, LeftPanel, PaginationPage, CommonSlider },
  data() {
    return {
      isLoading: true,
      meta: {
        metaTitle: '',
        metaDescription: '',
        sharingImage: '',
      },
      sliderItem: [
        {
          'titleDsp' : '7 DAYS CHALLENGE',
          'urlSlug' : '/leaders/challenge-picks',
          'isActive': this.$route.params.type === 'challenge-picks' ? 1 : 0
        },
        {
          'titleDsp' : 'PICK POINTS',
          'urlSlug' : '/leaders/point-picks',
          'isActive': this.$route.params.type === 'point-picks' ? 1 : 0
        },
      ]
    };
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
  computed: {
    ...mapState("leaders", {
      currentPage: (state) => state.currentPage,
      pageSize: (state) => state.pageSize,
    }),
    ...mapGetters('balance', ['blueBarData']),
    ...mapGetters("leaders", ["currentData", "totalPages", "totalCount"]),
    fromIndex() {
      return this.pageSize * (this.currentPage - 1) + 1;
    },
    toIndex() {
      const endIndex = this.pageSize * this.currentPage;
      return endIndex > this.totalCount ? this.totalCount : endIndex;
    },
  },
  created() {
    const page = this.$route.query.page
    if (page) {
      this.setPage(Number(page))
    }
  },
  methods: {
    ...mapActions("leaders", ["setPage"]),
    goPage(page) {
      window.location.href = "/leaders/" + this.$route.params.type + "?page=" + page;
    },
    redirectTo(type) {
      window.location.href = "/leaders/" + type;
    },
    linkWithTimeStamp(link) {
      window.location.href = link + "?t=" + new Date().getTime()
    }
  },
  async beforeMount() {
    this.isLoading = true;
    if (this.$auth.loggedIn) {
      this.$store.dispatch('balance/userBalancePoint');
    }

    const params = {
      page: this.$route.query.page ? this.$route.query.page : 1,
      type: this.$route.params.type
    }

    await this.$store.dispatch('leaders/apiLeaders', params);

    this.meta.metaTitle = this.$store.getters['leaders/getMetaData'].title
    this.meta.metaDescription =
      this.$store.getters['leaders/getMetaData'].description
    this.meta.sharingImage =
      this.$store.getters['default/getClient'].sharingImage
    this.isLoading = false;
  },
};
</script>

<style lang="scss" scoped>
.leaders {
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
    .tabs {
      display: flex;
      gap: 6px;
      margin-bottom: 16px;
      background: #ffffff;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      padding: 20px 16px;
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
        }
      }
    }
    .content {
      background-color: #ffffff;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      padding: 12px;
      margin-top: 15px;
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
          color: #ffffff;
          font-weight: 600;
          font-size: 14px;
          line-height: 12px;
          tr {
            th {
              padding: 10px 10px !important;
              background: #2e305c;
              white-space: nowrap;
              @media screen and (max-width: 959px) {
                font-size: 14px !important;
              }
              &.rank {
                width: 5%;
              }
              &.username {
                width: 75%;
              }
              &.balance,
              &.wins {
                width: 20%;
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
              font-weight: 400;
              white-space: nowrap;
              @media all and (max-width: 1024px) {
                padding: 10px 8px !important;
              }
              @media screen and (max-width: 959px) {
                font-size: 14px !important;
                font-weight: 500;
              }
              &.rank > div {
                display: flex;
                justify-content: center;
                align-items: flex-start;
                .suffix {
                  font-size: 8px;
                  line-height: 8px;
                }
              }
              &.rank,
              &.balance,
              &.wins {
                font-style: normal;
                text-align: center;
                color: #000000;
              }
              &.username {
                color: #000000;
              }
              &.balance {
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
      .redeem {
        .right {
          display: block;
          .btn {
            margin-top: 8px;
            display: inline-block;
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
