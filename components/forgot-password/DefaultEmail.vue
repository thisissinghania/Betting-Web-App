<template>
  <div class="email">
    <div class="card">
      <img src="../../assets/image/padlock.svg" alt="padlock" />
      <h1>Forget password?</h1>
      <p>
        Enter the email address associated with your account. We will send a
        link to reset your password.
      </p>
      <DefaultNotification v-if="error" :message="error" :msgClass="msgClass" />
      <v-text-field
        :value="email"
        label="Enter email address"
        filled
        class="custom-input"
        @keyup="changeEmail"
      ></v-text-field>
      <button
        :class="`submit-btn ${isValid ? '' : 'disabled'}`"
        @click="onBtnClick"
      >
        SEND LINK
      </button>
    </div>
    <div class="footer">
        <a href="/login">Back to Login</a>
    </div>
  </div>
</template>

<script>
import validator from "validator";
import DefaultNotification from '@/components/common/DefaultNotification.vue'

export default {
  name: "DefaultEmail",
  components: { DefaultNotification },
  props: {
    email:    String,
  },
  data() {
    return {
      isValid: false,
      error: null,
      msgClass: null,
    };
  },
  methods: {
    changeEmail: function (e) {
      const email = e.target.value;
      this.isValid = email !== "" && validator.isEmail(email);
      this.$emit("changeEmail", email);
    },
    onBtnClick: function () {
      if (!this.isValid) {
        return;
      }
      this.login();
    },
    async login() {
      try {
        this.isValid = false;
        await this.$axios
          .$post('/user/forgot-password', { "email": this.email  })
          .then((response) => {
            if (response.code === 200) {
              this.msgClass = 'is-green';
              this.error = response.message;
              setTimeout(function () {
                window.location.href = '/';
              } , 2000)
            } else {
              this.msgClass = 'is-danger';
              this.error = response.data.message
            }
            this.isValid = true;
          })
          .catch((exception) => {
            this.isValid = true;
            this.msgClass = 'is-danger';
            this.error = exception.response.data.message
          })
      } catch (e) {
        this.isValid = true;
        this.error = e.response.data.message
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.email {
  padding: 64px;
  @media all and (max-width: 767px) {
    padding: 20px;
  }
  .card {
    max-width: 577px;
    background: #ffffff;
    box-shadow: 1px 4px 34px rgb(46 48 92 / 20%);
    margin: 0 auto;
    padding: 30px;
    img {
      display: block;
      margin: 0 auto;
      margin-bottom: 16px;
    }
    h1 {
      text-align: center;
      font-style: normal;
      font-weight: 600;
      font-size: 24px;
      line-height: 25px;
      text-align: center;

      color: #2e305c;
      margin-bottom: 20px;
    }
    p {
      text-align: center;
      font-style: normal;
      font-weight: 400;
      font-size: 18px !important;
      line-height: 17px;
      /* or 142% */
      text-align: center;
      color: #000;
      margin-bottom: 30px;
    }
    button.submit-btn {
      background: #fa8c28;
      border-radius: 4px;
      font-style: normal;
      font-weight: 500;
      font-size: 16px;
      line-height: 19px;
      text-transform: uppercase;

      color: #ffffff;
      width: 100%;
      padding: 22.5px 0;
      margin-top: 10px;
      &:hover {
        opacity: 0.9;
      }
      &.disabled {
        background-color: #eeeeee;
        cursor: not-allowed;
        color: rgba(0, 0, 0, 0.3);
        pointer-events: none;
      }
    }
  }
  .footer {
      padding-top: 32px;
      padding-bottom: 22px;
      a {
        display: block;
        text-align: center;
        font-style: normal;
        font-weight: 600;
        font-size: 14px;
        line-height: 17px;
        /* identical to box height */

        text-decoration-line: underline;

        color: #2e305c;
      }
    }
}
</style>
