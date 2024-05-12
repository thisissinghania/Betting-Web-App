<template>
  <div class="pick-resource">
    <left-panel />
    <div class="middle-panel">
      <div class="content">
        <h2>Denver Nuggets Props - Team A vs. Team B - Date June 12, 2023</h2>
        <p>
          Below are the player props and betting odds for "X Player". Get
          tonight's "Team A vs. Team B" "Player" Props Get the best NBA player
          betting odds and NBA player props, including points, assists,
          rebounds, steals, blocks, and much, much more.
        </p>
        <a href="/" class="view-page">View Today's NBA Player Props</a>
      </div>

      <div class="content">
        <div class="allPlayer-table">
          <table class="time-group formobileonly">
            <thead>
              <tr>
                <th><h2>Denver Nuggets Points Prop</h2></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Over 26.5 (-110)</td>
              </tr>
              <tr>
                <td>Under 26.5 (+125)</td>
              </tr>
            </tbody>
          </table>

          <div class="content bet-game">
            <div class="left_pic">
              <img src="@/assets/image/point.png" alt="point" />
            </div>
            Bet this Player Prop - Get <span>100%</span> Bonus up to $1500
            <div class="right_pic">
              <img src="@/assets/image/point.png" alt="point" />
            </div>
          </div>

          <table class="time-group formobileonly">
            <thead>
              <tr>
                <th><h2>Denver Nuggets Rebounds Prop</h2></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Over 26.5 (-110)</td>
              </tr>
              <tr>
                <td>Under 26.5 (+125)</td>
              </tr>
            </tbody>
          </table>

          <table class="time-group formobileonly">
            <thead>
              <tr>
                <th><h2>Denver Nuggets Assists Prop</h2></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Over 26.5 (-110)</td>
              </tr>
              <tr>
                <td>Under 26.5 (+125)</td>
              </tr>
            </tbody>
          </table>

          <table class="time-group formobileonly">
            <thead>
              <tr>
                <th><h2>Denver Nuggets Made 3's Prop</h2></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Over 26.5 (-110)</td>
              </tr>
              <tr>
                <td>Under 26.5 (+125)</td>
              </tr>
            </tbody>
          </table>

          <table class="time-group formobileonly">
            <thead>
              <tr>
                <th><h2>Denver Nuggets Double Double Prop</h2></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Yes 26.5 (-110)</td>
              </tr>
              <tr>
                <td>No 26.5 (+125)</td>
              </tr>
            </tbody>
          </table>

          <!-- sportbook-widget -->
          <div class="sportbook-listing">
            <div class="title-list">Best Bonuses</div>
            <div
              v-for="bonus in bonuses"
              :key="`listing-bonus-${bonus.id}`"
              class="sportlist"
            >
              <div class="leftbook">
                <div v-show="bonus.image" class="imgpart">
                  <img :src="bonus.image" alt="Image" />
                </div>
                <div class="contpart">
                  <span class="subhed">{{ bonus.title }}</span>
                  <p class="subcont">
                    {{ bonus.description }}
                  </p>
                </div>
              </div>
              <div class="rightbook">
                <div class="offerbtn">
                  <a :href="bonus.button1Link">
                    <span class="codepromo">{{ bonus.button1Text }}</span>
                    <span class="codetext">Promo Code</span>
                  </a>
                  <a
                    :href="bonus.button2Link"
                    target="_blank"
                    class="claimoffer"
                    >{{ bonus.button2Text }}</a
                  >
                </div>
              </div>
            </div>
            <div v-if="!bonuses.length">
              <div v-if="!bonusLoaded" class="notfound">
                <v-progress-circular
                  color="primary"
                  indeterminate
                  :size="55"
                  :width="8"
                ></v-progress-circular>
              </div>
              <div v-else class="no-bonus">No Bonuses Found</div>
            </div>
          </div>
          <!-- end-sportbook -->

          <table class="time-group formobileonly">
            <thead>
              <tr>
                <th><h2>Denver Nuggets Blocks Prop</h2></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Over 26.5 (-110)</td>
              </tr>
              <tr>
                <td>Under 26.5 (+125)</td>
              </tr>
            </tbody>
          </table>

          <table class="time-group formobileonly">
            <thead>
              <tr>
                <th><h2>Denver Nuggets Steals Prop</h2></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Over 26.5 (-110)</td>
              </tr>
              <tr>
                <td>Under 26.5 (+125)</td>
              </tr>
            </tbody>
          </table>

          <table class="time-group formobileonly">
            <thead>
              <tr>
                <th><h2>Denver Nuggets Turnover Prop</h2></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Over 26.5 (-110)</td>
              </tr>
              <tr>
                <td>Under 26.5 (+125)</td>
              </tr>
            </tbody>
          </table>

          <table class="time-group formobileonly">
            <thead>
              <tr>
                <th>
                  <h2>Denver Nuggets Points + Rebounds + Assists Prop</h2>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Over 26.5 (-110)</td>
              </tr>
              <tr>
                <td>Under 26.5 (+125)</td>
              </tr>
            </tbody>
          </table>

          <table class="time-group formobileonly">
            <thead>
              <tr>
                <th><h2>Denver Nuggets Points + Rebounds Prop</h2></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Over 26.5 (-110)</td>
              </tr>
              <tr>
                <td>Under 26.5 (+125)</td>
              </tr>
            </tbody>
          </table>

          <table class="time-group formobileonly">
            <thead>
              <tr>
                <th><h2>Denver Nuggets Rebounds + Assists Prop</h2></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Over 26.5 (-110)</td>
              </tr>
              <tr>
                <td>Under 26.5 (+125)</td>
              </tr>
            </tbody>
          </table>

          <table class="time-group formobileonly">
            <thead>
              <tr>
                <th><h2>Denver Nuggets Points + Assists Prop</h2></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Over 26.5 (-110)</td>
              </tr>
              <tr>
                <td>Under 26.5 (+125)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <right-panel />
  </div>
</template>

<script>
import RightPanel from "@/components/common/RightPanel.vue";
import LeftPanel from "@/components/common/LeftPanel.vue";

export default {
  name: "PlayerPropDetail",
  components: { RightPanel, LeftPanel },
  data() {
    return {
      bonuses: [],
      bonusLoaded: false,
    };
  },
  computed: {
    bonusesWidgets() {
      return this.$store.getters["default/getWidgetListing"];
    },
  },
  mounted() {
    this.bonusLoaded = false;
    this.bonuses = this.bonusesWidgets;
    this.bonusLoaded = true;
  },
};
</script>

<style lang="scss" scoped>
.pick-resource {
  display: flex;
  justify-content: space-between;
  padding: 24px 32px;
  gap: 24px;
  background-color: #ececec;

  .middle-panel {
    .content {
      background: #ffffff;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      padding: 12px;
      margin-bottom: 16px;
      h2 {
        color: #000000;
        font-style: normal;
        font-weight: 700;
        margin-bottom: 15px;
        font-size: 20px;
      }
      p {
        font-size: 15px;
        line-height: 20px;
      }
      .view-page {
        text-decoration: none;
        margin: 15px 0 5px;
        display: inline-block;
        font-size: 15px;
        color: #666dff;
        text-transform: capitalize;
      }
      .allPlayer-table {
        width: 100%;
        overflow: hidden;
        table.time-group {
          background: #ffffff;
          border-spacing: 0;
          border-collapse: separate;
          width: 100%;
          margin-bottom: 0;

          & + table.time-group {
            margin-top: 10px;
          }

          &.desktoponly {
            @media screen and (max-width: 767px) {
              display: none;
            }
          }
          tr th,
          tr td {
            border-right: 0.5px solid #e0e0e0;
            border-bottom: 0.5px solid #e0e0e0;
            &:first-child {
              border-left: 0.5px solid #e0e0e0;
            }
            img {
              width: 12px;
              line-height: 0;
              margin-right: 5px;
            }
          }
          tr th {
            background: #eee;
            border-top: 0.5px solid #e0e0e0;
            text-align: left;
          }
          thead {
            font-style: normal;
            font-weight: 700;
            font-size: 10px;
            color: #000000;
            background: #f5f5f5;
            tr th {
              padding: 7px 8px;
              text-align: left;
              text-transform: uppercase;
              h2 {
                font-size: 15px !important;
                margin: 0;
              }

              @media screen and (max-width: 767px) {
                font-size: 15px !important;
                font-weight: 500 !important;
              }
              @media screen and (min-width: 960px) and (max-width: 1299px) {
                font-size: 15px !important;
              }
            }
          }
          tbody {
            tr {
              text-transform: uppercase;
              font-style: normal;
              font-size: 9px;
              line-height: 9px;
              border-bottom: #2e305c solid 2px;
              td {
                font-size: 15px;
                font-weight: 400;
                text-align: left;
                padding: 10px 8px !important;
                @media screen and (max-width: 767px) {
                  font-size: 15px !important;
                  font-weight: 500 !important;
                }
                @media screen and (min-width: 768px) and (max-width: 1024px) {
                  font-size: 15px !important;
                }
              }
            }
          }
        }
      }
    }
    .bet-game {
      text-transform: uppercase;
      text-align: center;
      font-size: 20px;
      font-weight: 500;
      display: flex;
      display: -webkit-flex;
      align-items: center;
      -webkit-align-items: center;
      justify-content: center;
      flex-wrap: wrap;
      -webkit-flex-wrap: wrap;
      -webkit-justify-content: center;
      margin-top: 15px;
      span {
        color: #fa8c28;
        margin: 0 10px;
      }
      img {
        max-width: 100%;
      }
      .left_pic {
        max-width: 25px;
        margin-right: 15px;
        line-height: 0px;
        position: relative;
      }
      .right_pic {
        max-width: 25px;
        margin-left: 15px;
        transform: rotateY(180deg);
        -webkit-transform: rotateY(180deg);
        line-height: 0px;
      }
    }

    .sportbook-listing {
      margin-top: 16px;
      margin-bottom: 16px;
      background-color: #ffffff;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      padding: 12px;

      .title-list {
        background: #ebebeb;
        color: #000;
        padding: 15px;
        border-radius: 5px;
        font-size: 16px;
        font-weight: 600;
      }
      .sportlist {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 10px 10px;
        border-bottom: #e0e0e0 solid thin;

        &:first-child {
          border-top: #e0e0e0 solid thin;
        }

        @media screen and (max-width: 767px) {
          flex-wrap: wrap;
        }
        @media screen and (min-width: 1025px) and (max-width: 1400px) {
          flex-wrap: wrap;
        }

        .leftbook {
          flex: 0 0 60%;
          flex-shrink: 1;
          flex-direction: row;
          display: flex;
          align-items: center;
          margin-right: 10px;

          @media screen and (max-width: 767px) {
            flex: 0 0 100%;
          }
          @media screen and (min-width: 1025px) and (max-width: 1400px) {
            flex: 0 0 100%;
          }

          .imgpart {
            width: 50px;
            min-width: 50px;
            height: 50px;
            overflow: hidden;
            border-radius: 6px;
            margin-right: 15px;

            img {
              height: 100%;
              width: 100%;
              object-fit: cover;
              object-position: top center;
            }
          }

          .contpart {
            width: calc(100% - 50px);
            span.subhed {
              font-size: 14px;
              font-weight: 500;
              color: #000000;
              @media screen and (max-width: 767px) {
                font-size: 14px !important;
              }
            }
            p.subcont {
              font-size: 16px;
              font-weight: 500;
              color: #000000;

              @media screen and (max-width: 767px) {
                font-size: 14px !important;
              }
            }
          }
        }

        .rightbook {
          flex: 0 0 40%;
          flex-shrink: 1;

          @media screen and (max-width: 767px) {
            flex: 0 0 100%;
          }
          @media screen and (min-width: 1025px) and (max-width: 1400px) {
            flex: 0 0 100%;
          }

          .offerbtn {
            display: flex;
            margin-top: 15px;
            gap: 5px;

            a {
              text-decoration: none;
              flex: 0 0 50%;
              flex-shrink: 1;
              flex-direction: column;
              display: flex;
              justify-content: center;
              background: #ebebeb;
              padding: 8px 12px;
              text-align: center;
              border-radius: 5px;
              margin-right: 10px;

              .codepromo {
                color: #000;
                font-size: 15px;
                text-transform: uppercase;
                font-weight: 600;
                @media screen and (min-width: 1026px) and (max-width: 1299px) {
                  font-size: 12px;
                }
              }
              .codetext {
                font-size: 10px;
                color: #000;
              }
            }

            .claimoffer {
              text-decoration: none;
              flex: 0 0 50%;
              flex-shrink: 1;
              background: #fa8c28;
              color: #ffffff;
              padding: 12px;
              font-size: 15px;
              font-weight: 600;
              border-radius: 5px;
              @media screen and (min-width: 1026px) and (max-width: 1299px) {
                font-size: 12px;
              }
            }
          }
        }
      }
      .no-bonus {
        text-align: center;
        padding-bottom: 15px;
        padding-top: 15px;
      }

      .sportlist + .sportlist {
        border-bottom: #e0e0e0 solid thin;
      }
    }
  }

  .mb-0 {
    margin-bottom: 0px !important;
  }
  @media screen and (max-width: 768px) {
    padding: 16px;
    background-color: #ffffff;
    .middle-panel {
      min-width: 100%;
    }
  }
}
</style>
