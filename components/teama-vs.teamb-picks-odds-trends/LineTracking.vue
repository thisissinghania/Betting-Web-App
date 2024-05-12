<template>
  <div class="line-tracking">
    <!-- <h1 class="team team-a"></h1> -->
    <div class="table-responsive">
      <table>
        <thead>
          <tr>
            <th class="name">{{ lineTrackingData.awayTeam }}</th>
            <th class="opening">Opening</th>
            <th class="closing">Closing</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="name">Spread</td>
            <td class="opening">{{ lineTrackingData.awaySpread[0] }}</td>
            <td class="closing">{{ lineTrackingData.awaySpread[1] }}</td>
          </tr>
          <tr>
            <td class="name">Moneyline</td>
            <td class="opening">{{ lineTrackingData.awayMoney[0] }}</td>
            <td class="closing">{{ lineTrackingData.awayMoney[1] }}</td>
          </tr>
          <tr>
            <td class="name">Total</td>
            <td class="opening">{{ lineTrackingData.awayTotal[0] }}</td>
            <td class="closing">{{ lineTrackingData.awayTotal[0] }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- <h1 class="team team-b"></h1> -->
    <div class="table-responsive">
      <table>
        <thead>
          <tr>
            <th class="name">{{ lineTrackingData.homeTeam }}</th>
            <th class="opening">Opening</th>
            <th class="closing">Closing</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="name">Spread</td>
            <td class="opening">{{ lineTrackingData.homeSpread[0] }}</td>
            <td class="closing">{{ lineTrackingData.homeSpread[1] }}</td>
          </tr>
          <tr>
            <td class="name">Moneyline</td>
            <td class="opening">{{ lineTrackingData.homeMoney[0] }}</td>
            <td class="closing">{{ lineTrackingData.homeMoney[1] }}</td>
          </tr>
          <tr>
            <td class="name">Total</td>
            <td class="opening">{{ lineTrackingData.homeTotal[0] }}</td>
            <td class="closing">{{ lineTrackingData.homeTotal[0] }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "lineTrackingData",
  props: ["lineTrackingData"],
  methods: {},
};
</script>

<style lang="scss" scoped>
.line-tracking {
  padding-top: 24px;
  .team {
    font-style: normal;
    font-weight: 600;
    font-size: 15px;
    line-height: 17px;

    color: #2e305c;
    &.team-b {
      margin-top: 24px;
    }
  }
  table {
    margin-top: 0;
    background: #fafaff;
    border: 0.5px solid #e4e4ed;
    border-radius: 0;
    width: 100%;
    color: #2e305c;
    font-style: normal;
    border-spacing: 0;
    border-collapse: separate;
    thead {
      tr {
        th {
          font-weight: 600;
          font-size: 15px;
          line-height: 15px;
          color: #000000;
          text-align: center;
          padding: 5px 0;
          border-bottom: 0.5px solid #e4e4ed;
          background: #2e305c;
          color: #fff;
          &.name {
            width: 50%;
            text-align: left;
            padding-left: 10px;
          }
          &.opening,
          &.closing {
            width: 25%;
          }
        }
      }
    }
    tbody {
      tr {
        td {
          padding: 12px 24px;
          border-radius: 0px !important;
          &.name {
            font-weight: 600;
            font-size: 15px;
            line-height: 15px;
            color: #000000 !important;
          }
          &.opening,
          &.closing {
            text-align: center;
            font-weight: 600;
            font-size: 15px !important;
            line-height: 15px;
            color: #000000 !important;
          }
        }
      }
    }
  }
  @media screen and (max-width: 768px) {
    padding-top: 12px;
    .team {
      &.team-b {
        margin-top: 12px;
      }
    }
    table {
      thead {
        tr {
          th {
            &.name,
            &.opening,
            &.closing {
              width: 33.33%;
            }
            font-weight: 600 !important;
            font-size: 14px !important;
          }
        }
      }
      tbody {
        tr {
          td.opening,
          td.closing,
          td.name {
            font-weight: 600 !important;
            font-size: 14px !important;
          }
        }
      }
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

  .white-content {
    background: #fff;
    border: #e0e0e0 solid thin;
    padding: 15px;
    border-radius: 8px;
    margin-top: 20px;

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
      margin-top: 10px;
      color: #000000;
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
</style>
