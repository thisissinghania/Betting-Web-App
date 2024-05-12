<template>
  <div class="t-c">
    <left-panel />
    <client-only>
      <div class="middle-panel">
        <h1 class="heading">{{ getStatic.displayTitle }}</h1>
        <div v-html="getStatic.pageContent"></div>
      </div>
    </client-only>
    <right-panel />
  </div>
</template>

<script>
import LeftPanel from "@/components/common/LeftPanel.vue";
import RightPanel from "@/components/common/RightPanel.vue";

export default {
  name: "TC",
  components: {
    LeftPanel,
    RightPanel,
  },
  async fetch() {
    try {
      await this.$store.dispatch("default/fetchStatics", {
        page: this.$route.params.page,
      });
    } catch (e) {
      return this.$nuxt.error({ statusCode: 404, message: 'Page Not Found' });
    }
  },
  computed: {
    getStatic() {
      return this.$store.getters["default/getStatics"];
    },
  },
  head() {
    return {
      title: this.getStatic.pageTitle
        ? this.getStatic.pageTitle
        : "Pickatm.com",
      meta: [
        {
          name: "description",
          content: this.getStatic.metaDescription
            ? this.getStatic.metaDescription
            : "Pickatm.com",
        },
        {
          name: "keywords",
          content: this.getStatic.metaKeywords
            ? this.getStatic.metaKeywords
            : "Pickatm.com",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.t-c {
  display: flex;
  justify-content: space-between;
  padding: 24px 32px;
  gap: 24px;
  background-color: #ececec;

  .middle-panel {
    padding-left: 16px;
    padding-right: 16px;
    background: #ffffff;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    h1.heading {
      font-style: normal;
      font-weight: 700;
      font-size: 24px;
      line-height: 29px;
      /* identical to box height */

      color: #2e305c;
      margin: 24px 0;
    }
    &::v-deep h1 {
      font-style: normal;
      font-weight: 700;
      font-size: 16px;
      line-height: 19px;

      color: #2e305c;
      margin-bottom: 12px;
    }
    &::v-deep p {
      font-style: normal;
      font-weight: 400;
      font-size: 15px !important;
      line-height: 22px !important;

      color: #000;
      margin-bottom: 24px;
      span.link-here {
        text-decoration: underline;
        cursor: pointer;
        color: #2e305c;
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
