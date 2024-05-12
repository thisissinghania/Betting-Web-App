<template>
  <div class="leagues">
    <div class="league-group">
      <table class="time-group formobileonly">
        <thead>
          <tr>
            <th class="time">Pick Details</th>
            <th v-if="showRiskWin" class="spread">Risk</th>
            <th v-if="showRiskWin" class="moneyLine">To Win</th>
            <th class="total">Date</th>
          </tr>
        </thead>
        <tbody @click="showModal('pickdetail')">
          <tr>
            <td title="Pick Details" class="time">
              {{ myLeague.pickDetails }}
            </td>
            <td v-if="showRiskWin" title="Risk" class="spread">
              {{ myLeague.riskAmount }}
            </td>
            <td v-if="showRiskWin" title="To win" class="moneyLine">
              {{ myLeague.winAmount }}
            </td>
            <td title="Date" class="total">{{ myLeague.dateCreated }}</td>
          </tr>
          <tr>
            <td class="time time-pick" colspan="4">
              <div class="pick-id">
                <span class="title">Pick Id</span>
                <span>{{ myLeague.pickId }}</span>
              </div>
            </td>
          </tr>
          <tr v-show="myLeague.result">
            <td class="time time-pick" colspan="4">
              <div class="pick-id">
                <span class="title">Result</span>
                <span>{{ myLeague.result }}</span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <client-only>
      <modal
        class="my-custom-modal my-pending-picks-detail-modal"
        name="pickdetail-modal"
      >
        <div v-if="!isLoading" class="modal-content">
          <div class="header mobilenew">
            <h1 class="date-time"></h1>
            <img
              alt="cross"
              src="@/assets/icon/cross-gray.png"
              @click="hideModal('pickdetail')"
            />
          </div>
          <div class="body">
            <div class="headlines">{{ pickDetails.gameTime }}</div>
            <div class="table-responsive">
              <table>
                <thead>
                  <tr>
                    <th class="green-bay">{{ pickDetails.awayTeam }}</th>
                    <th class="chicago">{{ pickDetails.homeTeam }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="straight">
                    <td class="green-bay">
                      <div>
                        <span class="title">Spread: </span>
                        <span class="value">{{ pickDetails.awayStraight }}</span
                        ><img
                          src="@/assets/icon/done.svg"
                          alt="done"
                          class="donetik"
                          v-if="pickDetails.betLine === 'awayStraight'"
                        />
                        <span
                          v-if="
                            pickDetails.betLine === 'awayStraight' &&
                            pickDetails.pickToolTip !== ''
                          "
                          class="badge"
                          :style="{ background: randomColor() }"
                          v-tooltip="{
                            content: pickDetails.pickToolTip,
                          }"
                        >
                          {{ pickDetails.gameType }}
                        </span>
                        <span
                          v-if="
                            pickDetails.betLine === 'awayStraight' &&
                            pickDetails.gameStatus &&
                            pickDetails.gameStatus !== ''
                          "
                          class="badge"
                          :style="{ background: randomColor() }"
                          v-tooltip="{
                            content: pickDetails.gameStatusTitle,
                          }"
                        >
                          {{ pickDetails.gameStatus }}
                        </span>
                      </div>
                    </td>
                    <td class="chicago">
                      <div>
                        <span class="title">Spread: </span>
                        <span class="value">{{
                          pickDetails.homeStraight
                        }}</span>
                        <img
                          src="@/assets/icon/done.svg"
                          alt="done"
                          class="donetik"
                          v-if="pickDetails.betLine === 'homeStraight'"
                        />
                        <span
                          v-if="
                            pickDetails.betLine === 'homeStraight' &&
                            pickDetails.pickToolTip !== ''
                          "
                          class="badge"
                          :style="{ background: randomColor() }"
                          v-tooltip="{
                            content: pickDetails.pickToolTip,
                          }"
                        >
                          {{ pickDetails.gameType }}
                        </span>
                        <span
                          v-if="
                            pickDetails.betLine === 'homeStraight' &&
                            pickDetails.gameStatus &&
                            pickDetails.gameStatus !== ''
                          "
                          class="badge"
                          :style="{ background: randomColor() }"
                          v-tooltip="{
                            content: pickDetails.gameStatusTitle,
                          }"
                        >
                          {{ pickDetails.gameStatus }}
                        </span>
                      </div>
                    </td>
                  </tr>
                  <tr class="money">
                    <td class="green-bay">
                      <div>
                        <span class="title">Money: </span>
                        <span class="value">{{ pickDetails.awayMoney }}</span>
                        <img
                          src="@/assets/icon/done.svg"
                          alt="done"
                          class="donetik"
                          v-if="pickDetails.betLine === 'awayMoney'"
                        />
                        <span
                          v-if="
                            pickDetails.betLine === 'awayMoney' &&
                            pickDetails.pickToolTip !== ''
                          "
                          class="badge"
                          :style="{ background: randomColor() }"
                          v-tooltip="{
                            content: pickDetails.pickToolTip,
                          }"
                        >
                          {{ pickDetails.gameType }}
                        </span>
                        <span
                          v-if="
                            pickDetails.betLine === 'awayMoney' &&
                            pickDetails.gameStatus &&
                            pickDetails.gameStatus !== ''
                          "
                          class="badge"
                          :style="{ background: randomColor() }"
                          v-tooltip="{
                            content: pickDetails.gameStatusTitle,
                          }"
                        >
                          {{ pickDetails.gameStatus }}
                        </span>
                      </div>
                    </td>
                    <td class="chicago">
                      <div>
                        <span class="title">Money: </span>
                        <span class="value">{{ pickDetails.homeMoney }}</span>
                        <img
                          src="@/assets/icon/done.svg"
                          alt="done"
                          class="donetik"
                          v-if="pickDetails.betLine === 'homeMoney'"
                        />
                        <span
                          v-if="
                            pickDetails.betLine === 'homeMoney' &&
                            pickDetails.pickToolTip !== ''
                          "
                          class="badge"
                          :style="{ background: randomColor() }"
                          v-tooltip="{
                            content: pickDetails.pickToolTip,
                          }"
                        >
                          {{ pickDetails.gameType }}
                        </span>
                        <span
                          v-if="
                            pickDetails.betLine === 'homeMoney' &&
                            pickDetails.gameStatus &&
                            pickDetails.gameStatus !== ''
                          "
                          class="badge"
                          :style="{ background: randomColor() }"
                          v-tooltip="{
                            content: pickDetails.gameStatusTitle,
                          }"
                        >
                          {{ pickDetails.gameStatus }}
                        </span>
                      </div>
                    </td>
                  </tr>
                  <tr class="over">
                    <td class="green-bay">
                      <div class="space-img">
                        <span class="title">Over: </span>
                        <span class="value"
                          >{{ pickDetails.awayOverUnder }}
                        </span>
                        <img
                          src="@/assets/icon/done.svg"
                          alt="done"
                          class="donetik"
                          v-if="pickDetails.betLine === 'awayOverUnder'"
                        />
                        <span
                          v-if="
                            pickDetails.betLine === 'awayOverUnder' &&
                            pickDetails.pickToolTip !== ''
                          "
                          class="badge"
                          :style="{ background: randomColor() }"
                          v-tooltip="{
                            content: pickDetails.pickToolTip,
                          }"
                        >
                          {{ pickDetails.gameType }}
                        </span>
                        <span
                          v-if="
                            pickDetails.betLine === 'awayOverUnder' &&
                            pickDetails.gameStatus &&
                            pickDetails.gameStatus !== ''
                          "
                          class="badge"
                          :style="{ background: randomColor() }"
                          v-tooltip="{
                            content: pickDetails.gameStatusTitle,
                          }"
                        >
                          {{ pickDetails.gameStatus }}
                        </span>
                      </div>
                    </td>
                    <td class="chicago">
                      <div>
                        <span class="title">Under: </span>
                        <span class="value">{{
                          pickDetails.homeOverUnder
                        }}</span>
                        <img
                          src="@/assets/icon/done.svg"
                          alt="done"
                          class="donetik"
                          v-if="pickDetails.betLine === 'homeOverUnder'"
                        />
                        <span
                          v-if="
                            pickDetails.betLine === 'homeOverUnder' &&
                            pickDetails.pickToolTip !== ''
                          "
                          class="badge"
                          :style="{ background: randomColor() }"
                          v-tooltip="{
                            content: pickDetails.pickToolTip,
                          }"
                        >
                          {{ pickDetails.gameType }}
                        </span>
                        <span
                          v-if="
                            pickDetails.betLine === 'homeOverUnder' &&
                            pickDetails.gameStatus &&
                            pickDetails.gameStatus !== ''
                          "
                          class="badge"
                          :style="{ background: randomColor() }"
                          v-tooltip="{
                            content: pickDetails.gameStatusTitle,
                          }"
                        >
                          {{ pickDetails.gameStatus }}
                        </span>
                      </div>
                    </td>
                  </tr>
                  <tr class="score">
                    <td class="green-bay">
                      <div>
                        <span class="title">Score: </span>
                        <span class="value">{{ pickDetails.awayScore }}</span>
                      </div>
                    </td>
                    <td class="chicago">
                      <div>
                        <span class="title">Score: </span>
                        <span class="value">{{ pickDetails.homeScore }}</span>
                      </div>
                    </td>
                  </tr>
                  <tr v-show="myLeague.result" class="over">
                    <td class="green-bay" colspan="2">
                      <div class="resultrow">
                        <span class="title">Result: </span>
                        <span
                          class="value"
                          :class="{
                            success: pickDetails.result === 'Win',
                            lose: pickDetails.result === 'Loss',
                          }"
                          >{{ pickDetails.result }}</span
                        >
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="modal-footer">
            <button @click="hideModal('pickdetail')">Close</button>
          </div>
        </div>
        <div v-else class="notfound">
          <v-progress-circular
            color="primary"
            indeterminate
            :size="55"
            :width="8"
          ></v-progress-circular>
        </div>
      </modal>
    </client-only>
  </div>
</template>

<script>
export default {
  name: "DetailPick",
  props: {
    myLeague: Object,
  },
  data() {
    return {
      pickDetails: {},
      isLoading: false,
      colors: [
        '#6E37E3',
        '#FF1C74',
        '#37B0E3',
        '#0FAE3B',
        '#000000',
        '#F1B93F',
        '#E33737',
        '#96694F',
      ],
    };
  },
  computed: {
    showRiskWin() {
      return (this.myLeague?.pickType === "7 Day Challenge");
    },
  },
  methods: {
    async showModal(key) {
      const self = this;
      self.$modal.show(key + "-modal");
      self.isLoading = true;
      await self.$axios
        .$post("/picks/detail", { id: self.myLeague.pickId })
        .then((response) => {
          self.pickDetails = response.data;
        })
        .catch((error) => {
          console.log(error.response.data);
        });
      self.isLoading = false;
    },
    randomColor() {
      const cnt = this.colors.length
      const index = Math.floor(Math.random() * cnt)
      return this.colors[index]
    },
    hideModal(key) {
      this.$modal.hide(key + "-modal");
    },
  },
};
</script>

<style lang="scss" scoped>
.leagues {
  .notfound {
    font-weight: bold;
    text-align: center;
    margin-top: 10%;
    margin-bottom: 10%;
  }
  table {
    .resultrow {
      font-weight: 500 !important;
      span.success {
        color: #20a013 !important;
        font-weight: 500 !important;
      }
      span.lose {
        color: #e40808 !important;
        font-weight: 500 !important;
      }
    }
  }
  .space-img span.value {
    position: relative;
    img {
      position: absolute;
      right: -30px;
      top: -2px;
    }
  }
  .time-pick {
    padding: 0px !important;
    .pick-id {
      display: flex;
      display: -webkit-flex;
      .title {
        font-weight: 500;
        text-transform: uppercase;
        margin-right: 10px;
        padding: 8px;
        background: #eeeeee;
        width: 100px;
      }
      span + span {
        display: flex;
        align-items: center;
      }
    }
  }

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
  .league-group:last-child table.time-group:last-child {
    margin-bottom: 0 !important;
  }
  .league-group {
    h1 {
      color: #000000;
      font-style: normal;
      font-weight: 700;
      font-size: 20px;
      margin-bottom: 15px;
    }
    .date {
      padding: 12px 10px;
      margin: 0;
      text-align: center;
      font-weight: 600;
      font-size: 16px;
      text-transform: uppercase;
      color: #ffffff;
      background: #2e305c;
      border-radius: 4px;
      margin-bottom: 8px;
    }
    table.time-group {
      background: #ffffff;
      border-spacing: 0;
      border-collapse: separate;
      width: 100%;
      margin-bottom: 8px;

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
      }
      tr th {
        background: #eee;
        border-top: 0.5px solid #e0e0e0;
        text-align: left;
      }

      /* top-left border-radius */
      tr:first-child th:first-child {
        border-top-left-radius: 4px;
      }

      /* top-right border-radius */
      tr:first-child th:last-child {
        border-top-right-radius: 4px;
      }

      /* bottom-left border-radius */
      tr:last-child td:first-child {
        border-bottom-left-radius: 4px;
      }

      /* bottom-right border-radius */
      tr:last-child td:last-child {
        border-bottom-right-radius: 4px;
      }
      thead {
        font-style: normal;
        font-weight: 700;
        font-size: 10px;
        color: #000000;
        background: #f5f5f5;
        tr th {
          padding: 7px 0;
          text-align: center;
          font-size: 15px !important;

          @media screen and (max-width: 767px) {
            font-size: 15px !important;
            font-weight: 500 !important;
          }
          @media screen and (min-width: 960px) and (max-width: 1299px) {
            font-size: 15px !important;
          }
          &.time {
            text-align: left;
            padding-left: 12px;
          }
        }
      }
      tbody {
        tr {
          text-transform: uppercase;
          font-style: normal;
          font-size: 9px;
          line-height: 9px;
          cursor: pointer;
          border-bottom: #2e305c solid 2px;
          td {
            font-size: 15px;
            font-weight: 400;
            @media screen and (max-width: 767px) {
              font-size: 15px !important;
              font-weight: 500 !important;
            }
            @media screen and (min-width: 768px) and (max-width: 1024px) {
              font-size: 15px !important;
            }
            &.time {
              padding: 11px 0 11px 12px;
              color: #000000;
            }
            &:not(.time) {
              // font-weight: 400;
              text-align: center;
              color: #000000;
            }
          }
        }
      }
    }
  }

  .modal-content {
    @media all and (max-width: 1024px) {
      padding: 15px !important;
    }
    .headlines {
      background: #2e305b;
      color: #fff;
      padding: 12px;
      font-weight: 600;
      font-size: 16px;
    }
    .body {
      justify-content: center;
      -webkit-justify-content: center;
      @media all and (max-width: 1024px) {
        padding: 0 !important;
      }
      .item {
        width: 25%;
        p {
          @media all and (max-width: 959px) {
            font-size: 16px !important;
          }
        }
        @media all and (max-width: 768px) {
          width: 50%;
        }
      }
    }
    @media all and (max-width: 1024px) {
      padding: 56px;
    }
    @media all and (max-width: 767px) {
      padding: 20px;
    }
  }

  .white-content {
    background: #fff;
    border: #e0e0e0 solid thin;
    padding: 15px;
    border-radius: 8px;
    margin-top: 15px;

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

  .sportbook-listing {
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
          grid-gap: 14px;
          gap: 5px;

          .promocodes {
            flex: 0 0 50%;
            flex-shrink: 1;
            flex-direction: column;
            display: flex;
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
            }
            .codetext {
              font-size: 10px;
              color: #000;
            }
          }

          .claimoffer {
            flex: 0 0 50%;
            flex-shrink: 1;
            background: #fa8c28;
            color: #ffffff;
            padding: 12px;
            font-size: 15px;
            font-weight: 600;
            border-radius: 5px;
          }
        }
      }
    }

    .sportlist + .sportlist {
      border-bottom: #e0e0e0 solid thin;
    }
  }
  .nativebanner {
    width: 100%;
  }
}

// formobileonly table
@media screen and (max-width: 767px) {
  table.time-group.formobileonly {
    display: block;
    margin-bottom: 0px !important;

    thead {
      display: none;
    }
    tbody {
      display: block;
      width: 100%;

      tr {
        display: block;
        width: 100%;

        td {
          display: block;
          width: 100%;
          text-align: right !important;
          position: relative;
          border: #e0e0e0 solid thin;
          border-bottom: none;
          font-size: 15px !important;
          padding: 14px !important;

          &:first-child {
            background: #f1f1f1;
          }

          &::before {
            content: " " attr(title) "";
            position: absolute;
            left: 11px;
            font-size: 15px;
            font-weight: 500;
          }
        }
      }
    }
  }
}
@media all and (max-width: 767px) {
  .leagues .league-group table.time-group tbody tr td.time-pick {
    padding: 0px !important;
  }
  .leagues .league-group table.time-group tbody tr {
    border: none;
    background: #fff;
  }
  .leagues .time-pick {
    background: #fff !important;
  }
  .leagues .time-pick .pick-id {
    justify-content: space-between;
    -webkit-justify-content: space-between;
  }
  .leagues .time-pick .pick-id .title {
    text-align: left;
    padding: 14px;
  }
  .leagues .time-pick .pick-id .title + span {
    padding: 14px;
  }
}
</style>
