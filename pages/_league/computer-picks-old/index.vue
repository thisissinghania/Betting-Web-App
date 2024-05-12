<template>
  <div class="computer-picks">
    <left-panel-vue />
    <div class="middle-panel">
      <div class="day-tabs">
        <span
          v-for="(item, index) in [
            'Today\'s',
            'Yesterday',
            'Last 7 days',
            'Last 30 days',
          ]"
          :key="'day-nav-' + index"
          :class="'item ' + (index === activeDayTab ? 'active' : '')"
          @click="selectDayTab(index)"
        >
          {{ item }}
        </span>
      </div>
      <div class="top-panel">
        <div class="item">
          <p class="desc">Win</p>
          <p class="amount">1</p>
        </div>
        <div class="item">
          <p class="desc">Loss</p>
          <p class="amount">1</p>
        </div>
        <div class="item">
          <p class="desc">Push</p>
          <p class="amount">1</p>
        </div>
        <div class="item">
          <p class="desc">Percentage</p>
          <p class="amount">30%</p>
        </div>
      </div>
      <slider-comp :type="type" />
      <!-- <div class="tabs">
          <span class="active">FULL MATCH</span>
          <span>1ST HALF</span>
          <span>2ND HALF</span>
        </div> -->
      <div class="content">
        <div class="item">
          <h1 class="date">AUGUST 18, 2022</h1>
          <div class="slot">
            <p class="time">3:00 AM EDT</p>
            <div class="body">
              <div class="left">
                <p class="team-a">TEAM A</p>
                <p class="team-b">TEAM B</p>
              </div>
              <a class="right" :href="getDetailUrl('2')">
                <img alt="arrow" src="@/assets/icon/arrow-round-yellow.svg" />
              </a>
            </div>
          </div>
          <div class="slot">
            <p class="time">5:00 AM EDT</p>
            <div class="body">
              <div class="left">
                <p class="team-a">TEAM A</p>
                <p class="team-b">TEAM B</p>
              </div>
              <a class="right" :href="getDetailUrl('2')">
                <img alt="arrow" src="@/assets/icon/arrow-round-yellow.svg" />
              </a>
            </div>
          </div>
          <h1 class="date">AUGUST 19, 2022</h1>
          <div class="slot">
            <p class="time">3:00 AM EDT</p>
            <div class="body">
              <div class="left">
                <p class="team-a">TEAM A</p>
                <p class="team-b">TEAM B</p>
              </div>
              <a class="right" :href="getDetailUrl('2')">
                <img alt="arrow" src="@/assets/icon/arrow-round-yellow.svg" />
              </a>
            </div>
          </div>
          <div class="slot">
            <p class="time">5:00 AM EDT</p>
            <div class="body">
              <div class="left">
                <p class="team-a">TEAM A</p>
                <p class="team-b">TEAM B</p>
              </div>
              <a class="right" :href="getDetailUrl('2')">
                <img alt="arrow" src="@/assets/icon/arrow-round-yellow.svg" />
              </a>
            </div>
          </div>
        </div>
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
import LeftPanelVue from '@/components/common/LeftPanel.vue'
import RightPanelVue from '@/components/common/RightPanel.vue'
import SliderComp from '@/components/common/DefaultSlider.vue'
export default {
  name: 'ComputerPicks',
  components: { LeftPanelVue, RightPanelVue, SliderComp },
  data() {
    return {
      activeDayTab: 0,
      type: "computer-picks"
    }
  },
  computed: {
    getLeagues() {
      this.$store.commit('default/setLeagues', this.$store.getters["default/getComputerLeagues"])
      return this.$store.getters["default/getComputerLeagues"];
    },
  },
  methods: {
    goToDetail() {
      this.$router.push({ path: 'computer-picks-detail' })
    },
    selectDayTab(index) {
      this.activeDayTab = index
    },
    getDetailUrl(id) {
      let league = ''
      if (this.$route.params.league) {
        league = this.$route.params.league
      } else {
        league = this.getLeagues[0].urlSlug
      }

      return (
        '/' +
        league +
        '/computer-picks-old/detail/' +
        Buffer.from(id).toString('base64')
      )
    },
  },
}
</script>
  
  <style lang="scss" scoped>
.computer-picks {
  display: flex;
  justify-content: space-between;
  padding: 24px 32px;
  gap: 24px;
  background-color: #ececec;
  .middle-panel {
    .day-tabs {
      background: #f1f2f9;
      border: 0.5px solid #e0e0e0;
      border-radius: 4px;
      padding: 8px;
      display: flex;
      gap: 8px;
      margin-bottom: 16px;
      .item {
        cursor: pointer;
        width: 100%;
        display: block;
        text-align: center;
        padding: 9px 0;
        font-style: normal;
        font-weight: 600;
        font-size: 12px;
        line-height: 15px;
        color: #000000;

        &.active {
          background-color: #ffffff;
          box-shadow: 0px 1px 14px rgba(46, 48, 92, 0.15);
          border-radius: 4px;
        }
        &:hover:not(.active) {
          background-color: #ffffff91;
          box-shadow: 0px 1px 14px rgba(46, 48, 92, 0.05);
          border-radius: 4px;
        }
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
    .content {
      background: #ffffff;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      padding: 12px;
      margin-top: 16px;
      .item {
        .date {
          background: #2e305c;
          border-radius: 4px;
          text-align: center;
          font-style: normal;
          font-weight: 600;
          font-size: 16px;
          line-height: 19px;
          /* identical to box height */

          text-transform: uppercase;

          color: #ffffff;
          padding: 12px 0;
          margin-bottom: 8px;
        }
        .slot {
          &:not(:last-child) {
            margin-bottom: 8px;
          }
          .time {
            background: #f5f5f5;
            border: 0.5px solid #e0e0e0;
            border-radius: 4px 4px 0px 0px;
            border-bottom: none;
            font-style: normal;
            font-weight: 700;
            font-size: 12px;
            line-height: 10px;
            /* identical to box height */

            text-transform: uppercase;

            color: #000;
            padding: 7px 12px;
          }
          .body {
            padding: 12px 16px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            background: #ffffff;
            border: 0.5px solid #e0e0e0;
            border-radius: 0 0 4px 4px;
            .left {
              p {
                font-style: normal;
                font-weight: 600;
                font-size: 15px;
                line-height: 15px;
                text-transform: uppercase;
                color: #000;

                @media screen and (max-width: 959px) {
                  font-size: 14px !important;
                }
                &.team-a {
                  margin-bottom: 12px;
                }
              }
            }
            .right {
              img {
                cursor: pointer;
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

  .top-panel {
    background: #ffffff;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    display: flex;
    align-items: center;
    margin-bottom: 16px;
    .item {
      flex-grow: 1;
      text-align: center;
      &:not(.last-child) {
        border-right: 1px solid #e0e0e0;
      }
      p.desc {
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 12px;
        text-align: center;

        color: #000000;
        margin-top: 20px;
        @media screen and (max-width: 959px) {
          font-size: 14px !important;
        }
      }
      p.amount {
        font-style: normal;
        font-weight: 1000;
        font-size: 28px;
        line-height: 34px;
        /* identical to box height */
        text-align: center;
        color: #000000;
        margin-top: 6px;
        margin-bottom: 20px;
        @media screen and (max-width: 959px) {
          font-size: 22px !important;
        }
      }
      img {
        margin: 18px auto 20px;
      }
    }
  }

  @media screen and (max-width: 768px) {
    padding: 16px;
    background-color: #ffffff;
    .middle-panel {
      min-width: 100%;
      .day-tabs {
        padding: 4px;
        gap: 4px;
      }
      img.bottom-img {
        display: none;
      }
    }
  }
}
</style>
  