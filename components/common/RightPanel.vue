<template>
  <div class="right-panel">
    <!-- <img src="@/assets/image/image 10.png" alt="image 10" />
    <img src="@/assets/image/image 13.png" alt="image 13" />
    <img src="@/assets/image/image 7.png" alt="image 7" /> -->
    <div class="sportbookwidget">
      <div class="title">Best Bonuses</div>
      <div
        v-for="bonus in bonuses"
        :key="`top-bonus-${bonus.id}`"
        class="contentbook"
      >
        <div class="sportflex">
          <div v-show="bonus.image" class="offerpic">
            <img :src="bonus.image" alt="image 13" loading="lazy" />
          </div>
          <div class="offercont">
            <span>{{ bonus.title }}</span>
            <p>{{ bonus.description }}</p>
          </div>
        </div>
        <div class="offerbtn">
          <a :href="bonus.button1Link">
            <span class="codepromo">{{ bonus.button1Text }}</span>
            <span class="codetext">Promo Code</span>
          </a>
          <a :href="bonus.button2Link" target="_blank" class="claimoffer">{{
            bonus.button2Text
          }}</a>
        </div>
      </div>
      <div v-if="!bonuses.length">
        <div v-if="!isBonusLoaded" class="notfound">
          <v-progress-circular
            color="primary"
            indeterminate
            :size="55"
            :width="8"
          ></v-progress-circular>
        </div>
        <div v-else class="no-bonus">No Bonuses Found</div>
      </div>
    </div>

    <div class="sports-chat" @click="chatClick()">
      Sports Chat <span><img src="@/assets/icon/bubble-chat.png" /></span>
    </div>

    <div class="sports-chat-area" :class="`${currentStatus ? 'active' : ''} `">
      <div class="title-area">
        <h5>Chat <img src="@/assets/icon/bubble-chat.png" /></h5>
        <div class="rules">
          <button @click="ruleClick('ShowRule')">Rules</button>
          <span @click="chatClick()">&times;</span>
        </div>
      </div>
      <div v-if="chatLink" class="chat-part">
        <iframe
          :src="chatLink"
          width="100%"
          height="400px"
          allowtransparency="yes"
          allow="autoplay"
          frameborder="0"
          marginheight="0"
          marginwidth="0"
          scrolling="auto"
        ></iframe>
      </div>
      <div
        class="rules-area"
        :class="`${ruleStatus === 'ShowRule' ? 'active' : ''} `"
      >
        <h3>
          Rules
          <button @click="ruleClick('HideRule')">Close</button>
        </h3>
        <div class="rules-content">
          <p>
            The goal of chat is to talk sports and sports betting! Help each
            other by sharing picks and having a good time!
          </p>
          <p>Below will not be tolerated</p>
          <p>
            You can chat about most things to a certain extent. Exception is
            absolutely NO talking about Religion or Politics.
          </p>
          <ul>
            <li>There will be NO talking about others or their families</li>
            <li>There will be NO name calling.</li>
            <li>
              There will be NO rambling on or repeating the same thing over and
              over.
            </li>
            <li>There will be NO racist or sexist comments.</li>
            <li>There will be NO posting of other websites.</li>
          </ul>
          <p>Basically treat others the way you would like to be treated.</p>
          <h4>
            Break the rules
            <img src="@/assets/image/warning.png" alt="warning" />
          </h4>
          <ul class="rules-break">
            <li>1st warning a 24 hour ban</li>
            <li>2nd warning 7 day ban</li>
            <li>3rd warning a lifetime ban</li>
          </ul>
        </div>
      </div>
    </div>

    <div v-if="$auth.loggedIn" class="show_on_login">
      <div
        v-for="data in bannerSingleObj"
        :key="data.category"
        class="video_parent"
      >
        <div v-for="item in data.list" :key="item?.id" class="video_child">
          <div class="right_video" v-html="item?.content"></div>
        </div>
      </div>

      <div
        v-for="data in bannerSingleObj2"
        :key="data.category"
        class="banner_parent"
      >
        <div v-for="item in data.list" :key="item?.id" class="banner_child">
          <div class="right_banner" v-html="item?.content"></div>
        </div>
      </div>
    </div>
    <!-- <div class="rightvideo">
      <iframe
        width="100%"
        height="250"
        src="https://www.youtube.com/embed/yAoLSRbwxL8"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
      ></iframe>
    </div> -->
  </div>
</template>

<script>
export default {
  name: "RightPanel",
  data() {
    return {
      groupByCategory: [],
      bannerSingleObj: [],
      bannerSingleObj2: [],
      currentStatus: false,
      ruleStatus: "HideRule",
      bonuses: [],
      isBonusLoaded: false,
    };
  },
  computed: {
    getAllBanner() {
      return this.$store.getters["bannerModule/getAllBanner"];
    },
    chatLink() {
      return this.$store.getters["default/getChatLink"] || false;
    },
    bonusesWidgets() {
      return this.$store.getters["default/getWidgetTop"];
    },
  },
  async beforeMount() {
    // await this.$store.dispatch("bannerModule/apiCall");
    // this.groupByCategory = this.getAllBanner?.reduce((group, product) => {
    //   const index = group.findIndex((x) => x.category === product.category);
    //   if (index > -1) {
    //     if (group[index].list) {
    //       group[index].list.push(product);
    //     } else {
    //       group[index].list = [product];
    //     }
    //   } else {
    //     group.push({ category: product.category, list: [product] });
    //   }
    //   return group;
    // }, []);
    // this.bannerSingleObj = this.getBannerObj("Video");
    // this.bannerSingleObj2 = this.getBannerObj("410x300");
  },
  mounted() {
    this.isBonusLoaded = false;
    this.bonuses = this.bonusesWidgets;
    this.isBonusLoaded = true;
  },
  methods: {
    getBannerObj(categoryname) {
      return this.groupByCategory?.filter(
        (res) => res.category === categoryname
      );
    },

    chatClick() {
      if (!this.currentStatus) {
        if (this.$auth.loggedIn) {
          this.currentStatus = !this.currentStatus;
        } else {
          window.location.href = "/login";
        }
      } else {
        this.currentStatus = !this.currentStatus;
      }
    },
    ruleClick(ruleType) {
      this.ruleStatus = ruleType;
    },
  },
};
</script>

<style lang="scss" scoped>
.banner_child {
  .right_banner {
    width: 100%;
    max-height: 300px;
  }
}
.video_child {
  .right_video {
    width: 100%;
    max-height: 300px;
    overflow: hidden;
    margin-bottom: 24px;
  }
}
.notfound {
  font-weight: bold;
  text-align: center;
  margin-top: 10%;
  margin-bottom: 10%;
}
.right-panel {
  // @media screen and (max-width: "1366px") {
  //   width: 410px;
  // }
  @media screen and (max-width: "768px") {
    display: none;
  }
  width: 410px;
  min-width: 410px;
  margin-left: 10px;
  @media screen and (max-width: 768px) {
    min-width: 250px;
  }
  @media screen and (min-width: 1024px) and (max-width: 1366px) {
    min-width: 220px;
  }
  img {
    width: 100%;
    height: auto;
    &:not(:last-child) {
      margin-bottom: 24px;
    }
  }

  .sportbookwidget {
    margin-bottom: 24px;
    background: #fff;
    background: #fff;
    border: #d7d7d7 solid thin;
    height: auto;
    .title {
      padding: 10px 15px;
      font-size: 16px;
      font-weight: 500;
    }

    .contentbook {
      padding: 9px 15px;
      background: #f2f2f2;
      margin-top: 2px;

      .sportflex {
        display: flex;
        align-items: center;

        .offerpic {
          width: 50px;
          min-width: 50px;
          height: 50px;
          overflow: hidden;
          border-radius: 8px;
          margin-right: 15px;

          img {
            height: 100% !important;
            object-fit: cover;
            object-position: top center;
            width: 100% !important;
          }
        }

        .offercont {
          span {
            font-size: 14px;
            font-weight: 500;
            color: #000000;

            @media screen and (min-width: 1026px) and (max-width: 1299px) {
              font-size: 11px;
            }
          }
          p {
            font-size: 15px;
            font-weight: 500;
            color: #000000;
            @media screen and (min-width: 1026px) and (max-width: 1299px) {
              font-size: 12px;
            }
          }
        }
      }

      .offerbtn {
        display: flex;
        margin-top: 15px;
        gap: 5px;

        a {
          text-decoration: none;
          flex: 0 0 50%;
          flex-shrink: 1;
          flex-direction: column;
          display: flex;
          justify-content: center;
          background: #2e305c;
          padding: 8px 12px;
          text-align: center;
          border-radius: 5px;
          margin-right: 10px;

          .codepromo {
            color: #fff;
            font-size: 15px;
            text-transform: uppercase;
            font-weight: 600;
            @media screen and (min-width: 1026px) and (max-width: 1299px) {
              font-size: 12px;
            }
          }
          .codetext {
            font-size: 10px;
            color: #fff;
          }
        }

        .claimoffer {
          text-decoration: none;
          flex: 0 0 50%;
          flex-shrink: 1;
          background: #fa8c28;
          color: #ffffff;
          padding: 12px;
          font-size: 15px;
          font-weight: 600;
          border-radius: 5px;
          @media screen and (min-width: 1026px) and (max-width: 1299px) {
            font-size: 12px;
          }
        }
      }
    }
    .no-bonus {
      text-align: center;
      padding-bottom: 15px;
    }
  }

  .sports-chat {
    background: #666dff;
    text-align: center;
    color: #fff;
    font-size: 16px;
    font-weight: 500;
    padding: 10px;
    margin-bottom: 24px;
    height: 50px;
    border-radius: 4px;
    display: flex;
    display: -webkit-flex;
    align-items: center;
    -webkit-align-items: center;
    align-content: center;
    -webkit-align-content: center;
    justify-content: center;
    -webkit-justify-content: center;
    cursor: pointer;
    text-transform: uppercase;
    span {
      margin-left: 15px;
    }
    @media all and (max-width: 959px) {
      display: none;
    }
  }
  .sports-chat-area {
    position: fixed;
    bottom: -300%;
    right: 32px;
    width: 410px;
    border-radius: 5px 5px 0 0;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
    z-index: 99;
    background: #fff;
    overflow: hidden;
    transition: 0.5s;
    -webkit-transition: 0.5s;
    &.active {
      bottom: 0;
    }
    .title-area {
      display: flex;
      display: -webkit-flex;
      align-items: center;
      -webkit-align-items: center;
      justify-content: space-between;
      -webkit-justify-content: space-between;
      background: #2e305c;
      padding: 10px;
      h5 {
        display: flex;
        display: -webkit-flex;
        align-items: center;
        -webkit-align-items: center;
        font-size: 16px;
        color: #fff;
        img {
          margin-left: 15px;
          max-width: 27px;
        }
      }
      .rules {
        display: flex;
        display: -webkit-flex;
        align-items: center;
        -webkit-align-items: center;
        button {
          background: #666dff;
          color: #fff;
          font-weight: 500;
          padding: 7px 20px;
          border-radius: 5px;
          outline: none;
          border: none;
          box-shadow: none;
        }
        span {
          font-size: 30px;
          color: #fff;
          line-height: 0px;
          margin-left: 12px;
          padding-right: 5px;
          cursor: pointer;
        }
      }
    }
    .chat-part {
      height: 400px;
      &::-webkit-scrollbar {
        width: 5px;
        border-radius: 100px;
      }
      &::-webkit-scrollbar-track {
        background: rgb(235, 235, 235);
        border-radius: 100px;
      }
      &::-webkit-scrollbar-thumb {
        background: #666dff;
        border-radius: 100px;
      }
    }
    .rules-area {
      position: absolute;
      top: 0;
      width: 100%;
      left: -100%;
      bottom: 0;
      background: #fff;
      z-index: 99;
      &.active {
        left: 0;
      }
      h3 {
        display: flex;
        display: -webkit-flex;
        align-items: center;
        -webkit-align-items: center;
        justify-content: space-between;
        -webkit-justify-content: space-between;
        background: #2e305c;
        padding: 10px;
        color: #fff;
        font-weight: 500;
        font-size: 16px;
        button {
          background: #666dff;
          color: #fff;
          font-weight: 500;
          padding: 7px 15px;
          border-radius: 5px;
          outline: none;
          border: none;
          box-shadow: none;
          font-size: 14px;
        }
      }
      .rules-content {
        padding: 25px;
        height: 400px;
        overflow-y: auto;
        p {
          margin-bottom: 15px;
          line-height: 20px;
        }
        ul {
          margin-bottom: 20px;
          li {
            list-style-type: none;
            border-left: 1px solid #2e305c;
            margin: 7px 0;
            background: #f1f1ff;
            padding: 10px;
            color: #2e305c;
          }
          &.rules-break {
            margin-bottom: 0px;
            li {
              background: #ffe5e5;
              color: #d73737;
              border-left: 1px solid #d73737;
            }
          }
        }
        h4 {
          color: #2e305c;
          font-size: 16px;
          font-weight: 500;
          margin-bottom: 17px;
          display: flex;
          display: -webkit-flex;
          align-items: center;
          -webkit-align-items: center;
          img {
            max-width: 25px;
            margin-left: 15px;
          }
        }
        &::-webkit-scrollbar {
          width: 5px;
          border-radius: 100px;
        }
        &::-webkit-scrollbar-track {
          background: rgb(235, 235, 235);
          border-radius: 100px;
        }
        &::-webkit-scrollbar-thumb {
          background: #666dff;
          border-radius: 100px;
        }
      }
    }
  }

  .rightvideo {
    margin-bottom: 24px;

    iframe {
      @media screen and (min-width: 1024px) and (max-width: 1366px) {
        aspect-ratio: 1.4;
        -webkit-aspect-ratio: 1.4;
        height: 200px;
      }
    }
  }
}
</style>
