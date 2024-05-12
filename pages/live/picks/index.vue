<template>
  <div class="home">
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

      <tell-friends v-if="$auth.loggedIn" />

      <slider-comp :type="type" />

      <div class="refresh-timing">These lines will refresh in 00:00:50</div>

      <div class="all_checkboxes">
        <div class="headline">
          <div class="heading">Choose you league</div>
          <div class="rule">
            <span
              >&#8505;
              <div class="regulations">
                <ol>
                  <li>Lines refresh every 60 seconds.</li>
                  <li>
                    Only 1 pick per line per game (spread & total) is allowed.
                  </li>
                  <li>
                    "No Line" status may appear when the line is taken off the
                    board, but it will come back when updated lines are
                    available.
                  </li>
                  <li>
                    NFL and CFB lines come off the board at the start of the 4th
                    quarter.
                  </li>
                  <li>
                    NBA and WNBA lines come off the board at the start of the
                    4th quarter.
                  </li>
                  <li>
                    CBB lines come off the board at the start of the 2nd half.
                  </li>
                  <li>
                    NHL lines come off the board at the start of the 3rd period.
                  </li>
                  <li>
                    MLB lines start at the top of the 3rd and come off the board
                    at the top of the 8th inning.
                  </li>
                </ol>
              </div>
            </span>
            Rules
          </div>
        </div>
        <ul>
          <li>
            <label>
              <input type="checkbox" />
              <span></span>
            </label>
            <p>wincaab</p>
          </li>
          <li>
            <label>
              <input type="checkbox" />
              <span></span>
            </label>
            <p>nba</p>
          </li>
          <li>
            <label>
              <input type="checkbox" />
              <span></span>
            </label>
            <p>cbb</p>
          </li>
          <li>
            <label>
              <input type="checkbox" />
              <span></span>
            </label>
            <p>mlb</p>
          </li>
          <li>
            <label>
              <input type="checkbox" />
              <span></span>
            </label>
            <p>nhl</p>
          </li>
          <li>
            <label>
              <input type="checkbox" />
              <span></span>
            </label>
            <p>soc</p>
          </li>
          <li>
            <label>
              <input type="checkbox" />
              <span></span>
            </label>
            <p>xfl</p>
          </li>
        </ul>
        <div class="update-cta"><button>Save</button></div>
      </div>

      <client-only>
        <live-list :lives="lives" />
      </client-only>
    </div>
    <right-panel />
  </div>
</template>

<script>
import LiveList from "@/components/home/LiveList";
import LeftPanel from "@/components/common/LeftPanel.vue";
import RightPanel from "@/components/common/RightPanel.vue";
import SliderComp from "@/components/common/DefaultSlider.vue";
import TellFriends from "@/components/common/TellFriends.vue";
export default {
  name: "Home",
  components: {
    LeftPanel,
    RightPanel,
    SliderComp,
    LiveList,
    TellFriends,
  },
  data() {
    return {
      type: "picks",
      lives: [
        {
          date: "August 18, 2022",
          data: [
            {
              time: "3:00 AM EDT",
              entries: [
                {
                  time: "EDUARDO BAEZ",
                  score: "20",
                  spread: "38.5 (-110)",
                  moneyLine: "-25000",
                  total: "289.5 (-110)",
                  imageUrl:
                    "https://cdn-icons-png.flaticon.com/512/130/130906.png",
                },
                {
                  time: "EMANUEL NAVARRETE",
                  score: "15",
                  spread: "38.5 (-110)",
                  moneyLine: "-25000",
                  total: "289.5 (-110)",
                  imageUrl:
                    "https://cdn-icons-png.flaticon.com/512/656/656979.png",
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
    .tabs {
      margin-top: 16px;
      a {
        color: #000000;
        text-decoration: none;
        display: inline-block;
        font-weight: 600;
        font-size: 12px !important;
        padding: 12px 16px;
        border-radius: 4px;
        background: #e3e3e3;
        border: 0.5px solid #d2d2d2;
        margin-right: 12px;

        @media screen and (max-width: 767px) {
          padding: 8px 8px !important;
          margin-right: 4px !important;
        }
        @media screen and (min-width: 1024px) and (max-width: 1299px) {
          margin-right: 6px;
        }
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
    .refresh-timing {
      background: #d1e4d1;
      color: #379937;
      font-size: 18px;
      margin-top: 16px;
      padding: 15px;
      border-radius: 5px;
      text-align: center;
      font-weight: 500;
      border: 1px solid #b0d9b0;
    }
    .all_checkboxes {
      margin-top: 16px;
      background-color: #ffffff;
      border: 1px solid #e0e0e0;
      padding: 16px 16px 1px 16px;
      position: relative;
      @media all and (max-width: 767px) {
        padding-bottom: 16px;
      }
      .headline {
        font-style: normal;
        font-weight: 700;
        margin-bottom: 15px;
        font-size: 20px;
        text-transform: capitalize;
        display: flex;
        display: -webkit-flex;
        align-items: center;
        -webkit-align-items: center;
        justify-content: space-between;
        -webkit-justify-content: space-between;
        .rule {
          background: #2e305c;
          font-weight: 400;
          font-size: 16px;
          padding: 6px 8px 6px 6px;
          color: #fff;
          border-radius: 3px;
          display: flex;
          display: -webkit-flex;
          align-items: center;
          -webkit-align-items: center;
          span {
            margin-right: 6px;
            background: #fff;
            display: flex;
            align-items: center;
            border-radius: 100px;
            justify-content: center;
            width: 18px;
            height: 18px;
            color: #2e305c;
            font-size: 15px;
            position: relative;
            font-weight: 400;
            .regulations {
              position: absolute;
              bottom: 38px;
              width: 540px;
              left: 50%;
              transform: translateX(-50%);
              -webkit-transform: translateX(-50%);
              background: #000;
              padding: 13px;
              border-radius: 5px;
              display: none;
              @media all and (max-width: 1100px) {
                width: 420px;
              }
              @media all and (max-width: 959px) {
                left: initial;
                transform: initial;
                -webkit-transform: initial;
                right: -52px;
                width: 300px;
              }
              &::after {
                content: "";
                position: absolute;
                border: 10px solid;
                left: 50%;
                transform: translateX(-50%);
                -webkit-transform: translateX(-50%);
                border-color: black transparent transparent;
                bottom: -20px;
                @media all and (max-width: 959px) {
                  left: initial;
                  transform: initial;
                  -webkit-transform: initial;
                  right: 52px;
                }
              }
              ol {
                li {
                  list-style-type: none;
                  color: #fff;
                  font-size: 16px;
                  padding: 2px 0 2px 17px;
                  line-height: 20px;
                  text-transform: initial;
                  position: relative;
                  &::after {
                    content: "";
                    position: absolute;
                    left: 0;
                    top: 10px;
                    width: 6px;
                    height: 6px;
                    background: #fa8c28;
                    border-radius: 100px;
                  }
                }
              }
            }
            &:hover {
              .regulations {
                display: block;
              }
            }
          }
        }
      }
      ul {
        display: grid;
        grid-template-columns: 32% 32% 32%;
        grid-column-gap: 2%;
        @media all and (max-width: 767px) {
          grid-template-columns: 100%;
          grid-column-gap: 0;
        }
        li {
          background: #fff;
          margin-bottom: 15px;
          border: 1px solid #e0e0e0;
          border-radius: 5px;
          list-style-type: none;
          display: flex;
          align-items: center;
          display: -webkit-flex;
          -webkit-align-items: center;
          overflow: hidden;
          label {
            line-height: 0px;
            input {
              display: none;
            }
            span {
              width: 40px;
              height: 40px;
              display: block;
              background: #f1f1f1;
              margin-right: 15px;
            }
            input:checked + span {
              background: #379937;
              position: relative;
              &::after {
                content: "";
                width: 15px;
                height: 8px;
                border-left: 2px solid #fff;
                border-bottom: 2px solid #fff;
                position: absolute;
                top: 45%;
                left: 50%;
                transform: translate(-50%, -50%);
                -webkit-transform: translate(-50%, -50%) rotate(-45deg);
              }
            }
          }
          p {
            font-size: 16px !important;
            text-transform: uppercase;
            font-weight: 400;
          }
        }
      }
      .update-cta {
        position: absolute;
        bottom: 16px;
        right: 16px;
        @media all and (max-width: 767px) {
          position: relative;
          bottom: 0;
          right: 0;
          margin-top: 0;
        }
        button {
          background: #379937;
          border-radius: 4px;
          white-space: nowrap;
          padding: 9px 20px;
          color: #fff;
          font-size: 18px;
          text-transform: capitalize;
          height: 42px;
          @media all and (max-width: 767px) {
            width: 100%;
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
    }
  }
}
</style>
