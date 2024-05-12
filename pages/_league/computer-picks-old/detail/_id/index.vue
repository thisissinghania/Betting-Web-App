<template>
  <div class="computer-picks-detail">
    <left-panel-vue />
    <div class="middle-panel">
      <div class="heading">
        <div class="team team-a">
          <p class="left">Green Bay Packers</p>
          <p class="right">0</p>
        </div>
        <div class="team team-b">
          <p class="left">Chicago Bears</p>
          <p class="right">0</p>
        </div>
      </div>
      <div class="content">
        <table>
          <thead>
            <tr>
              <th class="other">TEAMS</th>
              <th class="spread">SPREAD</th>
              <th class="result">TOTAL</th>
            </tr>
          </thead>
          <tbody>
            <tr class="team team-a">
              <td class="spread">Green Bay Packers</td>
              <td class="result">
                <div class="normal_text success-data"><span>+</span>7</div>
              </td>
              <td class="other">
                <div class="total_amount success-data">
                  <span
                    ><img
                      src="@/assets/icon/expand-arrow.svg"
                      alt="down-arrow"
                    />
                  </span>
                  <p>147.5</p>
                </div>
              </td>
            </tr>
            <tr class="team team-b">
              <td class="spread">Chicago Bears</td>
              <td class="result">
                <div class="normal_text fail-data"><span>-</span>7</div>
              </td>
              <td class="other">
                <div class="total_amount fail-data">
                  <span
                    ><img src="@/assets/icon/down-arrow.svg" alt="down-arrow" />
                  </span>
                  <p>146.5</p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <p class="info">This predictions can be changed with more data.</p>
      </div>
      <div class="go-back">
        <a :href="getBackUrl()">Back to computer picks</a>
      </div>
      <!-- <img src="@/assets/image/image 5.png" alt="image 5" class="bottom-img" /> -->

      <div class="white-content">
        <h1>Team A vs. Team B Computer Picks</h1>
        <p>
          Our computer picks are generated using advanced algorithms and
          statistical analysis of previous games, past ATS performance, public
          consensus data and other relevant AI and computer generated data.
          These picks are intended to provide a helpful guide for making your
          own betting decisions, but they should not be taken as a guarantee of
          winning. Always do your own research and consider your own risk
          tolerance before placing any bets.
        </p>

        <h2>Team A vs. Team B Spread (ATS) & Total Picks</h2>
        <p>
          Check out our computer picks for the matchup between Team A and Team
          B, including the point spread (ATS) and the total.
        </p>

        <h2>Daily "Sport" Computer Picks</h2>
        <p>
          Don't forget to check out all of our computer picks for every "sport"
          game, updated daily.
        </p>
      </div>
    </div>
    <right-panel-vue />
  </div>
</template>

<script>
import LeftPanelVue from "@/components/common/LeftPanel.vue";
import RightPanelVue from "@/components/common/RightPanel.vue";
export default {
  name: "ComputerPickDetail",
  components: { LeftPanelVue, RightPanelVue },
  computed: {
    getLeagues() {
      return this.$store.getters["default/getComputerLeagues"];
    },
  },
  methods: {
    getBackUrl() {
      let league = "";
      if (this.$route.params.league) {
        league = this.$route.params.league;
      } else {
        league = this.getLeagues[0].urlSlug;
      }

      return "/" + league + "/computer-picks";
    },
  },
};
</script>

<style lang="scss" scoped>
.computer-picks-detail {
  display: flex;
  justify-content: space-between;
  padding: 24px 32px;
  gap: 24px;
  background-color: #ececec;
  .middle-panel {
    .heading {
      background: #2e305c;
      border: 0.5px solid #dfe0f4;
      border-radius: 4px;
      padding: 8px 0;
      margin-bottom: 16px;
      .team {
        display: flex;
        justify-content: space-between;
        padding: 8px 24px;
        font-style: normal;
        font-weight: 600;
        font-size: 14px;
        line-height: 17px;

        color: #ffffff;

        .left {
          font-size: 15px !important;
        }
        .right {
          font-size: 15px !important;
        }
      }
    }
    .content {
      background: #ffffff;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      padding: 15px;
      table {
        width: 100%;
        border-radius: 3px;
        // border: 0.5px solid #e4e4ed;
        border-collapse: separate;
        border-spacing: 0;
        display: table;
        &.second {
          margin-top: 24px;
        }
        thead {
          background-color: #fa8c28;
          th {
            &:first-child {
              border-top-left-radius: 5px !important;
            }
            &:last-child {
              border-top-right-radius: 5px !important;
            }
            padding: 13px 10px;
            font-style: normal;
            font-weight: 700;
            font-size: 15px;
            line-height: 15px;
            text-transform: uppercase;
            color: #ffffff;
            @media screen and (max-width: 959px) {
              font-size: 14px !important;
            }
            &.other {
              width: 60%;
              text-align: left;
              @media screen and (max-width: 959px) {
                width: 20%;
                padding: 10px !important;
              }
            }
            &.result,
            &.spread {
              text-align: center;
              width: 20%;
            }
          }
        }
        tbody {
          tr {
            &:last-child {
              td {
                &:first-child {
                  border-bottom-left-radius: 8px;
                }
                &:last-child {
                  border-bottom-right-radius: 8px;
                }
              }
            }
            td {
              padding: 8px 10px !important;
              font-style: normal;
              font-weight: 600;
              font-size: 16px;
              line-height: 15px;
              color: #000000;
              border: #ebebeb solid thin;
              @media screen and (max-width: 959px) {
                font-size: 14px !important;
                padding: 10px !important;
              }
              &.spread {
                font-weight: 400;
                @media screen and (max-width: 959px) {
                  font-weight: 600;
                }
              }
              &.result,
              &.other {
                text-align: center;
              }
              .total_amount {
                background: #e7e7e7;
                padding: 0;
                display: inline-block;
                border-radius: 3px;
                border: 1px solid #dfdfdf;
                display: inline-flex;
                display: -webkit-inline-flex;
                justify-content: center;
                -webkit-justify-content: center;
                span {
                  width: 40px !important;
                  display: flex !important;
                  align-items: center !important;
                  justify-content: center !important;
                  display: -webkit-flex !important;
                  -webkit-align-items: center !important;
                  -webkit-justify-content: center !important;
                  background: #fff !important;
                  border-radius: 0px !important;
                  img {
                    top: 0 !important;
                    position: static !important;
                    width: 25px !important;
                  }
                }
                p {
                  padding: 10px 15px !important;
                  font-size: 16px !important;
                  font-weight: 600 !important;
                  line-height: 17px;
                  @media all and (max-width: 959px) {
                    padding: 10px 13px !important;
                  }
                }
                &.success-data {
                  background: #d6ffd7 !important;
                  border-color: #a3ffa5 !important;
                }
                &.fail-data {
                  background: #ffdddd !important;
                  border-color: #ffbbbb !important;
                }
              }
              .normal_text {
                background: #e7e7e7;
                padding: 10px 22px;
                display: inline-block;
                border-radius: 3px;
                border: 1px solid #dfdfdf;
                display: inline-flex;
                display: -webkit-inline-flex;
                align-items: center;
                -webkit-align-items: center;
                justify-content: center;
                font-weight: 600 !important;
                -webkit-justify-content: center;
                @media all and (max-width: 959px) {
                  padding: 8px 13px !important;
                }
                span {
                  width: 17px;
                  padding: 0px !important;
                  font-size: 18px;
                  font-weight: 500;
                }
                &.success-data {
                  background: #d6ffd7 !important;
                  border-color: #a3ffa5 !important;
                }
                &.fail-data {
                  background: #ffdddd !important;
                  border-color: #ffbbbb !important;
                }
              }
            }
            td + td {
              border-left: none;
            }
            &.team-b {
              td {
                &.result,
                &.other {
                  color: #000000;

                  .markbig {
                    background: #fff;
                    border-radius: 8px;
                    width: 120px;
                    margin: auto;
                    border: #fa8c28 dashed 1px;
                  }
                  .marksmall {
                    background: #fff;
                    border-radius: 8px;
                    width: 90px;
                    margin: auto;
                    border: #fa8c28 dashed 1px;
                  }
                  img {
                    width: 14px;
                  }
                  span {
                    background: transparent;
                    border-radius: 100px;
                    // width: 40px;
                    // line-height: 12px;
                    padding: 5px;
                    display: inline-block;
                    margin: 0 auto;

                    img {
                      width: 20px;
                      position: relative;
                      top: 6px;
                    }
                  }
                }
              }
            }
            &.team-a {
              td {
                &.result,
                &.other {
                  color: #000000;
                  img {
                    width: 14px;
                  }
                  span {
                    background: transparent;
                    border-radius: 100px;
                    // width: 40px;
                    padding: 5px;
                    display: inline-block;
                    margin: 0 auto;

                    img {
                      width: 20px;
                      position: relative;
                      top: 6px;
                    }
                  }
                }
              }
            }
          }
          tr + tr td {
            border-top: none;
          }
        }
      }
      .info {
        margin-top: 24px;
        font-style: normal;
        font-weight: 600;
        font-size: 13px !important;
        line-height: 15px;
        text-align: center;
        color: #2e305c;
      }
    }
    .go-back {
      text-align: center;
      margin: 24px auto;
      a {
        font-style: normal;
        font-weight: 600;
        font-size: 14px;
        line-height: 17px;
        text-decoration-line: underline;
        color: #2e305c;
      }
    }
    img.bottom-img {
      width: 100%;
    }
    .white-content {
      background: #fff;
      border: #e0e0e0 solid thin;
      padding: 15px;
      border-radius: 8px;

      h1 {
        color: #000000;
        font-style: normal;
        font-weight: 700;
        font-size: 28px;
        margin-bottom: 15px;
      }
      h2 {
        color: #000000;
        font-style: normal;
        font-weight: 700;
        margin-top: 15px;
        margin-bottom: 15px;
        font-size: 20px;
      }
      p {
        margin-bottom: 10px;
        color: #000000;
        margin-top: 10px;
        font-size: 15px !important;
        line-height: 26px !important;
      }
      ul {
        margin: 0px;
        padding: 0px;
        text-indent: 8px;

        li {
          list-style-position: inside;
          margin-bottom: 10px;
        }
      }
    }
  }
  @media screen and (max-width: 768px) {
    padding: 16px;
    background-color: #ffffff;
    .middle-panel {
      min-width: 100%;
      .content {
        padding: 12px;
      }
    }
  }
}
</style>
