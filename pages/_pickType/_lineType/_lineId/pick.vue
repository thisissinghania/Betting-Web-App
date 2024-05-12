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
        class="top-shows"
        v-if="blueBarData.day"
        @click="linkWithTimeStamp('/my-picks/')"
      >
        <div class="lefts">
          <div class="items">
            <img src="@/assets/image/dollar.svg" alt="cash" />
            <div class="infos">
              <p class="headings">YOUR BALANCE</p>
              <p class="amounts">{{ blueBarData.currentBalance }}</p>
            </div>
          </div>
          <div class="items">
            <img src="@/assets/image/dollar.svg" alt="redeem" />
            <div class="infos">
              <p class="headings">PENDING BALANCE</p>
              <p class="amounts">{{ blueBarData.pendingBalance }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="content">
        <div class="note-area" v-if="warnMsg">
          <span><img src="@/assets/image/important.png" /></span>
          <p>
            {{ warnMsg }}
          </p>
        </div>
        <!-- <div class="heading">
          <p>
            Minimum amount is of $0.10 and the maximum amount you can wager is
            $8.00
          </p>
          <img
            src="@/assets/icon/question-circle.png"
            alt="question circle"
            class="question-circle"
          />
          <img src="@/assets/icon/x-mark.png" alt="x mark" />
        </div> -->
        <div class="info">
          <p class="title">{{ lineDetails.team_name }}</p>
          <span class="arrowups">
            <img
              src="@/assets/icon/expand-arrow.svg"
              v-if="lineDetails.up"
              alt="down-arrow"
            />
            <img
              src="@/assets/icon/down-arrow.svg"
              v-if="lineDetails.down"
              alt="thumb_up_green"
            />
            <p class="value">{{ finalValue }}</p>
          </span>
        </div>
        <div class="form" v-if="isNext">
          <img src="@/assets/icon/money-square.svg" alt="money square" />
          <input
            v-model="amount"
            type="text"
            placeholder="Enter amount here ..."
            @keyup="checkAmount"
          />
        </div>
        <p class="text" v-if="isNext">
          Receive back <span>${{ displayWinAmount }}</span> for a win
        </p>
        <p v-if="!isNext" class="bottom-text">
          please wait for <span>{{ timerCount }} seconds</span> while we load
          your pick
        </p>
        <div v-if="isNext" class="btns">
          <span class="btn btn-min" @click="getMinBet">min bet</span>
          <span class="btn btn-max" @click="getMaxBet">max bet</span>
          <span
            class="btn btn-confirm"
            @click="pickSubmit()"
            :class="`${isClickedConfirmed ? 'disabled' : ''}`"
            >confirm my pick</span
          >
          <span class="btn btn-cancel" @click="goToback()">cancel</span>
        </div>
      </div>
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
      <!-- <img src="@/assets/image/image 5.png" alt="image 5" class="bottom-img" /> -->
    </div>
    <right-panel-vue />
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import LeftPanelVue from "@/components/common/LeftPanel.vue";
import RightPanelVue from "@/components/common/RightPanel.vue";
export default {
  name: "Bet",
  middleware: "auth",
  components: { LeftPanelVue, RightPanelVue },
  layout: "default",
  data() {
    return {
      groupByCategory: [],
      bannerSingleObj: [],
      amount: "",
      isNext: false,
      isLoading: true,
      lineDetails: [],
      timerCount: "",
      lineDataHead: ["AS", "HS", "AT", "HT", "AM", "HM"],
      finalValue: "",
      selectedLineDetails: [],
      isClickedConfirmed: false,
      winAmount: 0,
      displayWinAmount: 0,
      showDownArrow: false,
      showUpArrow: false,
      warnMsg: "",
      minBet: 0.0,
      maxBet: 0.0,
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
    getLeagues() {
      return this.$store.getters["default/getLeagues"];
    },
    ...mapGetters("balance", ["blueBarData"]),
    getAllBanner() {
      return this.$store.getters["bannerModule/getAllBanner"];
    },
  },

  watch: {
    timerCount: {
      handler(value) {
        if (this.timerCount > 0) {
          setTimeout(() => {
            this.timerCount--;
          }, 1000);
        } else if (this.timerCount === 0) {
          this.isNext = true;
        }
      },
      immediate: true, // This ensures the watcher is triggered upon creation
    },
    amount(value, oldValue) {
      if (!value.match(/^-?\d*\.?\d{0,2}$/)) {
        this.amount = oldValue;
      }
      if (value.includes(".") && value.split(".")[1].length > 2) {
        this.amount = oldValue;
      }
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

    this.$store.dispatch("balance/userBalancePoint");
    this.isLoading = true;

    this.tabSecurity();

    const query = {
      pickType: this.$route.params.pickType,
      lineType: this.$route.params.lineType,
      lineId: this.$route.params.lineId,
    };
    const response = await this.$store.dispatch("picks/lineDetail", query);

    if (response.code === 400) {
      alert(response.message);
      window.location.href = "/";
    } else if (response.code === 401) {
      alert(response.message);
      window.location.href = "/";
    } else {
      this.lineDetails = response;
      this.timerCount = this.$store.getters["default/getDelayPickButton"];
      this.finalValue = this.getLineValue();
      this.warnMsg = response.warnMsg;
      this.minBet = parseFloat(this.lineDetails.min_bet_amount).toFixed(2);
      this.maxBet = parseFloat(this.lineDetails.max_bet_amount).toFixed(2);

      this.meta.metaTitle = this.$store.getters["picks/getMetaData"].title;
      this.meta.metaDescription =
        this.$store.getters["picks/getMetaData"].description;
      this.meta.sharingImage =
        this.$store.getters["default/getClient"].sharingImage;

      this.isLoading = false;
    }
  },
  methods: {
    getBannerObj(categoryname) {
      return this.groupByCategory?.filter(
        (res) => res.category === categoryname
      );
    },
    goToback() {
      window.location.href = document.referrer;
    },
    linkWithTimeStamp(link) {
      window.location.href = link + "?t=" + new Date().getTime();
    },
    async checkAmount() {
      if (Number(this.amount)) {
        this.isClickedConfirmed = true;
        const response = await this.$store.dispatch("picks/getWinAmount", {
          pickValue: this.amount,
          lineType: this.$route.params.lineType,
          lineId: this.$route.params.lineId,
        });

        if (response.code === 200) {
          this.winAmount = parseFloat(response.data.winAmount).toFixed(2);
          this.displayWinAmount = parseFloat(
            response.data.displayWinAmount
          ).toFixed(2);
          this.isClickedConfirmed = false;
        } else if (response.code === 400) {
          alert(response.message);
          window.location.href = "/";
        } else if (response.code === 401) {
          alert(response.message);
          window.location.href = "/";
        } else {
          this.amount = "";
        }
      } else {
        this.winAmount = parseFloat(0.0).toFixed(2);
        this.displayWinAmount = parseFloat(0.0).toFixed(2);

        return false;
      }
    },
    getMinBet() {
      this.amount = parseFloat(this.lineDetails.min_bet_amount).toFixed(2);
      this.checkAmount();
    },
    getMaxBet() {
      this.amount = parseFloat(this.lineDetails.max_bet_amount).toFixed(2);
      this.checkAmount();
    },
    getLineValue() {
      let lineValue = "";
      let moneyVal = "";
      this.lineDataHead.forEach((lineHead) => {
        if (this.lineDetails[lineHead]) {
          this.selectedLineDetails = this.lineDetails[lineHead];
          for (const detail in this.lineDetails[lineHead]) {
            if (this.lineDetails[lineHead][detail].money) {
              moneyVal +=
                this.lineDetails[lineHead][detail].value > 0
                  ? "+" + this.lineDetails[lineHead][detail].value
                  : this.lineDetails[lineHead][detail].value;
            }

            if (this.lineDetails[lineHead][detail].line) {
              if (this.lineDetails.isTotalLine) {
                lineValue += this.lineDetails[lineHead][detail].value;
              } else if (this.lineDetails[lineHead][detail].value === 0) {
                lineValue += "PK";
              } else {
                lineValue +=
                  this.lineDetails[lineHead][detail].value > 0
                    ? "+" + this.lineDetails[lineHead][detail].value
                    : this.lineDetails[lineHead][detail].value;
              }
            }
          }
        }
      });

      return lineValue + (lineValue ? " (" + moneyVal + ")" : moneyVal);
    },
    async pickSubmit() {
      if (this.amount.trim() === "" || this.amount === 0) {
        alert("Please Enter Pick Amount");

        return false;
      }

      this.isClickedConfirmed = true;
      const money = {};
      this.selectedLineDetails.forEach((detail) => {
        if (detail.money) {
          money[detail.money] = detail.value;
        }

        if (detail.line) {
          money[detail.line] = detail.value;
        }
      });

      if (
        !this.$route.params.pickType ||
        !this.$route.params.lineId ||
        !this.$route.params.lineType
      ) {
        const errorPayLoad = {
          lineDetails: this.selectedLineDetails,
          lineId: this.$route.params.lineId,
          lineType: this.$route.params.lineType,
          pickType: this.$route.params.pickType,
        };
        await this.$store.dispatch("picks/errorReporting", errorPayLoad);

        alert(
          "It appears that we have encountered an unexpected problem. Please try again."
        );
        window.location.href = "/";
      }

      const payLoad = {
        pickType: this.$route.params.pickType,
        ...money,
        pickValue: this.amount,
        winAmt: this.winAmount,
        lineId: this.$route.params.lineId,
        lineType: this.$route.params.lineType,
      };

      const response = await this.$store.dispatch("picks/makePick", payLoad);

      if (response.code === 400 && response.data.isLineChange) {
        const msg =
          "The line on the " +
          response.data.team_name +
          " " +
          (response.data.up ? " ∧ " : response.data.down ? " v " : "") +
          response.data.old +
          " has changed to " +
          response.data.team_name +
          " " +
          (response.data.up ? " ∧ " : response.data.down ? " v " : "") +
          " " +
          response.data.new +
          ". Do you accept this line change?";

        if (confirm(msg)) {
          window.location.reload();
        } else {
          window.location.href = "/";
        }
      } else if (response.code === 400) {
        alert(response.message);
        window.location.href = "/";
      } else if (response.code === 401) {
        alert(response.message);
        window.location.href = "/";
      } else if (response.code === 200) {
        this.isLoading = false;
        const pickId = response.data.id;
        window.location.href = "/pick-thank-you/" + pickId;
      } else if (response.code === 406) {
        alert(response.message);

        return false;
      }
    },
    tabSecurity() {
      if (window.location.hash.indexOf("#admin/callcenter")) {
        window.addEventListener("beforeunload onbeforeunload", function () {
          document.cookie =
            "ic_window_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        });
        const callCenterInterval = setInterval(validateCallCenterTab, 3000);

        const self = this;
        function validateCallCenterTab() {
          const winidcookieduration = 10; // in seconds

          if (!window.name) {
            window.name = Math.random().toString();
          }

          if (
            !self.$getCookie("ic_window_id") ||
            window.name === self.$getCookie("ic_window_id")
          ) {
            self.$setCookie("ic_window_id", window.name, winidcookieduration);
          } else if (self.$getCookie("ic_window_id") !== window.name) {
            //  this means another browser tab is open, alert them to close the tabs until there is only one remaining
            alert(
              " Security Alert. You are opening multiple windows during the pick process which is not allowed. This window will now close."
            );
            window.location.href = "/";
            clearInterval(callCenterInterval);
            //  throw 'Multiple call center tabs error. Program terminating.';
          }
        }
      }
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
  .middle-panel {
    .note-area {
      display: flex;
      display: -webkit-flex;
      margin-bottom: 15px;
      font-size: 16px;
      padding: 0px;
      border-radius: 5px;
      border: 1px solid #ffbcc4;
      background: #fff6f7;
      color: hsl(353, 100%, 43%);
      span {
        min-width: 47px;
        padding: 7px;
        line-height: 0px;
        border-right: 1px solid #ffbcc4;
        display: flex;
        display: -webkit-flex;
        align-items: center;
        -webkit-align-items: center;
        justify-content: center;
        -webkit-justify-content: center;
        img {
          max-width: 26px;
        }
      }
      p {
        display: flex;
        display: -webkit-flex;
        align-items: center;
        -webkit-align-items: center;
        padding: 7px 15px;
        line-height: 22px;
        font-size: 16px !important;
        font-weight: 500 !important;
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
    .top-shows {
      cursor: pointer;
      padding: 12px;
      background: linear-gradient(95.98deg, #ffebeb 16.15%, #fff2e7 83.13%);
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 16px;
      .lefts {
        display: grid;
        grid-template-columns: calc(50% - 6px) calc(50% - 6px);
        grid-column-gap: 12px;
        width: 100%;
        // flex-grow: 1;
        .items {
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
          .infos {
            color: #000000;
            font-style: normal;
            margin-left: 15px;
            padding-left: 15px;
            border-left: 1px solid #d3d3d3;
            .headings {
              font-weight: 500;
              font-size: 16px;
              @media screen and (max-width: 767px) {
                font-size: 12px !important;
              }
              @media screen and (min-width: 1024px) and (max-width: 1299px) {
                font-size: 12px !important;
              }
            }
            .amounts {
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
        @media all and (max-width: 768px) {
          grid-template-columns: 100%;
          grid-column-gap: 0px;
          grid-row-gap: 10px;
        }
      }
      @media all and (max-width: 768px) {
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
        text-transform: uppercase;
        color: #000000;
        background: #f2f2f2;
        padding: 15px;
        border-radius: 5px;

        .title {
          font-size: 16px;
          font-weight: 500;
          color: #000000;
        }
        .arrowups {
          display: flex;
          align-items: center;
          img {
            width: 18px;
          }
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
          font-size: 18px;

          &::placeholder {
            color: #000000;
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
        margin-bottom: 18px;
        font-style: normal;
        font-weight: 500;
        font-size: 18px !important;
        line-height: 17px;
        color: #000000;
        text-align: center;
        span {
          font-weight: 700;
          color: #fa8c28;
        }
      }
      .bottom-text {
        font-style: normal;
        font-weight: 500;
        font-size: 16px;
        line-height: 19px;
        text-align: center;
        text-transform: uppercase;
        color: #000000;
        text-align: center;
        @media screen and (max-width: 767px) {
          font-size: 15px !important;
        }
        span {
          color: #fa8c28;
        }
      }
      .btns {
        margin: 0 132px 0;
        .btn {
          display: block;
          border-radius: 4px;
          text-transform: uppercase;
          color: white;
          font-style: normal;
          font-weight: 600;
          font-size: 16px;
          line-height: 19px;
          text-align: center;
          padding: 12px;
          height: auto;
          cursor: pointer;
          &:hover {
            opacity: 0.8;
          }
          &:not(:last-child) {
            margin-bottom: 16px;
          }
          &.btn-confirm {
            background: #2e305c;
          }
          &.btn-max {
            background: #53af33;
          }
          &.btn-min {
            background: #fcb720;
          }
          &.btn-cancel {
            background: #f20;
          }
          &.disabled {
            cursor: not-allowed;
            pointer-events: none;
          }
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
        margin-bottom: 8px;
        span {
          font-weight: 700;
        }
        @media screen and (max-width: 767px) {
          font-size: 22px !important;
        }
      }
      .info {
        margin-bottom: 24px;
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 19px;

        color: #000000;

        @media screen and (max-width: 767px) {
          font-size: 14px !important;
          font-weight: 500;
        }
      }
      .text {
        margin-bottom: 24px;
        font-style: normal;
        font-weight: 600;
        font-size: 18px;
        line-height: 22px;
        /* identical to box height */

        text-transform: uppercase;

        color: #000000;
        @media screen and (max-width: 767px) {
          font-size: 14px !important;
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
          font-weight: 500;
        }
      }
      .risk {
        margin-bottom: 8px;
      }
      .back {
        margin-bottom: 44px;
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
      .top-shows {
        display: block;
        padding: 0px;
        .lefts {
          margin-bottom: 0px;
          .items {
            width: 100%;
            gap: 0;
            padding: 8px;
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
          @media screen and (max-width: 767px) {
            font-size: 15px !important;
            margin-top: 14px;
            margin-bottom: 14px;
          }
        }
        .btns {
          margin: 0 0;
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
