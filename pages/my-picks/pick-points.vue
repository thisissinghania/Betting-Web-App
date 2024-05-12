<template>
  <div class="my-picks">
    <left-panel />
    <div class="middle-panel">
      <div class="header" v-if="$auth.loggedIn">
        <div class="redeemicon">
          <img src="@/assets/image/redeemicon.svg" alt="redeemicon" class="" />
        </div>
        <div class="left">
          <h1 class="point">{{ pickPointsData.totalPointEarned }}</h1>
          <p class="info">Pick Points</p>
        </div>
        <client-only>
          <div class="right">
            <h1 class="heading">Congrats {{ $auth.user.username }}! You have {{ pickPointsData.totalPointEarned }} points!</h1>
            <p class="info" v-if="!pickPointsData.isApplicableToCashOut && pickPointsData.numberOfPointNeeded">
              You are {{ pickPointsData.numberOfPointNeeded }} points away from being able to redeem for cash!
            </p>
            <a href="/redeem-points" class="btn" v-else-if="pickPointsData.isApplicableToCashOut">
              <span>Redeem now</span
              ><font-awesome-icon
                icon="fa-solid fa fa-arrow-right"
              ></font-awesome-icon>
            </a>
          </div>
        </client-only>
      </div>

      <common-slider :sliderItem=sliderItem />

      <pick-point />
    </div>
    <right-panel />
  </div>
</template>

<script>
import LeftPanel from "@/components/common/LeftPanel.vue";
import RightPanel from "@/components/common/RightPanel.vue";
import PickPoint from "@/components/my-picks/PickPoint.vue";
import CommonSlider from '@/components/common/CommonSlider.vue';

export default {
  name: "MyPicks",
  middleware: "auth",
  components: {
    LeftPanel,
    RightPanel,
    PickPoint,
    CommonSlider,
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
          'isActive': true
        },
        {
          'titleDsp' : 'SURVIVOR',
          'urlSlug' : '/my-picks/survivor',
          'isActive': false
        },
      ]
    }
  },
  methods: {
    goPage(page) {
      window.location.href = "/my-picks/pick-points?page=" + page;
    },
  },
  computed: {
    pickPointsData() {
      return this.$store.getters["pickpoints/getMyPickPointsData"];
    },
  },
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
  .middle-panel {
    .top-show {
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
  border: 0.5px solid #dfe0f4;
  border-radius: 5px;
  min-height: 140px;
  background-image: linear-gradient(
    90.39deg,
    #656bff 1.04%,
    #6892ff 44.46%,
    #557aff 91.44%
  );
  margin-bottom: 15px;
  background-position: bottom right;
  background-repeat: no-repeat;
  background-size: initial;
  padding: 17px 16px;
  display: flex;
  align-items: center;
  align-content: center;
  gap: 6px;
  position: relative;
  span {
    font-size: 15px;
  }

  .redeemicon {
    position: absolute;
    right: 10px;
    bottom: -5px;

    @media screen and (max-width: 1299px) {
      display: none;
    }
  }
  .left {
    background: #fa8c28;
    border: 2px solid #ffffff;
    box-shadow: 0px 1.37634px 22.0215px rgba(0, 0, 0, 0.17);
    border-radius: 3px;
    text-align: center;
    color: #ffffff;
    padding: 10px;
    width: 112px;
    min-width: 112px;
    height: 100px;
    margin-right: 10px;
    display: flex;
    display: -webkit-flex;
    align-items: center;
    -webkit-align-items: center;
    align-content: center;
    -webkit-align-content: center;
    justify-content: center;
    -webkit-justify-content: center;
    flex-wrap: wrap;
    -webkit-flex-wrap: wrap;
    .point {
      font-style: normal;
      font-weight: 700;
      font-size: 50px;
      line-height: 45px;
      margin-bottom: 8px;
      width: 100%;
    }
    .info {
      font-style: normal;
      font-weight: 600;
      font-size: 14px;
      line-height: 15px;
    }
  }
  .right {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 4px 0;
    width: calc(100% - 250px);
    @media screen and (min-width: 960px) and (max-width: 1360px) {
      width: calc(100% - 200px);
    }

    .heading {
      // margin-bottom: 4px;
      font-style: normal;
      font-weight: 700;
      font-size: 16px;
      line-height: 19px;
      color: #ffffff;
      text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
    }
    .info {
      // margin-bottom: 4px;
      font-style: normal;
      font-weight: 500;
      font-size: 15px;
      margin-top: 8px;
      line-height: 12px;
      color: #ffffff;
      text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
    }
    .btn {
      span {
        margin-right: 5px;
      }
      cursor: pointer;
      text-decoration: none;
      color: #ffee52;
      font-style: normal;
      font-weight: 600;
      font-size: 15px;
      line-height: 12px;
      display: inline-block;
      align-items: center;
      gap: 8px;
      margin-top: 10px;
      padding: 0 !important;
      height: auto;
      &:hover {
        opacity: 0.8;
      }
    }
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
      margin-top: 16px;
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
        .right {
          width: calc(100% - 0px);
        }
      }
    }
  }
}
</style>
