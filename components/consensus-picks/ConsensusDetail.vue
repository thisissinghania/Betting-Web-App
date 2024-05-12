<template>
  <div class="consensus">
    <div class="item" v-if="consensusDetails.awayTeam">
      <p class="name">SPREAD</p>
      <div class="body">
        <div class="team team-a">
          <div class="left">{{ consensusDetails.awayTeam }}</div>
          <div class="right">
            <span class="a">{{ consensusDetails.awaySpreadPicks }}</span>
            <span class="b">{{ consensusDetails.awaySpreadPercentage }}%</span>
          </div>
        </div>
        <div class="team team-b">
          <div class="left">{{ consensusDetails.homeTeam }}</div>
          <div class="right">
            <span class="a">{{ consensusDetails.homeSpreadPicks }}</span>
            <span class="b">{{ consensusDetails.homeSpreadPercentage }}%</span>
          </div>
        </div>
      </div>
      <p class="name">TOTAL</p>
      <div class="body">
        <div class="team team-a">
          <div class="left">{{ consensusDetails.awayTeam }}</div>
          <div class="right">
            <span class="a">{{ consensusDetails.awayTotalPicks }}</span>
            <span class="b">{{ consensusDetails.awayTotalPercentage }}%</span>
          </div>
        </div>
        <div class="team team-b">
          <div class="left">{{ consensusDetails.homeTeam }}</div>
          <div class="right">
            <span class="a">{{ consensusDetails.homeTotalPicks }}</span>
            <span class="b">{{ consensusDetails.homeTotalPercentage }}%</span>
          </div>
        </div>
      </div>
    </div>

    <div class="go-back">
      <a :href="getUrl()">Back to consensus picks</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "ConsensusDetail",
  props: {
    consensusDetails: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  methods: {
    getUrl() {
      let league = "";
      if (this.$route.params.league) {
        league = this.$route.params.league;
      } else {
        league = this.getLeagues[0].urlSlug;
      }

      return "/" + league + "/consensus-picks";
    },
  },
};
</script>

<style lang="scss" scoped>
.consensus {
  padding-top: 24px;
  .item {
    &:first-child {
      .name {
        border: 0.5px solid #2e305c;
        border-radius: 0px;
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
          display: grid;
          grid-template-columns: auto 70px;

          span {
            font-size: 15px;
            color: #000000;
          }
          span + span {
            text-align: right;
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
