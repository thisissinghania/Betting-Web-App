<template>
  <div class="my-picks">
    <left-panel-vue />
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
            <h1 class="heading">
              Congrats {{ $auth.user.username }}! You have
              {{ pickPointsData.totalPointEarned }} points!
            </h1>
            <p
              class="info"
              v-if="
                !pickPointsData.isApplicableToCashOut &&
                pickPointsData.numberOfPointNeeded
              "
            >
              You are {{ pickPointsData.numberOfPointNeeded }} points away from
              being able to redeem for cash!
            </p>
            <a
              href="/redeem-points"
              class="btn"
              v-else-if="pickPointsData.isApplicableToCashOut"
            >
              <span>Redeem now</span
              ><font-awesome-icon
                icon="fa-solid fa fa-arrow-right"
              ></font-awesome-icon>
            </a>
          </div>
        </client-only>
      </div>

      <common-slider :sliderItem="sliderItem" />

      <pick-point />
      <!-- <img src="@/assets/image/image 5.png" alt="image 5" class="bottom-img" /> -->
    </div>
    <right-panel-vue />
  </div>
</template>

<script>
import LeftPanelVue from "@/components/common/LeftPanel.vue";
import RightPanelVue from "@/components/common/RightPanel.vue";
import PickPoint from "@/components/my-picks/PickPoint.vue";
import CommonSlider from "@/components/common/CommonSlider.vue";

export default {
  name: "BalancePickPoints",
  components: { LeftPanelVue, RightPanelVue, PickPoint, CommonSlider },
  middleware: "auth",
  data() {
    return {
      sliderItem: [
        {
          titleDsp: "BALANCE",
          urlSlug: "/balance/",
          isActive: false,
        },
        {
          titleDsp: "LAST WEEKS 7D",
          urlSlug: "/balance-last-week/",
          isActive: false,
        },
        {
          titleDsp: "PICK POINTS",
          urlSlug: "/balance-pick-points/",
          isActive: true,
        },
      ],
    };
  },
  methods: {
    goPage(page) {
      if (this.$route.params.username) {
        window.location.href = '/' + this.$route.params.username + "/balance-pick-points?page=" + page;
      } else {
        window.location.href = "/balance-pick-points?page=" + page;
      }
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
  .middle-panel {
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
      display: flex;
      gap: 6px;
      margin-bottom: 0px;
      margin-top: 16px;
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
            background: #fa8c28;
          }
        }

        a {
          color: #000;
          text-decoration: none;
        }
      }
    }
    .content {
      background: #ffffff;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      padding: 12px;
      margin-top: 24px;
      width: 100%;
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
            }
          }
        }
      }
    }
    img.bottom-img {
      margin-top: 16px;
      width: 100%;
    }
  }

  .text-right {
    text-align: right;
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
    padding: 16px;
    background-color: #ffffff;
    .middle-panel {
      min-width: 100%;
      .header {
        .right {
          width: calc(100% - 0px);
        }
      }
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
  }
}
</style>
