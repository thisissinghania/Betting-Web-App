<template>
  <div class="my-picks">
    <left-panel />
    <div class="middle-panel">
      <div class="header">
        <!-- <img src="@/assets/icon/star.png" alt="start image" /> -->
        <span>"X" days, "X" Hours & "X" Minutes</span>
        <!-- <img src="@/assets/icon/question.svg" alt="question image" /> -->
        <span> to turn $12.00 into $25</span>
      </div>
      <div class="top-show" @click="linkWithTimeStamp('/my-picks/')">
        <div class="left">
          <div class="item">
            <img src="@/assets/image/dollar.svg" alt="cash" />
            <div class="info">
              <p class="heading">YOUR BALANCE</p>
              <p class="amount">$210.75</p>
            </div>
          </div>
          <div class="item">
            <img src="@/assets/image/dollar.svg" alt="redeem" />
            <div class="info">
              <p class="heading">PENDING BALANCE</p>
              <p class="amount">$210.75</p>
            </div>
          </div>
        </div>
        <!-- <div class="right">
          <router-link to="/redeem">REDEEM NOW</router-link>
        </div> -->
      </div>

      <common-slider :sliderItem=sliderItem />

      <survivor-data />
    </div>
    <right-panel />
  </div>
</template>

<script>
import LeftPanel from "@/components/common/LeftPanel.vue";
import RightPanel from "@/components/common/RightPanel.vue";
import SurvivorData from "@/components/my-picks/Survivor.vue";
import CommonSlider from '@/components/common/CommonSlider.vue';

export default {
  name: "MyPicks",
  components: {
    LeftPanel,
    RightPanel,
    SurvivorData,
    CommonSlider
  },
  data() {
    return {
      sliderItem: [
        {
          'titleDsp' : '7 DAY CHALLENGE',
          'urlSlug' : '/my-picks',
          'isActive': false
        },
        {
          'titleDsp' : 'LAST WEEKS 7D PICKS',
          'urlSlug' : '/my-picks/7d-picks-last-week',
          'isActive': false
        },
        {
          'titleDsp' : 'PICK POINTS',
          'urlSlug' : '/my-picks/pick-points',
          'isActive': false
        },
        {
          'titleDsp' : 'SURVIVOR',
          'urlSlug' : '/my-picks/survivor',
          'isActive': true
        },
      ]
    }
  },
  methods: {
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
