<template>
  <div class="all-teams">
    <div class="middle-panel custom-container">
      <div class="video-and-promotion">
        <h1>Team A vs. Team B Picks, Odds & Trends - February 24, 2023</h1>
        <div class="video-part">
          <iframe
            width="100%"
            height="390"
            src="https://www.youtube.com/embed/yAoLSRbwxL8"
            title="Dummy Video"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
        </div>
        <div class="promotion-part">
          <div class="single-banner">
            <img src="@/assets/image/ad4.png" alt="ad4" />
          </div>
          <div class="single-banner">
            <img src="@/assets/image/ad5.png" alt="ad5" />
          </div>
          <div class="single-banner">
            <img src="@/assets/image/ad6.png" alt="ad6" />
          </div>
        </div>
      </div>

      <league-list-teams :leagues="leagues" />

      <div class="content">
        <h2>Team A vs. Team B Odds & Line Movement</h2>
        <div class="heading">
          <div class="team team-a">
            <p class="left">Green Bay Packers</p>
            <p class="right">0</p>
          </div>
          <div class="team team-b">
            <p class="left">Tampa Bay Buccaneers</p>
            <p class="right">0</p>
          </div>
        </div>
        <div class="tabs-parent">
          <div class="tabs">
            <a
              :class="`${currentTab === 'Line Tracking' ? 'active' : ''} `"
              @click="tabClick('Line Tracking')"
              >Line Tracking</a
            >
            <a
              :class="`${currentTab === 'Consensus' ? 'active' : ''} `"
              @click="tabClick('Consensus')"
              >Consensus</a
            >
          </div>
          <line-tracking v-if="currentTab == 'Line Tracking'" />
          <consensus-detail v-if="currentTab == 'Consensus'" />
        </div>
      </div>

      <div class="content">
        <h2>Team A vs. Team B Betting Trends</h2>
        <div class="headline">Maquette <a href="#">vs</a> Butler</div>
        <div class="listings">
          <ul>
            <li>
              The total has gone OVER in 6 Marquette's last 7 games when playing
              on the road against Butler
            </li>
            <li>Marquette is 5-1 SU in its last 6 games when playing Butler</li>
            <li>The total has gone UNDER in 5 BUtler's last 5 games at home</li>
            <li>
              The total has gone over in 6 Butler's last 7 games when playing at
              home against Marquette
            </li>
          </ul>
        </div>
      </div>

      <div class="white-content">
        <h2>Team A vs. Team B Injuries</h2>
        <div class="injuries-table">
          <table>
            <tbody>
              <tr>
                <td>Jase McClellan</td>
                <td>RB</td>
                <td>Out for season</td>
                <td>Undisclosed</td>
                <td>McClellan is out for season with undisclosed</td>
                <td>Oct 4</td>
              </tr>
              <tr>
                <td>Eli Ricks</td>
                <td>DB</td>
                <td>Out for season</td>
                <td>Undisclosed</td>
                <td>Ricks is out for season with undisclosed</td>
                <td>Oct 13</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="white-content">
        <h2>Team A vs. Team B Game Preview</h2>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </p>
      </div>

      <div class="white-content">
        <h2 class="mb-0">Team A vs. Team B Picks</h2>
      </div>

      <div class="white-content differ-part">
        <h3 class="mb-0">Pick: Green Bay Packers <span>+7</span></h3>
      </div>

      <div class="white-content bet-game">
        <div class="left_pic">
          <img src="@/assets/image/point.png" alt="point" />
        </div>
        Bet this Game: Get <span>150%</span> Bonus up to $1500
        <div class="right_pic">
          <img src="@/assets/image/point.png" alt="point" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LeagueListTeams from "@/components/teama-vs.teamb-picks-odds-trends/LeagueList";
import LineTracking from "@/components/teama-vs.teamb-picks-odds-trends/LineTracking.vue";
import ConsensusDetail from "@/components/teama-vs.teamb-picks-odds-trends/ConsensusDetail.vue";

export default {
  name: "TeamAvsTeamB",
  components: { LeagueListTeams, LineTracking, ConsensusDetail },
  data() {
    return {
      currentTab: "Line Tracking",
      leagues: [
        {
          date: "Team A vs. Team B Picks, Odds & Trends -  February 24, 2023",
          data: [
            {
              time: "3:00 AM EDT",
              entries: [
                {
                  time: "EDUARDO BAEZ",
                  spread: "38.5 (-110)",
                  moneyLine: "-25000",
                  total: "289.5 (-110)",
                },
                {
                  time: "EMANUEL NAVARRETE",
                  spread: "38.5 (-110)",
                  moneyLine: "-25000",
                  total: "289.5 (-110)",
                },
              ],
            },
          ],
        },
      ],
    };
  },
  methods: {
    tabClick(tabName) {
      this.currentTab = tabName;
    },
    getTypeUrl(type) {
      let league = "";
      if (this.$route.params.league) {
        league = this.$route.params.league;
      } else {
        league = this.getLeagues[0].urlSlug;
      }

      return (
        "/" +
        league +
        "/teama-vs.teamb-picks-odds-trends/" +
        this.$route.params.id +
        "/" +
        type
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.all-teams {
  display: flex;
  justify-content: space-between;
  padding: 24px 32px;
  gap: 24px;
  background-color: #ececec;
  .middle-panel {
    max-width: 1171px;
    margin: 0 auto;

    .video-and-promotion {
      background: #ffffff;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      padding: 12px;
      display: grid;
      grid-template-columns: calc(50% - 6px) calc(50% - 6px);
      grid-column-gap: 12px;
      @media all and (max-width: 767px) {
        grid-template-columns: 100%;
        grid-column-gap: 0px;
        grid-row-gap: 12px;
      }
      h1 {
        grid-column: 1 / span 2;
        color: #000000;
        font-style: normal;
        font-weight: 700;
        margin-bottom: 15px;
        font-size: 20px;
        @media all and (max-width: 767px) {
          grid-column: 1;
        }
      }

      .video-part {
        line-height: 0px;
      }
      .promotion-part {
        .single-banner {
          border: 1px solid #e0e0e0;
          text-align: center;
          line-height: 0px;
          margin-bottom: 12px;
          overflow: hidden;
          display: flex;
          display: -webkit-flex;
          justify-content: center;
          -webkit-justify-content: center;
          align-items: center;
          -webkit-align-items: center;
          &:last-child {
            margin-bottom: 0;
          }
        }
      }
    }
    .content {
      background: #ffffff;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      padding: 12px;
      margin-top: 16px;
      h2 {
        color: #000000;
        font-style: normal;
        font-weight: 700;
        margin-bottom: 15px;
        font-size: 20px;
      }
      .heading {
        background: #2e305c;
        border: 0.5px solid #dfe0f4;
        border-radius: 4px;
        padding: 8px 0;
        margin-bottom: 16px;
        .team {
          p {
            font-size: 15px !important;
          }
          display: flex;
          justify-content: space-between;
          padding: 8px 24px;
          font-style: normal;
          font-weight: 600;
          font-size: 10px;
          line-height: 12px;
          color: #ffffff;
        }
      }
      .tabs {
        display: flex;
        gap: 5px;
        a {
          text-align: center;
          flex-grow: 1;
          display: inline-block;
          font-style: normal;
          font-weight: 600;
          font-size: 14px;
          line-height: 15px;
          background: #ffffff;
          border: #f1f1f1 solid thin;
          color: #000000;
          padding: 8px;
          text-decoration: none;
          margin-right: 10px;

          &:last-child {
            margin-right: 0px;
          }
          @media screen and (max-width: 959px) {
            font-size: 14px !important;
          }
          &.line-tracking {
            border-radius: 4px 0 0 4px;
          }
          &.consensus {
            border-radius: 0 4px 4px 0;
          }
          &.nuxt-link-active {
            background: #fa8c28;
            font-weight: 700;
            color: #ffffff;
          }
        }
      }
      .headline {
        color: #000000;
        font-style: normal;
        font-weight: 700;
        font-size: 20px;
        margin-bottom: 10px;
        a {
          color: #000000;
        }
      }
      .listings {
        ul {
          li {
            list-style-type: none;
            color: #000000;
            font-size: 15px !important;
            line-height: 26px !important;
            padding: 10px 0;
            border-bottom: 1px solid #e0e0e0;
          }
        }
      }
      .tabs-parent {
        .tabs {
          a {
            cursor: pointer;
            &.active {
              background: #fa8c28;
              font-weight: 700;
              color: #ffffff;
            }
          }
        }
      }
    }
    .white-content {
      background: #ffffff;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      padding: 12px;
      margin-top: 16px;
      h2 {
        color: #000000;
        font-style: normal;
        font-weight: 700;
        margin-bottom: 15px;
        font-size: 20px;
      }
      h3 {
        color: #000000;
        font-style: normal;
        font-weight: 700;
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
      &.differ-part {
        background: #666dff;
        padding: 7px 12px;
        @media all and (max-width: 340px) {
          padding: 12px;
        }
        h3 {
          color: #fff;
          span {
            background: #fa8c28;
            padding: 4px 10px;
            display: inline-block;
            border-radius: 3px;
            margin-left: 15px;
            @media all and (max-width: 340px) {
              margin-left: 10px;
              margin-top: 10px;
            }
          }
        }
      }
      .injuries-table {
        width: 100%;
        background: #fafaff;
        border: 0.5px solid #e4e4ed;
        border-radius: 8px;
        overflow: hidden;
        table {
          border-spacing: 0;
          width: 100%;
          tbody {
            tr {
              td {
                padding: 11px 0 11px 10px;
                font-size: 16px;
                font-weight: 400;
                @media all and (max-width: 960px) {
                  font-size: 16px !important;
                  padding: 10px;
                }
                @media all and (max-width: 767px) {
                  display: block;
                  padding: 7px 10px !important;
                }
              }

              @media all and (max-width: 767px) {
                padding: 10px;
                display: block;
              }
            }
            tr + tr td {
              border-top: 1px solid #e0e0e0;
              @media all and (max-width: 767px) {
                border: none;
              }
            }
            tr + tr {
              @media all and (max-width: 767px) {
                border-top: 1px solid #e0e0e0;
                display: block;
              }
            }
          }
        }
      }
      &.bet-game {
        text-transform: uppercase;
        text-align: center;
        font-size: 20px;
        font-weight: 500;
        display: flex;
        display: -webkit-flex;
        align-items: center;
        -webkit-align-items: center;
        justify-content: center;
        -webkit-justify-content: center;
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
    }
  }
  .mb-0 {
    margin-bottom: 0px !important;
  }
  .middle-panel + .left-panel {
    margin-left: 10px;
    margin-right: 0;
    .email-form {
      display: none !important;
    }
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
