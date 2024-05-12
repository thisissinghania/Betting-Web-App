<template>
  <div class="password">
    <div class="card">
      <img src="../../assets/image/padlock-pwd.png" alt="padlock pwd" />
      <h1>Reset your password</h1>
      <p>Enter new password for your new account</p>
      <DefaultNotification :message="error" v-if="error" :msgClass="msgClass" />
      <v-form
        class="custom-form"
        v-model="valid"
        ref="form"
        lazy-validation
        @submit.prevent="formSubmit"
      >
        <v-container>
          <v-text-field
            v-model="form.password"
            :rules="passwordRules"
            label="Password"
            filled
            class="custom-input"
            :type="show_pwd ? 'text' : 'password'"
            :append-icon="show_pwd ? 'mdi-eye-off' : 'mdi-eye'"
            @click:append="show_pwd = !show_pwd"
          ></v-text-field>
          <v-text-field
            v-model="form.confirm_password"
            :rules="cnfpasswordRules"
            label="Re-type Password"
            filled
            class="custom-input"
            :type="show_pwd2 ? 'text' : 'password'"
            :append-icon="show_pwd2 ? 'mdi-eye-off' : 'mdi-eye'"
            @click:append="show_pwd2 = !show_pwd2"
          ></v-text-field>
          <button
            type="submit"
            :class="`submit-btn ${isValid ? '' : 'disabled'}`"
            @click="validate"
          >
            RESET PASSWORD
          </button>
        </v-container>
      </v-form>
    </div>
    <div class="footer">
        <a href="/login">Back to Login</a>
    </div>
  </div>
</template>

<script>
import DefaultNotification from '@/components/common/DefaultNotification.vue'

export default {
  name: 'DefaultPassword',
  components: { DefaultNotification },
  data() {
    return {
      show_pwd: false,
      show_pwd2: false,
      isValid: true,
      form: {
        password: '',
        confirm_password: '',
      },
      valid: true,
      error: null,
      msgClass: null,
      passwordRules: [],
      cnfpasswordRules: [],
    }
  },
  watch: {
    'form.password'(val) {
      this.passwordRules = []
    },
    'form.confirm_password'(val) {
      this.cnfpasswordRules = []
    },
  },
  methods: {
    formSubmit() {
      this.addValidation();
      const self = this;
      setTimeout(function () {
        if (self.$refs.form.validate()) {
          self.updatePassword()
        }
      });
    },
    async updatePassword() {
      try {
        if (this.$refs.form.validate()) {
          this.isValid = false;
          this.error = null;
          const data = {
            password: this.form.password,
            confirm_password: this.form.confirm_password,
            token: this.$route.params.token,
          }
          await this.$axios
            .$post('/user/update-password', data)
            .then((response) => {
              if (response.code === 200) {
                this.msgClass = 'is-green';
                this.$router.push({ path: '/change-password-thank-you' });
              } else {
                this.error = response.data.message;
                this.msgClass = 'is-danger';
              }
              this.isValid = true
            })
            .catch((exception) => {
              this.isValid = true;
              this.msgClass = 'is-danger';
              this.error = exception.response.data.message
            })
        }
      } catch (e) {
        this.isValid = true;
        this.msgClass = 'is-danger';
        this.error = e.response.data.message;
      }
    },
    validate() {
      this.$refs.form.validate()
    },
    addValidation() {
      this.passwordRules =  [(v) => !!v || 'Password is required'];
      this.cnfpasswordRules = [
        (v) => !!v || 'Confirm Password is required',
        (v) =>
          this.form.password === this.form.confirm_password ||
          'Password should match with confirm password',
      ];
    }
  },
}
</script>

<style lang="scss" scoped>
.password {
  padding: 80px 16px 131px;
  .card {
    max-width: 448px;
    background: #ffffff;
    box-shadow: 0px 2px 34px rgba(46, 48, 92, 0.11);
    margin: 0 auto;
    padding: 40px 56px;
    img {
      display: block;
      margin: 0 auto;
      margin-bottom: 16px;
    }
    h1 {
      text-align: center;
      font-style: normal;
      font-weight: 400;
      font-size: 21px;
      line-height: 25px;
      text-align: center;

      color: #2e305c;
      margin-bottom: 10px;
    }
    p {
      text-align: center;
      font-style: normal;
      font-weight: 400;
      font-size: 12px;
      line-height: 17px;
      /* or 142% */

      text-align: center;

      color: #000;
      margin-bottom: 40px;
    }
    .password-input {
      margin-bottom: 16px;
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
      margin-top: 32px;
      &:hover {
        opacity: 0.9;
      }
      &.disabled {
        background-color: #eeeeee;
        cursor: not-allowed;
        pointer-events: none;
      }
    }
  }
  .msg {
    margin-bottom: 5px;
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
  @media screen and (max-width: 768px) {
    .card {
      padding: 40px 16px;
    }
  }
}
</style>
