<template>
  <div class="bet">
    <left-panel-vue />
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
      <div
        class="top-show"
        v-if="blueBarData.day"
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
      <div v-if="isLoading" class="notfound">
        <v-progress-circular
          color="primary"
          indeterminate
          :size="55"
          :width="8"
        ></v-progress-circular>
      </div>
      <div v-else class="content-else">
        <img src="@/assets/icon/bet-tick.svg" alt="bet tick" />
        <p class="thank-you">
          Thank you <span>{{ $auth.user.username }}</span
          >!
        </p>
        <p class="info">Your pick was successfully confirmed</p>
        <p class="text">
          {{ pickDetails.team_name }}
          <img
            src="@/assets/icon/expand-arrow.svg"
            v-if="pickDetails.up"
            alt="down-arrow"
          />
          <img
            src="@/assets/icon/down-arrow.svg"
            v-if="pickDetails.down"
            alt="up"
          />{{ pickDetails.line }}
        </p>

        <p class="risk" v-if="pickDetails.pick_value">
          Risking ${{ pickDetails.pick_value }} to win ${{
            pickDetails.win_amt
          }}
        </p>
        <p class="back" v-if="pickDetails.receive_back_amount">
          You will receive back ${{ pickDetails.receive_back_amount }} for a win
        </p>

        <span
          ><a
            :href="
              '/' + pickDetails.urlSlug + '/picks/' + pickDetails.gameTypeSlug
            "
            class="confirm-my-picks"
            >Make another pick</a
          ></span
        >
      </div>
      <!-- <img src="@/assets/image/image 5.png" alt="image 5" class="bottom-img" /> -->
      <div class="nativad">
        <!-- <img src="@/assets/image/nativead.png" alt="nativead" /> -->
        <div v-if="$auth.loggedIn" class="show_on_login">
          <div
            v-for="data in bannerSingleObj"
            :key="data.category"
            class="banner_parent"
          >
            <div v-for="item in data.list" :key="item?.id" class="banner_child">
              <div class="native_banner" v-html="item?.content"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <right-panel-vue />
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import LeftPanelVue from "@/components/common/LeftPanel.vue";
import RightPanelVue from "@/components/common/RightPanel.vue";
export default {
  name: "ThankYou",
  components: { LeftPanelVue, RightPanelVue },
  layout: "default",
  data() {
    return {
      groupByCategory: [],
      bannerSingleObj: [],
      isLoading: true,
      pickDetails: {},
      finalValue: "",
      meta: {
        metaTitle: "",
        metaDescription: "",
        sharingImage: "",
      },
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
          content: this.meta.metaDescription,
        },
        {
          name: "og:title",
          hid: "og:title",
          content: this.meta.metaTitle,
        },
        {
          name: "og:description",
          hid: "og:description",
          content: this.meta.metaDescription,
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
    ...mapGetters("balance", ["blueBarData"]),
    getAllBanner() {
      return this.$store.getters["bannerModule/getAllBanner"];
    },
  },
  async beforeMount() {
    // await this.$store.dispatch("bannerModule/apiCall");

    // this.groupByCategory = this.getAllBanner?.reduce((group, product) => {
    //   const index = group.findIndex((x) => x.category === product.category);
    //   if (index > -1) {
    //     if (group[index].list) {
    //       group[index].list.push(product);
    //     } else {
    //       group[index].list = [product];
    //     }
    //   } else {
    //     group.push({ category: product.category, list: [product] });
    //   }
    //   return group;
    // }, []);

    // this.bannerSingleObj = this.getBannerObj("Native");

    if (this.$auth.loggedIn) {
      this.$store.dispatch("balance/userBalancePoint");
    }

    this.isLoading = true;

    const response = await this.$store.dispatch(
      "picks/getConfirmedPick",
      this.$route.params.id
    );

    if (response.code === 400) {
      alert(response.message);
      window.location.href = "/";
    } else if (response.code === 200) {
      this.pickDetails = response.data;

      this.meta.metaTitle = response.meta.title;
      this.meta.metaDescription = response.meta.description;
      this.meta.sharingImage =
        this.$store.getters["default/getClient"].sharingImage;
      this.isLoading = false;
    } else {
      alert("There has some error.");
      window.location.href = "/";
    }
  },
  methods: {
    getBannerObj(categoryname) {
      return this.groupByCategory?.filter(
        (res) => res.category === categoryname
      );
    },

    linkWithTimeStamp(link) {
      window.location.href = link + "?t=" + new Date().getTime();
    },
  },
};
</script>

<style lang="scss" scoped>
.banner_child {
  .native_banner {
    width: 100%;
    overflow: hidden;
    margin-bottom: 15px;
    text-align: center;
    display: flex;
    display: -webkit-flex;
    flex-wrap: wrap;
    -webkit-flex-wrap: wrap;
    justify-content: center;
    -webkit-justify-content: center;
  }
}
.bet {
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

    .content {
      padding: 24px;
      background: #ffffff;
      border: 1px solid #e0e0e0;
      border-radius: 8px;

      .heading {
        margin-bottom: 48px;
        padding: 12px 16px;
        background: #ebecf6;
        border-radius: 8px;
        display: flex;
        align-items: center;
        p {
          width: 70%;
          font-style: normal;
          font-weight: 500;
          font-size: 16px;
          line-height: 19px;

          color: #2e305c;
        }
        .question-circle {
          margin: 0 auto 0 32px;
        }
      }
      .info {
        margin-bottom: 10px;
        display: flex;
        justify-content: space-between;
        font-style: normal;
        font-weight: 600;
        font-size: 18px;
        line-height: 22px;
        text-transform: uppercase;
        color: #2e305c;

        .title {
          font-size: 16px;
          font-weight: 500;
          color: #000000;
        }
        .value {
          font-size: 16px;
          font-weight: 500;
          color: #000000;
        }
      }
      .form {
        margin: 0 0 20px;
        display: flex;
        input {
          padding: 0 16px;
          width: 100%;
          background: #ffffff;
          border: 1px solid #e0e0e0;
          border-left: none;
          border-top-right-radius: 3px;
          border-bottom-right-radius: 3px;

          &::placeholder {
            opacity: 0.5;
          }
          &:focus {
            outline: none;
          }
          &::-webkit-outer-spin-button,
          &::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
          }
        }
      }
      .text {
        margin-bottom: 48px;
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 17px;
        color: #000000;
        text-align: center;
        span {
          font-weight: 700;
          color: #fa8c28;
        }
      }
    }
    .content-else {
      background: #ffffff;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      text-align: center;
      img {
        margin: 56px auto 32px;
      }
      .thank-you {
        font-style: normal;
        font-weight: 500;
        font-size: 26px;
        line-height: 31px;
        color: #000000;
        margin-bottom: 15px;
        span {
          font-weight: 700;
        }
        @media screen and (max-width: 767px) {
          font-size: 22px !important;
        }
      }
      .info {
        margin-bottom: 15px;
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 19px;

        color: #000000;

        @media screen and (max-width: 767px) {
          font-size: 14px !important;
        }
      }
      .text {
        margin-bottom: 15px;
        font-style: normal;
        font-weight: 600;
        font-size: 20px !important;
        line-height: 22px;
        /* identical to box height */

        text-transform: uppercase;

        color: #000000;
        @media screen and (max-width: 767px) {
          font-size: 14px !important;
        }

        img {
          width: 18px;
          margin-bottom: 0;
          padding-bottom: 0;
          margin-top: 0;
        }
      }
      .risk,
      .back {
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 19px;

        color: #000000;
        @media screen and (max-width: 767px) {
          font-size: 14px !important;
        }
      }
      .risk {
        margin-bottom: 8px;
      }
      .back {
        margin-bottom: 15px;
      }
      .confirm-my-picks {
        display: block;
        margin: 0 156px 56px;
        background: #fa8c28;
        border-radius: 4px;
        padding: 12px 24px;
        font-style: normal;
        font-weight: 600;
        font-size: 16px;
        line-height: 19px;
        text-transform: uppercase;
        text-decoration: none;

        color: #ffffff;
        cursor: pointer;
        &:hover {
          opacity: 0.8;
        }
      }
    }

    .nativad {
      margin-top: 20px;
      border-radius: 5px;
      background: #fff;
      padding: 10px;
      @media screen and (max-width: 767px) {
        border: #e0e0e0 solid thin;
      }

      img {
        width: 100%;
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

      .content {
        padding: 12px;

        .heading {
          margin-bottom: 24px;
        }
        .info {
          margin-bottom: 16px;
        }
        .form {
          margin: 0 0 8px;
        }
        .text {
          margin-bottom: 24px;
        }
      }
      .content-else {
        img {
          margin: 16px auto 24px;
        }
        .back {
          margin-bottom: 24px;
        }
        .confirm-my-picks {
          margin: 0 48px 16px;
        }
      }
    }
  }
}
</style>
