<template>
  <div class="Refer-friends">
    <left-panel />
    <div class="middle-panel custom-container">
      <div class="content">
        <div class="thanks">
          <div class="image">
            <img src="@/assets/image/signboard.png" alt="signboard" />
          </div>
          <h2>Thank YOU for helping us GROW!</h2>
          <p>
            We have sent an email to your friend inviting them to our website!
          </p>
          <p>
            We want to extend a big thank you for referring your friends to our
            free sports betting website! Your support in spreading the word
            about our platform means a great deal to us. We're passionate about
            sports, and our growing community.
          </p>
          <p>
            Your referrals are a crucial part of our growth, and they allow us
            to offer even more exciting features and opportunities to our sports
            betting community. With your help, we can continue to provide the
            best possible service and resources to our members.
          </p>
          <p>
            We appreciate your trust and loyalty, and we'll keep working hard to
            earn it. Thank you for being part of our sports betting community,
            and we look forward to sharing many more victories together!
          </p><br/>
          <span ><a href="/" class="confirm-my-picks">Go To Home Page</a></span>
        </div>
      </div>
    </div>
    <right-panel />
  </div>
</template>

<script>
import RightPanel from "@/components/common/RightPanel.vue";
import LeftPanel from "@/components/common/LeftPanel.vue";

export default {
  name: "ReferFriend",
  components: { RightPanel, LeftPanel },
  async asyncData({ $axios, req, store }) {
    if (req?.headers?.host) {
      $axios.onRequest((config) => {
        config.headers.Origin = req.headers.host;
      });
    }
    const headDataMain = await $axios.$get("/getclient");
    console.log(headDataMain);

    let faviconVal = ''; 
    for (const ky in store.getters["default/getTypeConfigs"]) {
      if (store.getters["default/getTypeConfigs"][ky].field_name === 'homepage_favicon_image') {
        faviconVal = store.getters["default/getTypeConfigs"][ky].field_value;
      }
    }

    const mainData = {
      title: `Refer-a-Friend | ${headDataMain.data?.client?.site_name}`,
      description:
        "Help the website become more active by referring your friends. Start referring today!",
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
    return { headData };
  },
  head() {
    return this.headData;
  },
};
</script>

<style lang="scss" scoped>
.Refer-friends {
  display: flex;
  justify-content: space-between;
  padding: 24px 32px;
  gap: 24px;
  background-color: #ececec;
  .middle-panel {
    width: 100%;

    .content {
      background: #ffffff;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      padding: 12px;
      margin-top: 0;
      .confirm-my-picks {
        display: block;
        margin: 0 156px 56px;
        background: #fa8c28;
        border-radius: 4px;
        padding: 12px 24px;
        font-style: normal;
        font-weight: 600;
        font-size: 16px;
        line-height: 19px;
        text-transform: uppercase;
        text-decoration: none;

        color: #ffffff;
        cursor: pointer;
        width: 250px;
        text-align: center;
        margin: 0 auto;
        &:hover {
          opacity: 0.8;
        }
      }
      .thanks {
        text-align: left;
        .image {
          margin: 20px 0;
          text-align: center;
          img {
            max-width: 100px;
          }
        }
        h2 {
          color: #000000;
          font-style: normal;
          font-weight: 700;
          margin-bottom: 15px;
          font-size: 24px;
          text-align: center;
        }
        p {
          margin-bottom: 10px;
          color: #000000;
          font-size: 15px !important;
          line-height: 26px !important;
        }
        .go-to-home {
          margin-top: 20px;
          margin-bottom: 20px;
          a {
            color: #fa8c28;
            text-decoration: none;
            font-size: 16px;
            text-transform: capitalize;
            font-weight: 400;
          }
        }
      }
    }
  }
  @media screen and (max-width: 768px) {
    padding: 16px;
    background-color: #ffffff;
    .middle-panel {
      min-width: 100%;
    }
  }
  .mb-0 {
    margin-bottom: 0px !important;
  }
}
</style>
