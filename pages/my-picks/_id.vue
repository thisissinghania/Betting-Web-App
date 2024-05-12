<template>
  <div class="my-picks">
    <left-panel />
    <div class="middle-panel">
      <div class="header" v-if="blueBarData.day">
        <!-- <img src="@/assets/icon/star.png" alt="start image" /> -->
        <span>{{ blueBarData.day }} Days, {{ blueBarData.hour }} Hours & {{ blueBarData.minute }} Minutes</span>
        <!-- <img src="@/assets/icon/question.svg" alt="question image" /> -->
        <span> to turn {{ blueBarData.currentBalance }} into {{ blueBarData.challengeCashOutAmount }}</span>
      </div>
      <div class="top-show" v-if="blueBarData.day" @click="linkWithTimeStamp('/my-picks/')">
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

      <div class="tabs" v-if="$route.params.id !== '7d-picks-last-week'">
        <a
          href="/my-picks/pending"
          :class="`${
            $route.params.id != 'completed' ? 'nuxt-link-active' : ''
          } `"
          >Pending Picks</a
        >
        <a
          href="/my-picks/completed"
          :class="`${
            $route.params.id == 'completed' ? 'nuxt-link-active' : ''
          } `"
        >
          Completed Picks</a
        >
      </div>
      <div class="replenish" v-if="$route.params.id !== '7d-picks-last-week'">
        <span
          ><img src="@/assets/image/important.png" />
          <div v-html="adminPopup('Replenish')"></div>
        </span>
        All picks must be graded to replenish
      </div>
      <my-picks :picksType="picksType"></my-picks>
    </div>
    <right-panel />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import LeftPanel from "@/components/common/LeftPanel.vue";
import RightPanel from "@/components/common/RightPanel.vue";
import MyPicks from "@/components/my-picks/MyPicks.vue";
import CommonSlider from '@/components/common/CommonSlider.vue';

export default {
  name: "mypicks",
  middleware: "auth-user",
  data() {
    return {
      picksType: (this.$route.params.id === '7d-picks-last-week') ? '7d-picks-last-week' : ((this.$route.params.id) ? this.$route.params.id : "pending"),
      sliderItem: [
        {
          'titleDsp' : '7 DAY CHALLENGE',
          'urlSlug' : '/my-picks',
          'isActive': (this.$route.params.id !== '7d-picks-last-week') ? 1 : 0
        },
        {
          'titleDsp' : 'LAST WEEKS 7D PICKS',
          'urlSlug' : '/my-picks/7d-picks-last-week',
          'isActive': (this.$route.params.id === '7d-picks-last-week') ? 1 : 0
        },
        {
          'titleDsp' : 'PICK POINTS',
          'urlSlug' : '/my-picks/pick-points',
          'isActive': false
        },
        {
          'titleDsp' : 'SURVIVOR',
          'urlSlug' : '/my-picks/survivor',
          'isActive': false
        },
      ]
    };
  },
  components: {
    LeftPanel,
    RightPanel,
    MyPicks,
    CommonSlider,
  },
  computed: {
    ...mapGetters('balance', ['blueBarData']),
    ...mapGetters('default', ['getAdminPopup']),
  },
  beforeMount() {
    this.$store.dispatch('balance/userBalancePoint')
  },
  methods: {
    adminPopup(name) {
      for (const typeConfig in this.getAdminPopup) {
        
        if (this.getAdminPopup[typeConfig].name === name) {
          return this.getAdminPopup[typeConfig].content;
        }
      }

      return "";
    },
    linkWithTimeStamp(link) {
      window.location.href = link + "?t=" + new Date().getTime()
    }
  }
};
</script>

<style lang="scss" scoped>
.my-picks {
  display: flex;
  justify-content: space-between;
  padding: 24px 32px;
  gap: 24px;
  background-color: #ececec;
  width: 100%;
  @media screen and (min-width: 1024px) and (max-width: 1366px) {
    padding: 15px;
    gap: 4px;
  }
  .notfound {
    font-weight: bold;
    text-align: center;
    margin-top: 10%;
    margin-bottom: 10%;
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

  .replenish {
    display: flex;
    align-items: center;
    display: -webkit-flex;
    -webkit-align-items: center;
    margin-top: 16px;
    font-size: 16px;
    padding: 9px 8px;
    border-radius: 5px;
    border: 1px solid #ffbcc4;
    background: #fff6f7;
    color: #db001a;
    span {
      line-height: 0px;
      max-width: 20px;
      margin-right: 10px;
      position: relative;
      img {
        max-width: 100%;
      }
      div {
        position: absolute;
        width: 270px;
        left: 50%;
        transform: translateX(-50%);
        -webkit-transform: translateX(-50%);
        background: black;
        line-height: 21px;
        bottom: 30px;
        border-radius: 3px;
        color: #fff;
        font-size: 16px;
        text-align: left;
        display: none;
        padding: 10px;
        @media all and (max-width: 1024px) {
          transform: initial;
          -webkit-transform: initial;
          left: -10px;
        }
        &::after {
          content: "";
          border: 9px solid;
          position: absolute;
          bottom: -18px;
          left: 50%;
          transform: translateX(-50%);
          -webkit-transform: translateX(-50%);
          border-color: black transparent transparent;
          @media all and (max-width: 1024px) {
            transform: initial;
            -webkit-transform: initial;
            left: 12px;
          }
        }
      }
      &:hover {
        div {
          display: block;
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
      font-size: 17px !important;
      @media screen and (max-width: 767px) {
        font-size: 16px !important;
      }
    }
    .tabs {
      margin-top: 16px;
      a {
        display: inline-block;
        font-style: normal;
        font-weight: 700;
        font-size: 12px;
        line-height: 15px;
        /* identical to box height */

        text-transform: uppercase;
        text-decoration: none;
        padding: 12px 16px;
        border-radius: 4px;
        background: #e3e3e3;
        border: 0.5px solid #d2d2d2;
        color: #000000;
        margin-right: 12px;

        @media screen and (max-width: 767px) {
          padding: 8px 8px !important;
          font-size: 12px !important;
        }
        &.nuxt-link-active {
          background: #fa8c28;
          border-color: #fa8c28;
          color: #ffffff;
        }
      }
    }

    .tabswhite {
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
          }
        }

        a {
          color: #000;
          text-decoration: none;
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
            gap: 0;
            padding: 8px;
          }
        }
      }
      .header {
        flex-wrap: wrap;
      }
    }
  }
}
</style>
