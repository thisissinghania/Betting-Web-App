<template>
  <div class="faq">
    <left-panel />
    <div class="middle-panel">
      <h1 class="heading">
        <span> how does {{ client?.siteName }} work? </span>
      </h1>

      <div class="iframe-wrapper">
        <iframe
          width="100%"
          :src="videoDetails?.url"
          :title="videoDetails?.title"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
      </div>
      <div class="description" v-html="videoDetails?.description"></div>
    </div>
    <right-panel />
  </div>
</template>
<script>
import LeftPanel from "@/components/common/LeftPanel.vue";
import RightPanel from "@/components/common/RightPanel.vue";

export default {
  name: "HowDoesThisWork",
  components: {
    LeftPanel,
    RightPanel,
  },
  async asyncData({ $axios, req, store }) {
    $axios.onRequest((config) => {
      config.headers.Origin = req
        ? req.headers.host
        : window.location.host.split(":")[0];
    });

    await store.dispatch("how-this-work/fetchVideo");

    const videoDetails = store.getters["how-this-work/getVideo"];

    let faviconVal = ''; 
    for (const ky in store.getters["default/getTypeConfigs"]) {
      if (store.getters["default/getTypeConfigs"][ky].field_name === 'homepage_favicon_image') {
        faviconVal = store.getters["default/getTypeConfigs"][ky].field_value;
      }
    }

    const metaData = store.getters["how-this-work/getMeta"];
    const client = store.getters["default/getClient"];
    const mainData = {
      title: metaData?.title,
      description: metaData?.description,
      image: client?.sharingImage,
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
    return { headData, videoDetails, client };
  },

  head() {
    return this.headData;
  },
};
</script>

<style lang="scss" scoped>
.faq {
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
    height: 100%;
    @media screen and (min-device-width: 912px) and (max-device-width: 1368px) and (orientation: portrait) {
      height: calc(100vh - 541.17px);
      overflow: hidden;
      overflow-y: scroll;
    }
    .heading {
      font-style: normal;
      font-weight: 700;
      font-size: 24px;
      line-height: 29px;
      text-transform: uppercase;
      /* identical to box height */

      color: #000000;
      margin-bottom: 32px;
    }
    .iframe-wrapper {
      position: relative;
      width: 100%;
      padding-bottom: 56.25%;
      margin-bottom: 32px;
      iframe {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
    }

    .description {
      padding-top: 10px;
      padding-bottom: 10px;
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
