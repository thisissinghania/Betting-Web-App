<template>
  <div class="detail-picks">
    <left-panel-vue />
    <div class="middle-panel">
      <div class="content">
        <div class="title-and-sort">
          <h1 id="selectedVal">{{ myLeague.pickType }}</h1>
        </div>
        <div class="table-area">
          <detail-pick :my-league="myLeague" />
        </div>
      </div>
    </div>
    <right-panel-vue />
  </div>
</template>

<script>
import DetailPick from "@/components/detail-pick/details";
import LeftPanelVue from "@/components/common/LeftPanel.vue";
import RightPanelVue from "@/components/common/RightPanel.vue";

export default {
  name: "DetailPicks",
  components: { LeftPanelVue, RightPanelVue, DetailPick },
  middleware: "auth",
  async asyncData({ $axios, req, params, store }) {
    $axios.onRequest((config) => {
      config.headers.Origin = req.headers.host;
    });
    const headDataMain = await $axios.$get("/getclient");
    const myLeague = (await $axios.$get("/picks/summary/" + params.league))
      ?.data;

    let faviconVal = ''; 
    for (const ky in store.getters["default/getTypeConfigs"]) {
      if (store.getters["default/getTypeConfigs"][ky].field_name === 'homepage_favicon_image') {
        faviconVal = store.getters["default/getTypeConfigs"][ky].field_value;
      }
    }

    const mainData = {
      title: `${myLeague.pickDetails} | ${headDataMain.data?.client?.site_name}`,
      description: `${myLeague.pickDetails} Checking this pick detail.`,
      image: headDataMain.data?.client?.sharing_image,
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
    return { headData, myLeague };
  },
  head() {
    return this.headData;
  },
  methods: {
    changeTitle() {
      const selVal = document.getElementById("mySelect").value;
      document.getElementById("selectedVal").innerHTML = selVal;
    },
  },
};
</script>

<style lang="scss" scoped>
.detail-picks {
  display: flex;
  justify-content: space-between;
  padding: 24px 32px;
  gap: 24px;
  background-color: #ececec;
  @media all and (max-width: 959px) {
    padding: 10px;
  }
  .middle-panel {
    max-width: 1171px;
    margin: 0 auto;

    .content {
      background: #ffffff;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      padding: 12px;
      margin-top: 0px;
      .video-part {
        margin-bottom: 16px;
      }
      .title-and-sort {
        display: flex;
        display: -webkit-flex;
        align-items: center;
        -webkit-align-items: center;
        justify-content: space-between;
        -webkit-justify-content: space-between;
        margin-bottom: 16px;
        h1 {
          color: #000000;
          font-style: normal;
          font-weight: 700;
          font-size: 20px;
        }
        .select-options {
          border: 1px solid #ccc;
          border-radius: 3px;
          position: relative;

          select {
            padding: 9px 50px 9px 9px;
            outline: none;
            position: relative;
            z-index: 9;
          }
          &::after {
            content: "";
            position: absolute;
            border: 6px solid;
            border-color: #000 transparent transparent;
            right: 10px;
            top: 60%;
            transform: translateY(-50%);
            z-index: 1;
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
