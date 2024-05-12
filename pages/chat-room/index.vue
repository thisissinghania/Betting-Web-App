<template>
  <div class="chatroom">
    <left-panel />
    <div class="middle-panel">
      <div class="rules">
        <div class="button" @click="ruleClick()">
          <button>Rules</button>
        </div>
        <div v-if="ruleStatus" class="rules_data">
          <div class="title">
            <h3>Rules</h3>
            <div class="close" @click="ruleClick()">
              <span>&times;</span>
            </div>
          </div>
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
                There will be NO rambling on or repeating the same thing over
                and over.
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
    <right-panel />
  </div>
</template>

<script>
import LeftPanel from "@/components/common/LeftPanel.vue";
import RightPanel from "@/components/common/RightPanel.vue";
export default {
  name: "CR",
  components: {
    LeftPanel,
    RightPanel,
  },
  middleware: "auth",
  asyncData({ store }) {
    const clientData = store.getters["default/getClient"];

    let faviconVal = ''; 
    for (const ky in store.getters["default/getTypeConfigs"]) {
      if (store.getters["default/getTypeConfigs"][ky].field_name === 'homepage_favicon_image') {
        faviconVal = store.getters["default/getTypeConfigs"][ky].field_value;
      }
    }

    const mainData = {
      title: `Chat | ${clientData?.siteName}`,
      description:
        "Have daily conversations with fellow members and discuss sports! Discover who makes the most accurate predictions.",
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
    return { headData };
  },
  data() {
    return {
      ruleStatus: false,
    };
  },
  computed: {
    chatLink() {
      return this.$store.getters["default/getChatLink"] || false;
    }
  },
  head() {
    return this.headData;
  },
  methods: {
    ruleClick() {
      this.ruleStatus = !this.ruleStatus;
    },
  },
};
</script>

<style lang="scss" scoped>
.chatroom {
  display: flex;
  justify-content: space-between;
  padding: 24px 32px;
  gap: 24px;
  background-color: #ececec;

  .middle-panel {
    padding: 15px;
    background: #ffffff;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    height: fit-content;
    position: relative;
    .rules {
      margin-bottom: 20px;
      display: flex;
      justify-content: flex-end;
      display: -webkit-flex;
      -webkit-justify-content: flex-end;
      .button {
        background: #666dff;
        color: #fff;
        font-weight: 500;
        padding: 7px 20px;
        border-radius: 5px;
        outline: none;
        border: none;
        box-shadow: none;
        display: block;
        width: 77px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 15px;
        cursor: pointer;
        button {
          outline: none;
          box-shadow: none;
        }
      }
    }
    .rules_data {
      position: absolute;
      bottom: 0;
      left: 0;
      top: 0;
      right: 0;
      background: #ffffff;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      overflow: hidden;
      .title {
        display: flex;
        display: -webkit-flex;
        justify-content: space-between;
        -webkit-justify-content: space-between;
        align-items: center;
        -webkit-align-items: center;
        background: #2e305c;
        padding: 10px 10px 10px 15px;
        height: 45px;
        h3 {
          color: #fff;
          font-size: 16px;
        }
        .close {
          width: 25px;
          text-align: center;
          span {
            color: #fff;
            font-size: 30px;
            font-weight: 400;
            cursor: pointer;
            width: 15px;
          }
        }
      }
      .rules-content {
        height: 450px;
        overflow-y: auto;
        padding: 20px;
        p {
          margin-bottom: 15px;
          line-height: 20px;
          font-size: 15px !important;
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
            font-size: 15px !important;
          }
          &.rules-break {
            margin-bottom: 0px;
            li {
              background: #ffe5e5;
              color: #d73737;
              border-left: 1px solid #d73737;
              font-size: 15px !important;
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
  @media screen and (max-width: 768px) {
    padding: 16px;
    .middle-panel {
      min-width: 100%;
      width: 100%;
    }
  }
}
</style>
