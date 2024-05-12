<template>
  <div class="footer">
    <div class="footerBanner flex-wrap show_on_login">
      <div
        v-for="data in bannerSingleObj"
        :key="data.category"
        class="banner_parent"
      >
        <div
          v-for="item in data.list"
          :key="item?.id"
          class="banner_child footer_banner"
        >
          <div class="fotbaner" v-html="item?.content"></div>
        </div>
      </div>
    </div>

    <div class="bodyBox">
      <div class="boxInner">
        <div class="footer-mobile">
          <div class="right">
            <div class="useful">
              <p>USEFUL</p>
              <div class="line"></div>
              <ul>
                <li>
                  <a href="/faq" class="">FAQ</a>
                </li>
                <li>
                  <a href="/rules" class="">RULES</a>
                </li>
                <li>
                  <a href="/privacy" class="">PRIVACY</a>
                </li>
                <li>
                  <a href="/terms" class="">TERMS &amp; COINDITIONS</a>
                </li>
                <li><a href="/contact-us" class="">CONTACT US</a></li>
                <li>
                  <a href="https://www.pickatm.com/bet/" class="">BLOG</a>
                </li>
              </ul>
            </div>
            <div class="betting">
              <p>BETTING TOOLS</p>
              <div class="line"></div>
              <ul>
                <li><a href="/computer-picks">COMPUTER PICKS</a></li>
                <li><a href="/consensus-picks">CONSENSUS PICKS</a></li>
              </ul>
            </div>
          </div>

          <div class="contnt-fot">
            <h1 v-html="getTypeConfig('homepage_header_text_mobile')"></h1>
            <p>
              {{ getTypeConfig("homepage_footer_text_mobile") }}
            </p>
          </div>
        </div>

        <div class="innerLink">
          <div class="followUs">
            <p>Follow us on:</p>
            <div class="icons">
              <a
                v-if="getSocialSites.hasOwnProperty('facebook')"
                :href="getSocialSites.facebook"
                target="_blank"
              >
                <img src="@/assets/icon/facebook.svg" alt="facebook icon" />
              </a>

              <a
                v-if="getSocialSites.hasOwnProperty('instagram')"
                :href="getSocialSites.instagram"
                target="_blank"
              >
                <img src="@/assets/icon/instagram.svg" alt="instagram icon" />
              </a>

              <a
                v-if="getSocialSites.hasOwnProperty('tiktok')"
                :href="getSocialSites.tiktok"
                target="_blank"
              >
                <img src="@/assets/icon/tt.svg" alt="tiktok icon"
              /></a>

              <a
                v-if="getSocialSites.hasOwnProperty('youtube')"
                :href="getSocialSites.youtube"
                target="_blank"
              >
                <img src="@/assets/image/f-youtube.svg" alt="youtube icon"
              /></a>

              <a
                v-if="getSocialSites.hasOwnProperty('twitter')"
                :href="getSocialSites.twitter"
                target="_blank"
              >
                <img src="@/assets/image/f-twitter.svg" alt="twitter icon"
              /></a>
            </div>
          </div>
          <ul>
            <li><a href="/privacy">Privacy</a></li>
            <li><a href="/terms">Terms</a></li>
            <li><a href="/contact-us">Contact Us</a></li>
            <li><a href="https://www.pickatm.com/bet/">Blog</a></li>
          </ul>

          <p>
            Copyright &copy; {{ new Date().getFullYear() }}
            <span>PickATM.com</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "DefaultFooter",
  data() {
    return {
      groupByCategory: [],
      bannerSingleObj: [],
    };
  },
  computed: {
    ...mapGetters("default", ["getTypeConfigs", "getSocialSites"]),
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
    // this.bannerSingleObj = this.getBannerObj("970x250");
  },
  methods: {
    getTypeConfig(name) {
      for (const typeConfig in this.getTypeConfigs) {
        if (this.getTypeConfigs[typeConfig].field_name === name) {
          return this.getTypeConfigs[typeConfig].field_value;
        }
      }

      return "";
    },

    getBannerObj(categoryname) {
      return this.groupByCategory?.filter(
        (res) => res.category === categoryname
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.flex-wrap {
  flex-wrap: wrap;
  -webkit-flex-wrap: wrap;
}

.footer {
  .footerBanner {
    padding: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #31335c;

    .fotbaner {
      overflow: hidden;
      width: 970px;
      height: 250px;
      img {
        width: auto;
        height: 100%;
        object-fit: cover;
        object-position: top center;
        @media screen and (min-width: 768px) and (max-width: 1020px) {
          width: 100%;
        }
      }
    }
  }

  .bodyBox {
    background: #2e305c;
    padding: 20px 32px 20px 32px;
    color: white;

    .boxInner {
      .footer-mobile {
        text-align: center;
        display: none;
        @media screen and (max-width: 767px) {
          display: block;
          margin-bottom: 20px;
        }
        h1 {
          margin-top: 0;
          font-style: normal;
          font-weight: 400;
          font-size: 37.57px;
          line-height: 45px;
          margin-bottom: 8px;

          span {
            font-weight: 800;
            color: #fa8c28;
          }
        }
        p {
          font-size: 13px !important;
        }

        .right {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-top: 25px;
          margin-bottom: 25px;

          p {
            font-style: normal;
            font-weight: 600;
            font-size: 16px;
            line-height: 19px;
            text-transform: uppercase;
            margin: 0;
            margin-bottom: 4px;
            text-align: left;
          }

          .line {
            width: 63px;
            height: 2px;
            background-color: #fa8c28;
          }

          ul {
            -webkit-padding-start: 0px;
            padding-inline-start: 0px;
            margin-top: 10px;
            text-align: left;

            li {
              font-weight: 400;
              font-size: 9px;
              line-height: 20px;
              list-style: none;
              text-decoration: none;
              cursor: pointer;
              margin-top: 4px;

              a {
                font-style: normal;
                font-weight: 400;
                font-size: 9px;
                line-height: 20px;
                text-transform: uppercase;
                color: #fff;
                text-decoration: none;
              }
            }
          }
        }
      }
      .innerLink {
        display: flex;
        flex-direction: column;

        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        p {
          font-size: 14px !important;
          span {
            color: #fa8c28;
            cursor: pointer;
          }
        }
        .followUs {
          display: flex;
          align-items: center;
          @media screen and (max-width: 767px) {
            border-bottom: #fff solid thin;
            padding-bottom: 15px;
            margin-bottom: 15px;
            max-width: 100%;
            width: 100%;
            justify-content: center;
          }

          p {
            font-size: 16px !important;
            font-weight: 700;
            margin-right: 10px;
          }

          img {
            width: 25px;
            margin-left: 4px;
            cursor: pointer;
          }
        }

        ul {
          display: flex;

          list-style: none;
          color: rgb(201, 201, 201);
          margin: 6px auto;
          @media screen and (max-width: 767px) {
            display: none;
          }
          li {
            margin: auto 4px;
            cursor: pointer;
          }

          li:hover,
          a:hover {
            color: #fa8c28;
          }

          a {
            text-decoration: none;
            color: rgb(201, 201, 201);
          }
        }
      }
    }
  }
  @media screen and (max-width: 767px) {
    .footerBanner {
      display: none !important;
    }
    .bodyBox {
      padding: 15px;
    }
  }
}
</style>
