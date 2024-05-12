<template>
  <div class="redeem">
    <left-panel-vue />
    <div class="middle-panel">
      <div class="msg-box" v-if="!isLoading && is7d === '7d'">
        <img src="@/assets/image/payment-success.svg" alt="payment success" />
        <h1 class="heading">Redemption Successful!</h1>
        <p class="info">
          Your cashout will be paid out in the next 48-72 hours.
        </p>
        <a href="/" class="btn btn-back">Go To Home Page</a>
      </div>
      <div class="content-else" v-if="!isLoading && is7d === 'pp'">
        <img src="@/assets/icon/bet-tick.svg" alt="bet tick" />
        <p class="thank-you">
          Redemption Successful!
        </p>
        <p class="info">
          Your withdrawal will be credited to your PayPal account within 48-72 hours.
        </p>
        <span
          ><a href="/" class="confirm-my-picks">Go To Home Page</a></span
        >
      </div>
      <div v-if="isLoading" class="notfound">
        <v-progress-circular
          color="primary"
          indeterminate
          :size="55"
          :width="8"
        ></v-progress-circular>
      </div>
      <!-- <img src="@/assets/image/image 5.png" alt="image 5" class="bottom-img" /> -->
    </div>
    <right-panel-vue />
  </div>
</template>

<script>
import LeftPanelVue from '@/components/common/LeftPanel.vue'
import RightPanelVue from '@/components/common/RightPanel.vue'

export default {
  name: 'Redeem',
  components: { LeftPanelVue, RightPanelVue },
  data() {
    return {
      isLoading: true,
      is7d: 'pp',
      meta: {
        metaTitle: '',
        metaDescription: '',
      },
    }
  },
  head() {
    return {
      title: this.meta.metaTitle,
      meta: [
        {
          name: 'description',
          content: this.meta.metaDescription,
        },
      ],
    }
  },
  async beforeMount() {
    this.isLoading = true

    const response = await this.$store.dispatch(
      'cashout/getCashoutDetail',
      this.$route.params.id
    )

    if (response.code === 400) {
      alert(response.message)
      window.location.href = '/'
    } else if (response.code === 401) {
      window.location.href = '/login';
    } else {
      this.isLoading = false
      this.is7d = response.data.cashOutType;
      this.meta.metaTitle       = response.meta.title;
      this.meta.metaDescription = response.meta.description;
    }
  },
}
</script>

<style lang="scss" scoped>
.redeem {
  display: flex;
  justify-content: space-between;
  padding: 24px 32px;
  gap: 24px;
  background-color: #ececec;

  .notfound {
    font-weight: bold;
    text-align: center;
    margin-top: 10%;
    margin-bottom: 10%;
  }
  .middle-panel {
    .btn {
      background: #fa8c28;
      border-radius: 4px;
      display: block;
      text-align: center;
      padding: 23px 0;
      font-style: normal;
      font-weight: 500;
      font-size: 16px;
      line-height: 0px !important;
      text-transform: uppercase;
      cursor: pointer;
      color: #ffffff;
      width: 100%;
      &:not(.disabled):hover {
        opacity: 0.8;
      }
    }

    .msg-box {
      background: #ffffff;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      padding: 64px 106px;
      text-align: center;
      .heading {
        margin: 24px 0 8px;
        font-style: normal;
        font-weight: 600;
        font-size: 21px;
        line-height: 24px;
        color: #2e305c;
      }
      .info {
        margin: 24px 8px 36px;
        font-style: normal;
        font-weight: 400;
        font-size: 18px;
        line-height: 22px;
        color: #000000;
        @media screen and (max-width: 959px) {
          font-size: 16px !important;
        }
      }
      .btn-back {
        text-decoration: none;
      }
    }
    img.bottom-img {
      width: 100%;
      margin-top: 34px;
    }

    .content-else {
      background: #ffffff;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      text-align: center;
      img {
        margin: 56px auto 32px;
      }
      .thank-you {
        font-style: normal;
        font-weight: 500;
        font-size: 26px;
        line-height: 31px;
        color: #000000;
        margin-bottom: 8px;
        span {
          font-weight: 700;
        }
        @media screen and (max-width: 767px) {
          font-size: 22px !important;
        }
      }
      .info {
        margin-bottom: 24px;
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 19px;

        color: #000000;

        @media screen and (max-width: 767px) {
          font-size: 14px !important;
        }
      }
      .text {
        margin-bottom: 24px;
        font-style: normal;
        font-weight: 600;
        font-size: 20px !important;
        line-height: 22px;
        /* identical to box height */

        text-transform: uppercase;

        color: #000000;
        @media screen and (max-width: 767px) {
          font-size: 14px !important;
        }
      }
      .risk,
      .back {
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 19px;

        color: #000000;
        @media screen and (max-width: 767px) {
          font-size: 14px !important;
        }
      }
      .risk {
        margin-bottom: 8px;
      }
      .back {
        margin-bottom: 44px;
      }
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
        &:hover {
          opacity: 0.8;
        }
      }
    }
  }
  @media screen and (max-width: 767px) {
    padding: 16px;
    background-color: #ffffff;
    .middle-panel {
      min-width: 100%;

      .msg-box {
        padding: 12px;
        .info {
          margin: 8px 8px 32px;
        }
      }
    }
    .content-else {
      img {
        margin: 16px auto 24px;
      }
      .back {
        margin-bottom: 24px;
      }
      .confirm-my-picks {
        margin: 0 48px 16px;
      }
    }
  }
}
</style>
