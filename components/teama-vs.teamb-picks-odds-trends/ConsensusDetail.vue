<template>
  <div class="consensus" v-if="consensusData">
    <div class="item">
      <p class="name">SPREAD</p>
      <div class="body">
        <div class="team team-a">
          <div class="left">{{ consensusData.awayTeam }}</div>
          <div class="right">
            <span class="a">{{ consensusData.awaySpreadPicks }}</span>
            <span class="b">{{ consensusData.awaySpreadPercentage }}%</span>
          </div>
        </div>
        <div class="team team-b">
          <div class="left">{{ consensusData.homeTeam }}</div>
          <div class="right">
            <span class="a">{{ consensusData.homeSpreadPicks }}</span>
            <span class="b">{{ consensusData.homeSpreadPercentage }}%</span>
          </div>
        </div>
      </div>
    </div>
    <div class="item">
      <p class="name">TOTAL</p>
      <div class="body">
        <div class="team team-a">
          <div class="left">{{ consensusData.awayTeam }}</div>
          <div class="right">
            <span class="a">{{ consensusData.awayTotalPicks }}</span>
            <span class="b">{{ consensusData.awayTotalPercentage }}%</span>
          </div>
        </div>
        <div class="team team-b">
          <div class="left">{{ consensusData.homeTeam }}</div>
          <div class="right">
            <span class="a">{{ consensusData.homeTotalPicks }}</span>
            <span class="b">{{ consensusData.homeTotalPercentage }}%</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <p class="notification">NO CONSENSUS DATA.</p>
  </div>
</template>

<script>
export default {
  name: "ConsensusDetail",
  props: ["consensusData"],
  data() {
    return {
      data: [],
    };
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.consensus {
  padding-top: 24px;
  .item {
    &:first-child {
      .name {
        border: 0.5px solid #2e305c;
        border-radius: 4px 4px 0px 0px;
      }
    }
    &:last-child {
      .body {
        border-bottom: 0.5px solid #e4e4ed;
        border-radius: 0 0 4px 4px;
      }
    }
    .name {
      font-style: normal;
      font-weight: 700;
      font-size: 15px;
      line-height: 10px;
      text-transform: uppercase;
      color: #ffffff;
      background: #2e305c;
      padding: 7px 16px;
    }
    .body {
      padding: 8px 16px;
      color: #2e305c;
      background: #fafaff;
      border-left: 0.5px solid #e4e4ed;
      border-right: 0.5px solid #e4e4ed;
      font-style: normal;
      .team {
        display: flex;
        justify-content: space-between;
        padding: 8px 0;
        .left {
          font-weight: 600;
          font-size: 15px;
          line-height: 15px;
          color: #000000;
        }
        .right {
          font-weight: 600;
          font-size: 12px;
          line-height: 12px;
          display: flex;
          // gap: 60px;
          display: grid;
          grid-template-columns: auto 70px;
          grid-gap: 10px;
          text-align: right;

          span {
            font-size: 15px;
            color: #000000;
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
