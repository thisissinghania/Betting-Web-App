<template>
  <div class="bet">
    <left-panel-vue />
    <div class="middle-panel">
      <div v-if="blueBarData.day" class="header">
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
        v-if="blueBarData.day"
        class="top-shows"
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

      <div v-if="!isLoading" class="content">
        <div class="progresspick">
          <ul>
            <li
              v-for="(pickC, index) in picksCount"
              :key="index"
              :class="`${pickC <= activeCount ? 'active' : ''}`"
            >
              Pick {{ pickC }}
            </li>
          </ul>
        </div>

        <div class="flexconts">
          <span>{{ lineDetails.team_name }}</span>
          <span class="arrowups">
            <img
              v-if="lineDetails.up"
              src="@/assets/icon/expand-arrow.svg"
              alt="down-arrow"
            />
            <img
              v-if="lineDetails.down"
              src="@/assets/icon/down-arrow.svg"
              alt="thumb_up_green"
            />
            {{ finalValue }}
          </span>
        </div>

        <p v-if="!isNext" class="bottom-text">
          please wait for <span>{{ timerCount }} seconds</span> while we load
          your pick
        </p>
        <div v-else class="btns">
          <span
            class="btn btn-confirm"
            :class="`${isClickedConfirmed ? 'disabled' : ''}`"
            @click="pickSubmit()"
            >confirm my pick</span
          >
          <span class="btn btn-cancel" @click="goToback()">cancel</span>
        </div>
      </div>
      <div v-else-if="isLoading" class="notfound">
        <v-progress-circular
          color="primary"
          indeterminate
          :size="55"
          :width="8"
        ></v-progress-circular>
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
  name: "BetProcess",
  components: { LeftPanelVue, RightPanelVue },
  layout: "default",
  middleware: "auth",
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
      showDownArrow: false,
      showUpArrow: false,
      activeCount: 0,
      picksCount: this.$route.params.pickType === "5p" ? 5 : 3,
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

    this.bannerSingleObj = this.getBannerObj("Native");

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
      this.activeCount = response.cnt;
      this.isLoading = false;

      this.meta.metaTitle = this.$store.getters["picks/getMetaData"].title;
      this.meta.metaDescription =
        this.$store.getters["picks/getMetaData"].description;
      this.meta.sharingImage =
        this.$store.getters["default/getClient"].sharingImage;
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
    checkAmount() {
      if (Number(this.amount)) {
        this.isNext = true;
      }
    },
    linkWithTimeStamp(link) {
      window.location.href = link + "?t=" + new Date().getTime();
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
          pickType: this.$route.params.pickType,
          lineId: this.$route.params.lineId,
          lineType: this.$route.params.lineType,
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
      }
    },
    tabSecurity() {
      if (window.location.hash.indexOf("#admin/callcenter")) {
        window.addEventListener("beforeunload onbeforeunload", function () {
          document.cookie =
            "ic_window_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        });
        const callCenterInterval = setInterval(validateCallCenterTab, 1000);

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
            self.finalTokenAllow = true;
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

      .progresspick {
        text-align: center;
        margin-bottom: 30px;
        ul {
          margin: 0px;
          padding: 0px;
          counter-reset: step;

          li {
            list-style: none;
            text-align: center;
            margin-right: -5px;
            width: 18%;
            display: inline-block;
            position: relative;
            z-index: 1;
            font-size: 16px;
            font-weight: 500;

            // &:first-child::after {
            //   display: none;
            // }

            &::after {
              content: "";
              position: absolute;
              width: 100%;
              height: 1px;
              background-color: #ddd;
              top: 40%;
              left: 0;
              z-index: -1;
              display: block;
            }
            &::before {
              content: counter(step);
              counter-increment: step;
              width: 80px;
              height: 80px;
              line-height: 80px;
              border: 1px solid #ddd;
              border-radius: 100%;
              display: block;
              text-align: center;
              margin: 0 auto 10px auto;
              background-color: #fff;
              font-size: 28px;
              font-weight: 500;

              @media screen and (min-width: 1025px) and (max-width: 1400px) {
                width: 50px;
                height: 50px;
                line-height: 50px;
                font-size: 20px;
              }
              @media screen and (max-width: 767px) {
                width: 50px;
                height: 50px;
                line-height: 50px;
                font-size: 20px;
              }
            }

            &.active::after {
              background-color: #0fae3b;
            }
            &.active::before {
              background-color: #0fae3b;
              color: #fff;
            }
          }
        }
      }

      .flexconts {
        margin: 0 132px 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: #f2f2f2;
        margin-bottom: 30px;
        padding: 15px;
        border-radius: 5px;

        @media screen and (max-width: 767px) {
          margin: 0 0 25px;
        }
        @media screen and (min-width: 960px) and (max-width: 1600px) {
          margin: 0 0 25px;
        }

        span {
          font-size: 16px;
          font-weight: 500;
        }

        .arrowups {
          display: flex;
          align-items: center;
          img {
            width: 18px;
          }
        }
      }

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
      .bottom-text {
        font-style: normal;
        font-weight: 500;
        font-size: 16px;
        line-height: 19px;
        text-align: center;
        text-transform: uppercase;
        color: #000000;
        text-align: center;
        margin-bottom: 20px;
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
        }
      }
      .text {
        margin-bottom: 24px;
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
            gap: 4px;
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
