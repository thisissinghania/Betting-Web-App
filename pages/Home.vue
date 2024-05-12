<template>
  <div class="home">
    <left-panel />
    <div class="middle-panel">
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
      <div class="header">
        <img src="@/assets/icon/star.png" alt="start image" />
        <span>"X" days, "X" Hours & "X" Minutes</span>
        <img src="@/assets/icon/question.svg" alt="question image" />
        <span> to turn $12.00 into $25</span>
      </div>
      <slider-comp />
      <div class="tabs">
        <span class="active">FULL MATCH</span>
        <span>1ST HALF</span>
        <span>1ST QTR</span>
        <span>2ND HALF</span>
      </div>
      <league-list :leagues="leagues" />
      <!-- <img src="@/assets/image/image 5.png" alt="image 5" class="bottom-img" /> -->
    </div>
    <right-panel />
  </div>
</template>

<script>
import LeagueList from "@/components/home/LeagueList";
import LeftPanel from "@/components/common/LeftPanel.vue";
import RightPanel from "@/components/common/RightPanel.vue";
import SliderComp from "@/components/common/DefaultSlider.vue";
export default {
  name: "Home",
  components: {
    LeagueList,
    LeftPanel,
    RightPanel,
    SliderComp,
  },
  data() {
    return {
      leagues: [
        {
          date: "Today ( Aug 18, 2022)",
          data: [
            {
              time: "3:00 AM EDT",
              entries: [
                {
                  time: "EDUARDO BAEZ",
                  spread: "-2.5 (-129)",
                  moneyLine: "-2.5 (-129)",
                  total: "11.5 (-101)",
                },
                {
                  time: "EMANUEL NAVARRETE",
                  spread: "-3.5 (-69)",
                  moneyLine: "-2.5 (-129)",
                  total: "22.5 (+103)",
                },
              ],
            },
            {
              time: "3:45 AM EDT",
              entries: [
                {
                  time: "EDUARDO BAEZ",
                  spread: "-2.5 (-129)",
                  moneyLine: "-2.5 (-129)",
                  total: "11.5 (-101)",
                },
                {
                  time: "EMANUEL NAVARRETE",
                  spread: "-3.5 (-69)",
                  moneyLine: "-2.5 (-129)",
                  total: "22.5 (+103)",
                },
              ],
            },
            {
              time: "4:15 AM EDT",
              entries: [
                {
                  time: "EDUARDO BAEZ",
                  spread: "-2.5 (-129)",
                  moneyLine: "-2.5 (-129)",
                  total: "11.5 (-101)",
                },
                {
                  time: "EMANUEL NAVARRETE",
                  spread: "-3.5 (-69)",
                  moneyLine: "-2.5 (-129)",
                  total: "22.5 (+103)",
                },
              ],
            },
          ],
        },
        {
          date: "19 Aug, 2022",
          data: [
            {
              time: "2:15 AM EDT",
              entries: [
                {
                  time: "EDUARDO BAEZ",
                  spread: "-2.5 (-129)",
                  moneyLine: "-2.5 (-129)",
                  total: "11.5 (-101)",
                },
                {
                  time: "EMANUEL NAVARRETE",
                  spread: "-3.5 (-69)",
                  moneyLine: "-2.5 (-129)",
                  total: "22.5 (+103)",
                },
              ],
            },
            {
              time: "3:15 AM EDT",
              entries: [
                {
                  time: "EDUARDO BAEZ",
                  spread: "-2.5 (-129)",
                  moneyLine: "-2.5 (-129)",
                  totla: "11.5 (-101)",
                },
                {
                  time: "EMANUEL NAVARRETE",
                  spread: "-3.5 (-69)",
                  moneyLine: "-2.5 (-129)",
                  total: "22.5 (+103)",
                },
              ],
            },
            {
              time: "5:15 AM EDT",
              entries: [
                {
                  time: "EDUARDO BAEZ",
                  spread: "-2.5 (-129)",
                  moneyLine: "-2.5 (-129)",
                  totla: "11.5 (-101)",
                },
                {
                  time: "EMANUEL NAVARRETE",
                  spread: "-3.5 (-69)",
                  moneyLine: "-2.5 (-129)",
                  total: "22.5 (+103)",
                },
              ],
            },
          ],
        },
        {
          date: "20 Aug, 2022",
          data: [
            {
              time: "3:00 AM EDT",
              entries: [
                {
                  time: "EDUARDO BAEZ",
                  spread: "-2.5 (-129)",
                  moneyLine: "-2.5 (-129)",
                  totla: "11.5 (-101)",
                },
                {
                  time: "EMANUEL NAVARRETE",
                  spread: "-3.5 (-69)",
                  moneyLine: "-2.5 (-129)",
                  total: "22.5 (+103)",
                },
              ],
            },
            {
              time: "4:15 AM EDT",
              entries: [
                {
                  time: "EDUARDO BAEZ",
                  spread: "-2.5 (-129)",
                  moneyLine: "-2.5 (-129)",
                  totla: "11.5 (-101)",
                },
                {
                  time: "EMANUEL NAVARRETE",
                  spread: "-3.5 (-69)",
                  moneyLine: "-2.5 (-129)",
                  total: "22.5 (+103)",
                },
              ],
            },
            {
              time: "5:15 AM EDT",
              entries: [
                {
                  time: "EDUARDO BAEZ",
                  spread: "-2.5 (-129)",
                  moneyLine: "-2.5 (-129)",
                  totla: "11.5 (-101)",
                },
                {
                  time: "EMANUEL NAVARRETE",
                  spread: "-3.5 (-69)",
                  moneyLine: "-2.5 (-129)",
                  total: "22.5 (+103)",
                },
              ],
            },
          ],
        },
        {
          date: "21 Aug, 2022",
          data: [
            {
              time: "4:15 AM EDT",
              entries: [
                {
                  time: "EDUARDO BAEZ",
                  spread: "-2.5 (-129)",
                  moneyLine: "-2.5 (-129)",
                  totla: "11.5 (-101)",
                },
                {
                  time: "EMANUEL NAVARRETE",
                  spread: "-3.5 (-69)",
                  moneyLine: "-2.5 (-129)",
                  total: "22.5 (+103)",
                },
              ],
            },
          ],
        },
      ],
    };
  },
  methods: {
    linkWithTimeStamp(link) {
      window.location.href = link + "?t=" + new Date().getTime();
    },
  },
};
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 24px 32px;
  gap: 24px;
  background-color: #ececec;

  .middle-panel {
    // min-width: 549px;
    // width: 40%;
    .top-show {
      cursor: pointer;
      padding: 12px 16px;
      background: linear-gradient(95.98deg, #ffebeb 16.15%, #fff2e7 83.13%);
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 16px;
      .left {
        display: flex;
        // flex-grow: 1;
        .item {
          display: flex;
          align-items: center;
          flex-grow: 1;
          gap: 8px;
          padding: 16px;
          &:first-child {
            border-right: 1px solid #2e305c;
            @media screen and (max-width: 767px) {
              border-right: none;
            }
          }
          .info {
            color: #000000;
            font-style: normal;
            margin-left: 10px;
            .heading {
              font-weight: 500;
              font-size: 17px;
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
          }
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
      span {
        font-size: 15px;
      }
    }
    .tabs {
      margin-top: 16px;
      span {
        display: inline-block;
        font-weight: 600;
        font-size: 12px;
        padding: 12px 16px;
        border-radius: 4px;
        background: #e3e3e3;
        border: 0.5px solid #d2d2d2;
        margin-right: 12px;

        &.active {
          background: #fa8c28;
          border-color: #fa8c28;
          color: #ffffff;
        }
      }
    }
    img.bottom-img {
      margin-top: 16px;
      width: 100%;
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
            gap: 4px !important;
          }
        }
      }
      .header {
        flex-wrap: wrap;
      }
    }
  }

  @media screen and (max-width: 390px) {
    .middle-panel {
      span {
        font-size: 10px !important;
      }
    }
  }
}
</style>
