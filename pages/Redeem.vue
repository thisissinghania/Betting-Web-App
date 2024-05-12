<template>
  <div class="redeem">
    <left-panel-vue />
    <div class="middle-panel">
      <div class="form" v-if="!isLoading">
        <div class="heading">Add Payment Details</div>
        <div class="paypal">
          <img class="paypal-img" src="@/assets/icon/paypal.png" alt="paypal" />
          <p class="text">PayPal</p>
          <!-- <img
            class="radio-img"
            src="@/assets/icon/radio-btn.png"
            alt="radio btn"
          /> -->
        </div>
        <!-- <p class="info">
          We are only using Paypal to send your payment as for now! We will
          introduce in ways of getting paid in future.
        </p> -->
        <p class="text">
          Please enter your PayPal email address to receive your payment.
        </p>
        <DefaultNotification
          :message="error"
          v-if="error"
          :msgClass="msgClass"
        />
        <v-form
          @submit.prevent="formSubmit"
          class="custom-form"
          v-model="valid"
          ref="form"
          lazy-validation
        >
          <div class="input-area">
            <v-text-field
              v-model="email"
              label="PayPal email address"
              :rules="emailRules"
              filled
              class="custom-input"
            ></v-text-field>
            <button
              type="submit"
              :class="`btn btn-confirm ${isValid ? '' : 'disabled'}`"
              @click="validate"
            >
            confirm payment
            </button>
          </div>
      </v-form>  
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
import LeftPanelVue from "@/components/common/LeftPanel.vue";
import RightPanelVue from "@/components/common/RightPanel.vue";
import DefaultNotification from '@/components/common/DefaultNotification.vue'

export default {
  name: "Redeem",
  components: { LeftPanelVue, RightPanelVue, DefaultNotification },
  data() {
    return {
      email: "",
      isValid: true,
      isLoading: true,
      error: null,
      emailRules: [],
      msgClass: null,
      valid: true,
      meta: {
        metaTitle: '',
        metaDescription: '',
      },
    };
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
  watch: {
    'email'(val) {
      this.emailRules = []
    },
  },
  async beforeMount() {
    this.isLoading = true;

    const query = {
      cashOutType: '7d'
    };
    const response = await this.$store.dispatch("cashout/apiCall", query);

    if (response.code === 400) {
      alert(response.message);
      window.location.href = "/";
    } else if (response.code === 401) {
      window.location.href = "/login";
    } else {
      this.isLoading = false;
      this.meta.metaTitle       = response.meta.title;
      this.meta.metaDescription = response.meta.description;
    }
  },
  methods: {
    formSubmit() {
      this.addValidation()
      const self = this
      setTimeout(function () {
        if (self.$refs.form.validate()) {
          self.proceedCashout()
        }
      })
    },
    async proceedCashout() {
      try {
        if (this.$refs.form.validate()) {
          this.isValid = false
          this.error = null
          await this.$axios
            .$post('/cash-out', { 
              'cashOutType' : '7d',
              'payPalEmail' : this.email
             })
            .then((response) => {
               if (response.code === 200) {
                window.location.href = '/redeem-thank-you/' + response.data.id;
               } else {
                this.isValid = true
                this.error = response.data.message
                this.msgClass = 'is-danger';
                window.location.href = '/';
              }
            })
            .catch((exception) => {
              this.isValid = true
              this.msgClass = 'is-danger'
              this.error = exception.response.data.message;
              window.location.href = '/';
            })
        }
      } catch (e) {
        this.isValid = true
        this.msgClass = 'is-danger'
        this.error = e.response.data.message
      }
    },
    validate() {
      this.$refs.form.validate()
    },
    addValidation() {
      this.emailRules = [
        (v) => !!v || 'PayPal E-mail is required',
        (v) => /.+@.+/.test(v) || 'PayPal E-mail must be valid',
      ]
    },
  },
};
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
    .is-danger {
      text-align: center;
    }
    .form {
      background: #ffffff;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      padding: 24px;
      .heading {
        font-style: normal;
        font-weight: 600;
        font-size: 18px;
        line-height: 24px;
        color: #2e305c;
        margin-bottom: 16px;
      }
      .paypal {
        margin-bottom: 16px;
        display: flex;
        align-items: center;
        padding: 12px 16px;
        border: 1px solid #e0e0e0;
        border-radius: 4px;
        .text {
          font-style: normal;
          font-weight: 400;
          font-size: 16px;
          line-height: 24px;
          color: #2e305c;
          margin: 0 auto 0 12px;
        }
      }
      .info {
        color: #000000;
        font-style: normal;
        font-weight: 400;
        font-size: 12px;
        line-height: 15px;
        text-align: center;
        margin-bottom: 24px;
        padding: 0 16px;
      }
      .text {
        font-style: normal;
        font-weight: 600;
        font-size: 15px !important;
        line-height: 17px;
        text-align: center;
        color: #000000;
        margin-bottom: 30px;
        margin-top: 30px;
      }
      .input-area {
        max-width: 500px;
        width: 100%;
        margin: auto;
        .custom-input {
          margin: 0px 0px;
        }
        .btn-confirm {
          margin: 0px;
          &.disabled {
            background: #f2f2f2;
            cursor: not-allowed;
            color: rgba(0, 0, 0, 0.2);
            pointer-events: none;
          }
        }
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
  }
  @media screen and (max-width: 767px) {
    padding: 16px;
    background-color: #ffffff;
    .middle-panel {
      min-width: 100%;
      .form {
        padding: 12px;
        .heading {
          text-align: center;
        }
        .text {
          margin-bottom: 24px;
        }
        .input-area {
          max-width: 100%;
          width: 100%;
          margin: auto;
          .custom-input {
            margin: 0;
          }
          .btn-confirm {
            margin: 0;
          }
        }
      }
      .msg-box {
        padding: 12px;
        .info {
          margin: 8px 8px 32px;
        }
      }
    }
  }
}
</style>
