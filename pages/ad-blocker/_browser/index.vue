<template>
  <div class="ad-blocker">
    <left-panel-vue />
    <div class="middle-panel">
      <div class="content">
        <img
          class="browser-img"
          v-if="browserName === 'brave'"
          src="@/assets/image/browser/brave.png"
          alt="brave"
        />
        <img
          class="browser-img"
          v-else-if="browserName === 'duckduckgo'"
          src="@/assets/image/browser/duckduckgo.png"
          alt="duckduckgo"
        />
        <img
          class="browser-img"
          v-else
          src="@/assets/image/browser/opera.png"
          alt="opera"
        />
        <h1 class="heading">{{ browserName }} Browser is not supported!</h1>
        <p class="text">We support these browsers only</p>
        <div class="browsers">
          <img
            v-for="(img, index) in ['chrome', 'firefox', 'safari', 'ie']"
            :key="'browser-' + index"
            :src="require(`@/assets/image/browser/${img}.svg`)"
            :alt="img"
          />
        </div>
      </div>
      <img src="@/assets/image/image 5.png" alt="image 5" class="bottom-img" />
    </div>
    <right-panel-vue />
  </div>
</template>

<script>
import LeftPanelVue from "@/components/common/LeftPanel.vue";
import RightPanelVue from "@/components/common/RightPanel.vue";
export default {
  name: "AdBlocker",
  components: {
    LeftPanelVue,
    RightPanelVue,
  },
  computed: {
    browserName() {
      return this.$route.params.browser;
    },
  },
};
</script>

<style lang="scss" scoped>
.ad-blocker {
  display: flex;
  justify-content: space-between;
  padding: 24px 32px;
  gap: 24px;
  background-color: #ececec;
  .middle-panel {
    min-width: 549px;
    width: 40%;
    text-align: center;
    .content {
      background: #ffffff;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      .browser-img {
        margin: 40px auto 16px;
      }
      .heading {
        font-style: normal;
        font-weight: 600;
        font-size: 24px;
        line-height: 32px;
        color: #2e305c;
        margin-bottom: 40px;
      }
      .text {
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 19px;
        color: #000;
        margin-bottom: 24px;
      }
      .browsers {
        margin: 0 80px 40px;
        display: flex;
        justify-content: space-between;
        img {
          padding: 20px;
          border: 1px solid #e0e0e0;
          border-radius: 4px;
        }
      }
    }
    img.bottom-img {
      width: 100%;
      margin-top: 34px;
    }
  }
  @media screen and (max-width: 768px) {
    padding: 16px;
    background-color: #ffffff;
    .middle-panel {
      min-width: 100%;
      .content {
        .browsers {
          flex-wrap: wrap;
        }
      }
    }
  }
}
</style>
