<template>
  <div class="redeempoints">
    <left-panel-vue />
    <div class="middle-panel">
      <div v-if="confirmDone" class="content">
        <div class="eachpoint" v-if="!isLoading">Each Point is worth ${{ howMuchEachPointWorth }} Real Cash!</div>
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
          v-if="!isLoading"
        >
          <div class="flexconts">
            <span>Display Name:</span>
            <span class="arrowups"> {{ $auth.user.username }} </span>
          </div>
          <div class="flexconts">
            <span>Total Points:</span>
            <span class="arrowups"> {{ totalPoints }}</span>
          </div>

          <div class="form">
            <img src="@/assets/icon/point.svg" class="marginbt30" alt="point" />
            <v-text-field
              v-model="amount"
              label="Enter points to redeem"
              filled
              type="number"
              :rules="amountRules"
              class="custom-input maxHeight32"
              @keyup="checkAmount"
            ></v-text-field>
          </div>

          <div class="flexconts">
            <span>Cash Value:</span>
            <span class="arrowups"> ${{ winAmount }}</span>
          </div>

          <div class="form">
            <img src="@/assets/icon/point.svg" class="marginbt30" alt="point" />
            <v-text-field
              v-model="email"
              label="Enter PayPal email address"
              :rules="emailRules"
              filled
              class="custom-input maxHeight32"
            ></v-text-field>
          </div>

          <div class="btns">
            <!-- <span class="btn btn-confirm" @click="confirmDone = true"
            >Redeem My Points Now</span
          > -->
            <button
              type="submit"
              :class="`btn btn-confirm ${isValid ? '' : 'disabled'}`"
              @click="validate"
            >
            Redeem My Points Now
            </button>
          </div>
        </v-form>

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
    <right-panel-vue />
  </div>
</template>

<script>
import LeftPanelVue from '@/components/common/LeftPanel.vue'
import RightPanelVue from '@/components/common/RightPanel.vue'
import DefaultNotification from '@/components/common/DefaultNotification.vue'

export default {
  name: 'RedeemPoint',
  components: { LeftPanelVue, RightPanelVue, DefaultNotification },
  layout: 'default',
  data() {
    return {
      amount: '',
      email: '',
      confirmDone: true,
      isValid: true,
      error: null,
      valid: true,
      isLoading: true,
      msgClass: null,
      emailRules: [],
      amountRules: [],
      winAmount: '0.00',
      totalPoints: 0,
      howMuchEachPointWorth: '0.00',
      meta: {
        metaTitle: '',
        metaDescription: '',
      },
    }
  },
  watch: {
    'email'(val) {
      this.emailRules = []
    },
    amount (value, oldValue) {
      this.amountRules = []
      if (!value.match(/^-?\d*\.?\d{0,2}$/)) {
        this.amount = oldValue;
      }
      if (value.includes('.') && value.split('.')[1].length > 2) {
          this.amount = oldValue;
      };
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
    this.isLoading = true;

    const query = {
      cashOutType: 'pp'
    };
    const response = await this.$store.dispatch("cashout/apiCall", query);

    if (response.code === 400) {
      alert(response.message);
      window.location.href = "/";
    } else if (response.code === 401) {
      window.location.href = "/login";
    } else {
      this.isLoading = false;
      this.totalPoints = response.data.point;
      this.howMuchEachPointWorth = response.data.howMuchEachPointWorth;
      this.meta.metaTitle       = response.meta.title;
      this.meta.metaDescription = response.meta.description;
    }
  },
  methods: {
    async checkAmount() {
      if (Number(this.amount)) {
        this.isClickedConfirmed = true;
        const response = await this.$store.dispatch("cashout/generateCashoutAmount", {
          point : this.amount
        });

        if (response.code === 200) {
          this.winAmount = parseFloat(response.data.amount).toFixed(2);
          this.isClickedConfirmed = false;
        } else if (response.code === 400) {
          alert(response.message);
          window.location.href = "/";
        } else if (response.code === 401) {
          alert(response.message);
          window.location.href = "/";
        } else {
          this.amount = "";
        }
      } else {
        this.winAmount = parseFloat(0.0).toFixed(2);
        
        return false;
      }
    },
    goSuccess() {
      this.isPaying = !this.isValid;
    },
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
              'cashOutType' : 'pp',
              'payPalEmail' : this.email,
              'point': this.amount,
              'amount': this.winAmount
             })
            .then((response) => {
               if (response.code === 200) {
                window.location.href = '/redeem-thank-you/' + response.data.id;
               } else {
                this.isValid = true
                this.error = response.data.message
                this.msgClass = 'is-danger';
              }
            })
            .catch((exception) => {
              this.isValid = true
              this.msgClass = 'is-danger'
              this.error = exception.response.data.message;
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

      this.amountRules = [
        (v) => !!v || 'Points is required',
      ]
    },
  },
}
</script>

<style lang="scss" scoped>
.redeempoints {
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
    .content {
      padding: 24px;
      background: #ffffff;
      border: 1px solid #e0e0e0;
      border-radius: 8px;

      .eachpoint {
        font-weight: 600;
        font-size: 18px;
        margin-bottom: 15px;
        color: #000000;
      }
      .flexconts {
        margin: 0 0 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: #f2f2f2;
        margin-bottom: 10px;
        padding: 15px;
        border-radius: 5px;

        @media screen and (max-width: 767px) {
          margin: 0 0 10px;
        }
        @media screen and (min-width: 960px) and (max-width: 1600px) {
          margin: 0 0 10px;
        }

        span {
          font-size: 16px;
          font-weight: 500;
        }

        .arrowups {
          display: flex;
          align-items: center;
          img {
            width: 18px;
          }
        }
      }

      .heading {
        margin-bottom: 48px;
        padding: 12px 16px;
        background: #ebecf6;
        border-radius: 8px;
        display: flex;
        align-items: center;
        p {
          width: 70%;
          font-style: normal;
          font-weight: 500;
          font-size: 16px;
          line-height: 19px;

          color: #2e305c;
        }
        .question-circle {
          margin: 0 auto 0 32px;
        }
      }
      .info {
        margin-bottom: 10px;
        display: flex;
        justify-content: space-between;
        font-style: normal;
        font-weight: 600;
        font-size: 18px;
        line-height: 22px;
        text-transform: uppercase;
        color: #2e305c;

        .title {
          font-size: 16px;
          font-weight: 500;
          color: #000000;
        }
        .value {
          font-size: 16px;
          font-weight: 500;
          color: #000000;
        }
      }
      .form {
        display: flex;
        input {
          padding: 0 16px;
          width: 100%;
          background: #ffffff;
          border: 1px solid #e0e0e0;
          border-left: none;
          border-top-right-radius: 3px;
          border-bottom-right-radius: 3px;
          font-size: 16px;

          &::placeholder {
            color: #000000;
          }
          &:focus {
            outline: none;
          }
          &::-webkit-outer-spin-button,
          &::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
          }
        }
        img.marginbt30 {
          margin-bottom: 30px;
          height:62px;
        }
      }
      .text {
        margin-bottom: 48px;
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 17px;
        color: #000000;
        text-align: center;
        span {
          font-weight: 700;
          color: #fa8c28;
        }
      }
      .bottom-text {
        font-style: normal;
        font-weight: 500;
        font-size: 16px;
        line-height: 19px;
        text-align: center;
        text-transform: uppercase;
        color: #000000;
        text-align: center;
        margin-bottom: 20px;
        span {
          color: #fa8c28;
        }
      }
      .is-danger {
        text-align: center;
      }
      .btns {
        margin: 0 132px 0;
        .btn {
          display: block;
          border-radius: 4px;
          text-transform: uppercase;
          color: white;
          font-style: normal;
          font-weight: 600;
          font-size: 16px;
          line-height: 19px;
          text-align: center;
          padding: 12px;
          height: auto;
          cursor: pointer;
          width: 100%;
          &:hover {
            opacity: 0.8;
          }
          &:not(:last-child) {
            margin-bottom: 16px;
          }
          &.btn-confirm {
            background: #2e305c;
            &.disabled {
              background: #f2f2f2;
              cursor: not-allowed;
              color: rgba(0, 0, 0, 0.2);
              pointer-events: none;
            }
          }
          &.btn-max {
            background: #53af33;
          }
          &.btn-min {
            background: #fcb720;
          }
          &.btn-cancel {
            background: #f20;
          }
        }
      }
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
        padding: 12px;

        .heading {
          margin-bottom: 24px;
        }
        .info {
          margin-bottom: 16px;
        }
        .form {
          margin: 0 0 8px;
        }
        .text {
          margin-bottom: 24px;
        }
        .btns {
          margin: 0 0;
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
}
</style>
