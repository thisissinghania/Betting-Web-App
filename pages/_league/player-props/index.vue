<template>
  <div class="pick-resource">
    <left-panel />
    <div class="middle-panel">
      <div class="white-content">
        <h1>Denver Nuggets Player Props & Betting Odds</h1>
        <div class="double_divide">
          <div class="search_area">
            <input
              type="text"
              class="form-control"
              placeholder="Type something.."
            />
            <button>Search</button>
          </div>
          <div class="date-pick">
            <input type="date" class="form-control" />
          </div>
        </div>
      </div>

      <slider-comp :type="type" />

      <div class="content">
        <div class="m-top-10 item">
          <h1 class="date">JUNE 13, 2023</h1>
          <div class="slot">
            <div class="body">
              <div class="left">
                <p class="team-b">Denver Nuggets</p>
              </div>
              <a class="right" href="/player-props-detail">
                <img alt="arrow" src="@/assets/icon/arrow-round-yellow.svg" />
              </a>
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
import SliderComp from "@/components/common/DefaultSlider.vue";

export default {
  name: "PlayerProp",
  components: { RightPanel, LeftPanel, SliderComp },
  data() {
    return {
      type: "computer-picks",
      isLoading: false,
    };
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
      margin-top: 16px;
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
          margin-top: 0px;
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

            color: #212237;
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

                color: #000000;

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
    .white-content {
      background: #ffffff;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      padding: 12px;
      margin-bottom: 16px;
      h1 {
        color: #000000;
        font-style: normal;
        font-weight: 700;
        margin-bottom: 15px;
        font-size: 20px;
      }

      .double_divide {
        display: grid;
        grid-template-columns: 66% 33%;
        grid-column-gap: 1%;

        @media all and (max-width: 767px) {
          grid-template-columns: 100%;
          grid-column-gap: 0;
          grid-row-gap: 10px;
        }
        .form-control {
          width: 100%;
          border: 1px solid #e0e0e0;
          padding: 5px 10px;
          outline: none;
          height: 42px;
          border-radius: 5px;
        }
        .search_area {
          display: flex;
          align-items: center;
          button {
            background-color: #666dff;
            border-radius: 4px;
            white-space: nowrap;
            padding: 9px 20px;
            color: #fff;
            font-size: 16px;
            text-transform: capitalize;
            height: 42px;
            margin-left: 10px;
          }
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
