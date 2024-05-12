<template>
  <div class="leagues">
    <div
      v-for="(live, lives_index) in lives"
      :key="lives_index"
      class="league-group"
    >
      <p class="date">{{ live.date }}</p>
      <table
        v-for="(item, data_index) in live.data"
        :key="data_index"
        class="time-group formobileonly"
      >
        <thead>
          <tr>
            <th class="time">{{ item.time }}</th>
            <th class="spread">SPREAD</th>
            <th class="moneyLine">MONEYLINE</th>
            <th class="total">TOTAL</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(entry, entries_index) in item.entries"
            :key="entries_index"
            @click="$modal.show('live-modal')"
          >
            <td :title="item.time" class="time">
              <div class="parent">
                <div>{{ entry.time }}</div>
                <span class="score">{{ entry.score }}</span>
              </div>
            </td>
            <td title="SPREAD" class="spread">{{ entry.spread }}</td>
            <td title="MONEYLINE" class="moneyLine">{{ entry.moneyLine }}</td>
            <td title="TOTAL" class="total">
              <div class="text-with-arrow">
                <div class="inset">
                  <span><img :src="entry.imageUrl" alt="down-arrow" /></span>
                  <p>{{ entry.total }}</p>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- sportbook-widget -->
      <div class="sportbook-listing">
        <div class="title-list">Sportsbook Listings Widget</div>
        <div class="sportlist">
          <div class="leftbook">
            <div class="imgpart">
              <img src="@/assets/image/image 13.png" alt="image 13" />
            </div>
            <div class="contpart">
              <span class="subhed">Prizepicks</span>
              <p class="subcont">
                First Bet Offer: Get up to $1,000 Paid Back in Bonus Bets if
                Your First Bet Loses!
              </p>
            </div>
          </div>
          <div class="rightbook">
            <div class="offerbtn">
              <div class="promocodes">
                <span class="codepromo">Promo123</span>
                <span class="codetext">Promo Code</span>
              </div>
              <button class="claimoffer">Claim $1000</button>
            </div>
          </div>
        </div>
        <div class="sportlist">
          <div class="leftbook">
            <div class="imgpart">
              <img src="@/assets/image/image 13.png" alt="image 13" />
            </div>
            <div class="contpart">
              <span class="subhed">Prizepicks</span>
              <p class="subcont">Win $50 if Giannis Scores 1+ Point!</p>
            </div>
          </div>
          <div class="rightbook">
            <div class="offerbtn">
              <div class="promocodes">
                <span class="codepromo">Promo123</span>
                <span class="codetext">Promo Code</span>
              </div>
              <button class="claimoffer">Claim $50</button>
            </div>
          </div>
        </div>
      </div>
      <!-- end-sportbook -->

      <!-- native-ad -->
      <!-- <img src="@/assets/image/native.png" alt="native" class="nativebanner" /> -->
      <div v-if="$auth.loggedIn" class="show_on_login">
        <div
          v-for="data in bannerSingleObj"
          :key="data.category"
          class="banner_parent"
        >
          <div v-for="item in data.list" :key="item?.id" class="banner_child">
            <div class="native_banner" v-html="item?.content"></div>
          </div>
        </div>
      </div>
      <!-- end-native-ad -->
    </div>

    <client-only>
      <modal class="my-custom-modal my-bet-modal" name="live-modal">
        <div class="modal-content">
          <h1 class="heading">Choose one of the below!</h1>
          <div class="body">
            <div class="item challenge">
              <router-link to="/bet">
                <img src="@/assets/image/challenge.svg" alt="challenge" />
              </router-link>
              <p>7 Days Challenge</p>
            </div>
            <div class="item pick-3">
              <router-link to="/betprocess">
                <img src="@/assets/image/picks-3.svg" alt="picks 3" />
              </router-link>
              <p>Pick 3</p>
            </div>
            <div class="item pick-5">
              <router-link to="/betprocess">
                <img src="@/assets/image/picks-5.svg" alt="picks 5" />
              </router-link>
              <p>Pick 5</p>
            </div>
            <div class="item race">
              <router-link to="/betprocess">
                <img
                  src="@/assets/image/moneyLineMadness.svg"
                  alt="Moneyline Madness"
                />
              </router-link>
              <p>Moneyline Madness</p>
            </div>
            <div class="item race">
              <router-link to="/betprocess">
                <img src="@/assets/image/live.png" alt="live" />
              </router-link>
              <p>Live</p>
            </div>
            <div class="item race">
              <router-link to="/survivor">
                <img src="@/assets/image/survivor.png" alt="survivor" />
              </router-link>
              <p>Survivor</p>
            </div>
          </div>
        </div>
      </modal>
    </client-only>
  </div>
</template>

<script>
export default {
  name: "LiveList",
  components: {},
  // eslint-disable-next-line vue/require-prop-types
  props: ["lives"],
  data() {
    return {
      index: 0,
      groupByCategory: [],
      bannerSingleObj: [],
    };
  },
  computed: {
    getAllBanner() {
      return this.$store.getters["bannerModule/getAllBanner"];
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

    // this.bannerSingleObj = this.getBannerObj("Native");
  },
  methods: {
    getBannerObj(categoryname) {
      return this.groupByCategory?.filter(
        (res) => res.category === categoryname
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.banner_child {
  .native_banner {
    width: 100%;
    overflow: hidden;
    margin-bottom: 15px;
    text-align: center;
    display: flex;
    display: -webkit-flex;
    flex-wrap: wrap;
    -webkit-flex-wrap: wrap;
    justify-content: center;
    -webkit-justify-content: center;
  }
}
.leagues {
  margin-top: 16px;
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 12px;
  .league-group:last-child table.time-group:last-child {
    margin-bottom: 0 !important;
  }
  .league-group {
    p.date {
      padding: 12px 0;
      margin: 0;
      text-align: center;
      font-weight: 600;
      font-size: 16px;
      text-transform: uppercase;
      color: #ffffff;
      background: #2e305c;
      border-radius: 4px;
      margin-bottom: 8px;
      @media all and (max-width: 959px) {
        font-size: 15px !important;
      }
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
          padding: 7px 8px !important;
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
          cursor: pointer;
          border-bottom: #2e305c solid 2px;
          td {
            font-size: 15px;
            font-weight: 400;
            padding: 10px 8px !important;
            line-height: 16px;
            @media screen and (min-width: 960px) and (max-width: 1090px) {
              font-size: 14px !important;
            }
            @media screen and (max-width: 959px) {
              font-size: 15px !important;
            }
            @media screen and (max-width: 767px) {
              font-size: 15px !important;
              font-weight: 500 !important;
            }
            .score {
              background: #fa8c28;
              font-size: 14px !important;
              font-weight: 600;
              padding: 3px 5px;
              border-radius: 3px;
              color: #fff;
              margin-left: 10px;
              display: inline-block;
            }
            &.time {
              padding: 11px 0 11px 12px;
              color: #000000;
              vertical-align: middle;
              .parent {
                display: flex;
                display: -webkit-flex;
                align-items: center;
                -webkit-align-items: center;
                @media all and (max-width: 767px) {
                  justify-content: flex-end;
                  -webkit-justify-content: flex-end;
                  flex-wrap: wrap;
                  -webkit-flex-wrap: wrap;
                }
                div {
                  @media all and (max-width: 420px) {
                    width: 100%;
                    margin-bottom: 3px;
                  }
                }
              }
            }
            &:not(.time) {
              // font-weight: 400;
              text-align: center;
              color: #000000;
            }
            .text-with-arrow {
              display: flex;
              align-items: center;
              display: -webkit-flex;
              -webkit-align-items: center;
              .inset {
                width: 100%;
                margin: 0 auto;
                display: flex;
                display: -webkit-flex;
                justify-content: center;
                -webkit-justify-content: center;
                align-items: center;
                -webkit-align-items: center;
                span {
                  width: 12px;
                  line-height: 0px;
                  img {
                    max-width: 100%;
                  }
                }
                p {
                  width: 100px;
                  @media screen and (min-width: 960px) and (max-width: 1090px) {
                    font-size: 14px !important;
                    width: 87px;
                  }
                  @media all and (max-width: 959px) {
                    font-size: 15px !important;
                  }
                  @media all and (max-width: 767px) {
                    width: auto;
                    margin-left: 10px;
                  }
                }
                @media all and (max-width: 767px) {
                  justify-content: flex-end;
                  -webkit-justify-content: flex-end;
                }
              }
            }
          }
          td:nth-child(1) {
            width: 40%;
            @media screen and (max-width: 767px) {
              width: 100%;
            }
          }
          td:nth-child(2),
          td:nth-child(3),
          td:nth-child(4) {
            width: 20%;
            @media screen and (max-width: 767px) {
              width: 100%;
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
      @media all and (max-width: 1300px) {
        flex-wrap: wrap;
        -webkit-flex-wrap: wrap;
      }
      .item {
        width: 25%;
        @media all and (max-width: 1300px) {
          margin: 10px 0;
        }
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
