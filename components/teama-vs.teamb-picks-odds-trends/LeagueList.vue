<template>
  <div class="leagues">
    <div class="tabs">
      <span
        :class="item.gameType == currentTab ? 'active' : ''"
        v-for="(item, index) in leagues"
        :key="`league-${index}`"
        @click="tabChange(item.gameType)"
      >
        {{ item.gameType }}
      </span>
    </div>

    <div
      v-for="(item, leagues_index) in leagues"
      :key="leagues_index"
      class="league-group"
    >
      <!-- <h1>{{ league.date }}</h1> -->
      <table
        class="time-group formobileonly"
        v-if="currentTab == item.gameType"
      >
        <thead>
          <tr>
            <th class="time">{{ item.gameTime }}</th>
            <th class="spread">SPREAD</th>
            <th class="moneyLine">MONEYLINE</th>
            <th class="total">TOTAL</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td :title="item.gameTime" class="time">
              {{ item.away_team_name }}
            </td>
            <td title="SPREAD" class="spread">{{ item.ASL }}</td>
            <td title="MONEYLINE" class="moneyLine">{{ item.AML }}</td>
            <td title="TOTAL" class="total">
              <span v-if="item.ATM !== '-'"
                ><img
                  src="https://cdn-icons-png.flaticon.com/512/130/130906.png"
                  alt="arrow"
              /></span>
              {{ item.ATM }}
            </td>
          </tr>
          <tr>
            <td :title="item.gameTime" class="time">
              {{ item.home_team_name }}
            </td>
            <td title="SPREAD" class="spread">{{ item.HSL }}</td>
            <td title="MONEYLINE" class="moneyLine">{{ item.HML }}</td>
            <td title="TOTAL" class="total">
              <span v-if="item.HTM !== '-'"
                ><img
                  src="https://cdn-icons-png.flaticon.com/512/656/656979.png"
                  alt="arrow"
              /></span>
              {{ item.HTM }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "LeagueListTeams",
  props: ["leagues"],
  data() {
    return {
      index: 0,
      currentTab: "FULL GAME",
    };
  },
  methods: {
    tabChange(gameType) {
      this.currentTab = gameType;
    },
  },
};
</script>

<style lang="scss" scoped>
.leagues {
  margin-top: 16px;
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 12px;
  .tabs {
    margin-bottom: 16px;
    span {
      cursor: pointer;
      display: inline-block;
      font-weight: 600;
      font-size: 12px;
      padding: 12px 16px;
      border-radius: 4px;
      background: #e3e3e3;
      border: 0.5px solid #d2d2d2;
      margin-right: 12px;
      @media screen and (max-width: 767px) {
        padding: 8px 8px !important;
        font-size: 12px !important;
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
    .body {
      justify-content: center;
      -webkit-justify-content: center;
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
</style>
