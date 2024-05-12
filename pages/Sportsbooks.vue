<template>
  <div class="sportsbooks">
    <left-panel />
    <div class="middle-panel">
      <div class="content">
        <div class="list">
          <div
            v-for="(item, index) in getSportsbooks"
            :key="`book-item-${index}`"
            class="book-item"
          >
            <div class="head">
              <div class="left">
                <img
                  src="@/assets/icon/round-star-dark.svg"
                  alt="round star dark"
                />
                <span>{{ item.title }}</span>
              </div>
              <div class="right">
                <span class="name">PROMO CODE:</span>
                <span class="value">{{ item.promoCode }}</span>
              </div>
            </div>
            <div class="box">
              <img :src="item.image" width="100%" height="100%" />
            </div>
            <div class="list">
              <div class="item">
                <img src="@/assets/icon/arrow-circle.svg" alt="li arrow" />
                <p class="text">{{ item.bulletPoint1 }}</p>
              </div>
              <div class="item">
                <img src="@/assets/icon/arrow-circle.svg" alt="li arrow" />
                <p class="text">{{ item.bulletPoint2 }}</p>
              </div>
              <div class="item">
                <img src="@/assets/icon/arrow-circle.svg" alt="li arrow" />
                <p class="text">{{ item.bulletPoint3 }}</p>
              </div>
            </div>
            <div class="bottom">
              <a :href="item.link" target="_blank"
                ><span>{{ item.buttonText }}</span></a
              >
            </div>
          </div>
        </div>
        <div v-if="!isLoading && getSportsbooks.length === 0">
          <p class="notification">No sportsbooks available for this league.</p>
        </div>
        <div v-else-if="isLoading" class="notfound">
          <v-progress-circular
            color="primary"
            indeterminate
            :size="55"
            :width="8"
          ></v-progress-circular>
        </div>
      </div>
    </div>
    <right-panel />
  </div>
</template>

<script>
import LeftPanel from "@/components/common/LeftPanel.vue";
import RightPanel from "@/components/common/RightPanel.vue";
export default {
  name: "Sportsbooks",
  components: { LeftPanel, RightPanel },
  data() {
    return {
      isLoading: true,
      meta: {
        metaTitle: "",
        metaDescription: "",
      },
    };
  },
  async beforeMount() {
    await this.$store.dispatch("sportsbooks/apiCall");

    this.meta.metaTitle =
      this.$store.getters["sportsbooks/getSportsbooksMeta"].metaTitle;
    this.meta.metaDescription =
      this.$store.getters["sportsbooks/getSportsbooksMeta"].metaDescription;
    this.isLoading = false;
  },
  head() {
    return {
      title: this.meta.metaTitle,
      meta: [
        {
          name: "description",
          content: this.meta.metaDescription,
        },
      ],
    };
  },
  computed: {
    getSportsbooks() {
      return this.$store.getters["sportsbooks/getSportsbooks"];
    },
  },
};
</script>

<style lang="scss" scoped>
.sportsbooks {
  display: flex;
  justify-content: space-between;
  padding: 24px 32px;
  gap: 24px;
  background-color: #ececec;
  .middle-panel {
    .content {
      background-color: #ffffff;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      padding: 24px 27px;
      .notfound {
        font-weight: bold;
        text-align: center;
      }
      .book-item {
        border: 2px dashed #d9d9d9;
        border-radius: 8px;
        padding: 24px;
        &:not(:last-child) {
          margin-bottom: 32px;
        }
        .head {
          display: flex;
          justify-content: space-between;
          align-items: center;
          @media all and (max-width: 700px) {
            flex-direction: column;
            align-items: initial;
          }
          @media all and (min-width: 1025px) and (max-width: 1299px) {
            flex-direction: column;
            align-items: initial;
          }
          .left {
            display: flex;
            gap: 10px;
            align-items: center;
            span {
              color: #2e305c;
              font-style: normal;
              font-weight: 700;
              font-size: 19px;
              line-height: 19px;
              text-transform: uppercase;
            }
            img {
              margin-right: 10px;
            }
          }
          .right {
            display: flex;
            align-items: center;
            gap: 6px;
            font-style: normal;
            font-weight: 500;
            font-size: 15px;
            line-height: 17px;
            background: #fa8c28;
            padding: 12px 16px;
            outline: #fff dashed 1px;
            outline-offset: -5px;
            border-radius: 4px;

            @media all and (min-width: 1025px) and (max-width: 1299px) {
              margin-top: 15px;
            }
            .name {
              color: #ffffff;
            }
            .value {
              color: #ffffff;
              font-weight: 600;
            }
          }
        }
        .box {
          height: 109px;
          margin-top: 24px;
          margin-bottom: 16px;
          background: #f5f5f5;
          border-radius: 8px;
          @media screen and (max-width: 767px) {
            height: 80px;
          }

          @media screen and (min-width: 768px) and (max-width: 1050px) {
            height: 100px;
            border: none;
          }

          @media screen and (min-width: 1052px) and (max-width: 1200px) {
            height: 100px;
            border: none;
          }

          img {
            border-radius: 8px;
            height: 100%;
            width: 100%;
            object-position: center;
            object-fit: cover;
          }
        }
        .list {
          .item {
            display: flex;
            gap: 8px;
            align-items: flex-start;
            margin-bottom: 12px;
            img {
              width: 18px;
              margin-right: 10px;
            }
            .text {
              font-style: normal;
              font-weight: 400;
              font-size: 16px;
              line-height: 22px;
              /* or 138% */

              color: #000000;
            }
          }
        }
        .bottom {
          margin-top: 20px;
          span {
            background: #2e305c;
            border-radius: 4px;
            padding: 16px;
            text-align: center;
            font-style: normal;
            font-weight: 500;
            font-size: 16px;
            line-height: 19px;
            text-transform: uppercase;

            color: #ffffff;
            display: block;
          }
          a {
            text-decoration: none;
          }
        }
      }
    }
  }
  @media screen and (max-width: 768px) {
    background: #ffffff;
    padding: 0;
    .middle-panel {
      min-width: 100%;
      .content {
        padding: 16px;
        border: none;
        .book-item {
          border: 1px solid #e0e0e0;
          padding: 12px;
          &:not(:last-child) {
            margin-bottom: 16px;
          }
          .head {
            .left {
              span {
                font-size: 18px;
              }
            }
            .right {
              font-size: 14px;
              margin-top: 16px;
            }
          }
          .list {
            .item {
              .text {
                font-size: 15px !important;
                font-weight: 500 !important;
              }
            }
          }
          .bottom {
            span {
              font-size: 15px;
            }
          }
        }
      }
    }
  }
}
</style>
