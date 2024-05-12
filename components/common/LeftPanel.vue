<template>
  <div class="left-panel">
    <div class="email-form">
      <form class="newbgform">
        <div class="form-group">
          <label for="">Let's Keep in touch!</label>
          <input
            type="email"
            placeholder="Enter email address"
            class="form-control"
          />
        </div>
        <div class="form-group-btn">
          <input type="button" value="Submit" class="form-btn" />
        </div>
      </form>
    </div>
    <!-- <a
      href="https://record.commissionkings.ag/_SIGWSo2S6vy8N_c2rHYweSyZw0gXuLb7/1952/"
      target="_new"
      ><img
        src="https://media.commissionkings.ag/uploads/BOL_MM_300x2501.gif"
        style="margin-bottom: 15px"
    /></a>
    <a
      href="https://record.revmasters.com/_wHnB38iyRu3n4-wPNHHv7bxnHhk3NdqV/1/"
      target="_new"
      ><img
        src="https://media.revmasters.com/uploads/300x250semi.gif"
        style="margin-bottom: 15px"
    /></a>
    <a
      href="https://record.revenuenetwork.com/_oo751aQu0JQyf7hRCT-At2Nd7ZgqdRLk/0/"
      target="_new"
      ><img
        src="https://media.revenuenetwork.com/GIF/Bovada/Sports/NBA/300x250.gif"
        style="margin-bottom: 15px"
    /></a> -->
    <div v-if="$auth.loggedIn" class="show_on_login">
      <div
        v-for="data in bannerSingleObj"
        :key="data.category"
        class="banner_parent"
      >
        <div v-for="item in data.list" :key="item?.id" class="banner_child">
          <div class="left_banner" v-html="item?.content"></div>
        </div>
      </div>

      <div
        v-for="data in bannerSingleObj2"
        :key="data.category"
        class="banner_parent"
      >
        <div v-for="item in data.list" :key="item?.id" class="banner_child">
          <div class="left_banner2" v-html="item?.content"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LeftBar",
  data() {
    return {
      groupByCategory: [],
      bannerSingleObj: [],
      bannerSingleObj2: [],
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

    // this.bannerSingleObj = this.getBannerObj("300x250");
    // this.bannerSingleObj2 = this.getBannerObj("300x600");
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
  .left_banner {
    width: 100%;
    max-height: 250px;
    overflow: hidden;
    margin-bottom: 24px;
  }
  .left_banner2 {
    width: 100%;
    max-height: 600px;
    overflow: hidden;
    margin-bottom: 24px;
  }
}
.left-panel {
  @media screen and (max-width: 768px) {
    display: none;
  }
  width: 300px;
  min-width: 300px;
  margin-right: 10px;
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

    @media screen and (min-width: "768px") and (max-width: "1366px") {
      width: 100%;
    }
  }

  .email-form {
    margin-bottom: 24px;
    .newbgform {
      background: #fff;
      border: #d7d7d7 solid thin;
      padding: 15px;

      .form-group {
        margin-bottom: 16px;
        label {
          font-size: 16px;
          color: #000000;
          margin-bottom: 10px;
          display: block;
        }
        .form-control {
          display: block;
          width: 100%;
          padding: 0.375rem 0.75rem;
          font-size: 1rem;
          line-height: 1.5;
          color: #495057;
          background-color: #fff;
          background-clip: padding-box;
          border: 1px solid #ced4da;
          border-radius: 0.25rem;
          height: 50px;
          outline: none;
        }
      }
      .form-group-btn {
        .form-btn {
          background: #fa8c28;
          padding: 12px 15px;
          font-size: 16px;
          color: #ffffff;
          font-weight: 500;
          border-radius: 5px;
          width: 100%;
        }
      }
    }
  }
}
</style>
