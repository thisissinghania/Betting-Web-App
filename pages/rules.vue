<template>
  <div class="rulls">
    <left-panel />
    <div class="middle-panel">
      <h1 class="heading">Our Rules</h1>
      <div class="list">
        <div v-for="(rule, index) in rulesData" :key="index" class="item">
          <div class="caption" @click="openContent(index)">
            <font-awesome-icon
              icon="fa-solid fa-plus"
              :class="openRule === index ? 'opened' : ''"
            ></font-awesome-icon>
            <h1>{{ index }}</h1>
          </div>
          <div class="faqarea" :class="openRule === index ? 'active' : ''">
            <div v-for="(content, i) in rule" :key="i" class="listfaq">
              <div class="headfaq">
                <img src="@/assets/image/questfaq.svg" alt="questfaq" />
                {{ content.title }}
              </div>
              <div class="contentsfaq" v-html="content.description"></div>
            </div>
          </div>
        </div>
        <div v-if="isLoading" class="notfound">
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
  name: "Rulls",
  components: {
    LeftPanel,
    RightPanel,
  },
  async asyncData({ $axios, req, store }) {
    //  if (process.server) {
    $axios.onRequest((config) => {
      config.headers.Origin = req
        ? req.headers.host
        : window.location.host.split(":")[0];
    });
     const clientData = store.getters["default/getClient"];

    let faviconVal = ''; 
    for (const ky in store.getters["default/getTypeConfigs"]) {
      if (store.getters["default/getTypeConfigs"][ky].field_name === 'homepage_favicon_image') {
        faviconVal = store.getters["default/getTypeConfigs"][ky].field_value;
      }
    }

    // Fetch a list of Rules

    await store.dispatch("default/fetchRules");
    const response = store.getters["default/getRules"];

    const rulesData = response.data;

    const mainData = {
      title: response?.meta?.metaTitle,
      description: response?.meta?.metaDescription,
      image: clientData?.sharingImage,
      favicon: faviconVal
    };

    const headData = {
      title: mainData.title,
      meta: [
        {
          hid: "description",
          name: "description",
          content: mainData.description,
        },
        {
          hid: "og:title",
          property: "og:title",
          content: mainData.title,
        },
        {
          hid: "og:description",
          property: "og:description",
          content: mainData.description,
        },
        {
          hid: "og:image",
          property: "og:image",
          content: mainData.image,
        },
      ],
      link: [
        {
          hid: "icon",
          rel: "icon",
          type: "image/x-icon",
          href: mainData.favicon,
        }
      ]
    };

    return { headData, rulesData };
  },
  data() {
    return {
      openRule: -1,
      isLoading: false,
    };
  },
  head() {
    return this.headData;
  },
  methods: {
    openContent: function (index) {
      this.openRule = this.openRule === index ? -1 : index;
    },
  },
};
</script>

<style lang="scss" scoped>
.rulls {
  display: flex;
  justify-content: space-between;
  padding: 24px 32px;
  gap: 24px;
  background-color: #ececec;

  .middle-panel {
    background: #ffffff;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    padding: 24px 16px 16px;
    // min-width: 549px;
    // width: 40%;
    .heading {
      font-style: normal;
      font-weight: 700;
      font-size: 24px;
      line-height: 29px;
      /* identical to box height */

      color: #000000;
      margin-bottom: 32px;
    }
    .list {
      .notfound {
        font-weight: bold;
        text-align: center;
      }
      .item {
        border-radius: 8px;
        padding: 0px;
        position: relative;
        margin-bottom: 12px;
        &::before {
          content: " ";
          height: 100%;
          width: 4px;
          background: #000000;
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          border-radius: 2px;
        }
        .caption {
          background: #f5f5f5;
          border: 0.5px solid #e0e0e0;
          display: flex;
          align-items: center;
          color: #000000;
          cursor: pointer;
          user-select: none;
          padding: 20px 20px;
          svg {
            width: 20px;
            height: 20px;
            margin-right: 24px;
            transition: all 0.3s;
            &.opened {
              transform: rotate(45deg);
            }
          }
          h1 {
            font-style: normal;
            font-weight: 600;
            font-size: 21px;
            line-height: 25px;
          }
        }
        .faqarea {
          padding: 26px;
          &:not(.active) {
            display: none;
          }

          @media screen and (max-width: 767px) {
            padding: 15px;
            margin-top: 20px;
          }

          .listfaq {
            margin-bottom: 15px;

            &:last-child {
              margin-bottom: 0px;
            }
            .headfaq {
              font-size: 20px;
              font-weight: 500;
              display: flex;
              align-items: center;

              img {
                width: 20px;
                margin-right: 10px;
              }
            }
            .contentsfaq {
              padding: 22px;
              background: #f6f7ff;
              border: #e6e8f9 solid thin;
              font-size: 16px;
              line-height: 26px;
              margin-top: 15px;

              &::v-deep p {
                font-size: 16px !important;
                line-height: 26px !important;
              }
            }
          }
          ul {
            padding: 10px 20px;
            text-indent: 10px;
            @media screen and (max-width: 767px) {
              text-indent: 0px;
              padding: 10px 40px;
            }
            // &:not(.active) {
            //   display: none;
            // }
            li {
              font-style: normal;
              font-weight: 400;
              font-size: 16px;
              line-height: 19px;
              color: #000000;
              margin-bottom: 10px;
              list-style-position: inside;
              @media screen and (max-width: 767px) {
                list-style: number;
              }
            }
          }
        }
      }
    }
    @media screen and (max-width: 768px) {
      padding: 16px;
      .middle-panel {
        min-width: auto;
        width: 100%;
      }
    }
  }
}
</style>
