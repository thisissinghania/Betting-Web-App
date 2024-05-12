<template>
  <div class="pick-resource">
    <left-panel />

    <div class="middle-panel">
      <div class="content">
        <h1>Team A vs. Team B Picks, Odds & Trends</h1>
        <div class="game-listing">
          <div class="single-block">
            <div class="title">Odds & Trends <a href="#">>></a></div>
            <div class="third-block">
              <div class="team">Chicago Bears</div>
              <div class="or">vs</div>
              <div class="team2">Green Bay Packers Picks</div>
            </div>
          </div>
          <div class="single-block">
            <div class="title">Odds & Trends <a href="#">>></a></div>
            <div class="third-block">
              <div class="team">Chicago Bears</div>
              <div class="or">vs</div>
              <div class="team2">Green Bay Packers Picks</div>
            </div>
          </div>
          <div class="single-block">
            <div class="title">Odds & Trends <a href="#">>></a></div>
            <div class="third-block">
              <div class="team">Chicago Bears</div>
              <div class="or">vs</div>
              <div class="team2">Green Bay Packers Picks</div>
            </div>
          </div>
          <div class="single-block">
            <div class="title">Odds & Trends <a href="#">>></a></div>
            <div class="third-block">
              <div class="team">Chicago Bears</div>
              <div class="or">vs</div>
              <div class="team2">Green Bay Packers Picks</div>
            </div>
          </div>
          <div class="single-block">
            <div class="title">Odds & Trends <a href="#">>></a></div>
            <div class="third-block">
              <div class="team">Chicago Bears</div>
              <div class="or">vs</div>
              <div class="team2">Green Bay Packers Picks</div>
            </div>
          </div>
          <div class="single-block">
            <div class="title">Odds & Trends <a href="#">>></a></div>
            <div class="third-block">
              <div class="team">Chicago Bears</div>
              <div class="or">vs</div>
              <div class="team2">Green Bay Packers Picks</div>
            </div>
          </div>
          <div class="single-block">
            <div class="title">Odds & Trends <a href="#">>></a></div>
            <div class="third-block">
              <div class="team">Chicago Bears</div>
              <div class="or">vs</div>
              <div class="team2">Green Bay Packers Picks</div>
            </div>
          </div>
          <div class="single-block">
            <div class="title">Odds & Trends <a href="#">>></a></div>
            <div class="third-block">
              <div class="team">Chicago Bears</div>
              <div class="or">vs</div>
              <div class="team2">Green Bay Packers Picks</div>
            </div>
          </div>
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
  name: "Balance",
  components: { RightPanel, LeftPanel },
  methods: {},
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
      h1 {
        color: #000000;
        font-style: normal;
        font-weight: 700;
        margin-bottom: 15px;
        font-size: 20px;
      }
      .game-listing {
        display: grid;
        grid-template-columns: calc(50% - 6px) calc(50% - 6px);
        grid-column-gap: 12px;
        grid-row-gap: 12px;
        .single-block {
          background: #fafaff;
          border: 0.5px solid #e4e4ed;
          padding: 0;
          border-radius: 8px;
          .title {
            padding: 12px;
            border-bottom: 0.5px solid #e4e4ed;
            position: relative;
            color: #b8b8cf;
            a {
              position: absolute;
              right: 12px;
              top: 50%;
              transform: translateY(-50%);
              -webkit-transform: translateY(-50%);
              text-decoration: none;
              color: #fa8c28;
              cursor: pointer;
              font-size: 16px;
            }
          }
          .third-block {
            padding: 12px;
            display: flex;
            display: -webkit-flex;
            justify-content: space-between;
            -webkit-justify-content: space-between;
            align-items: center;
            -webkit-align-items: center;
            .or {
              width: 23px;
              height: 23px;
              text-align: center;
              background: #fa8c28;
              border-radius: 100px;
              color: #fff;
              line-height: 23px;
              font-size: 14px;
            }
            .team {
              width: 40%;
              text-align: left;
              font-size: 16px;
              font-weight: 400;
            }
            .team2 {
              width: 40%;
              text-align: right;
              font-size: 16px;
              font-weight: 400;
            }
          }
        }
        @media all and (max-width: 767px) {
          grid-template-columns: 100%;
        }
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
