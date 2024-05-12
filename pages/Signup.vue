<template>
  <div class="signup">
    <client-only>
      <div class="header">
        <h1><a href="/" class="logoClass" v-html="logoImage"></a></h1>
      </div>
    </client-only>
    <div class="body">
      <div class="form-card" v-if="!signupDisable">
        <p>
          Already have an account?
          <a href="/login">Sign In</a>
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
          <v-container>
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="form.email"
                  label="Email"
                  :rules="emailRules"
                  filled
                  class="custom-input"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="form.username"
                  label="Username"
                  :rules="nameRules"
                  :counter="12"
                  filled
                  class="custom-input"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="6">
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
              </v-col>
              <v-col cols="12" sm="6">
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
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" class="pb-0">
                <v-checkbox
                  v-model="form.overAge"
                  :rules="overAgeRules"
                  class="custom-input"
                  label="Are you older than 18 years old?"
                  color="red"
                ></v-checkbox>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" class="pb-0">
                <v-checkbox
                  v-model="form.agreeTerms"
                  :rules="agreeTermsRules"
                  class="custom-input"
                  label="Do you agree with terms and conditions?"
                  color="red"
                ></v-checkbox>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" class="text-center">
                <button
                  type="submit"
                  :class="`submit-btn ${isValid ? '' : 'disabled'}`"
                  @click="validate"
                >
                  SIGN UP
                </button>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </div>
      <div class="footer" v-if="!signupDisable">
        <a href="/">Back to home page</a>
      </div>
      <h1 style="text-align:center" v-if="signupDisable">Coming Soon!</h1>
    </div>
  </div>
</template>

<script>
import DefaultNotification from '@/components/common/DefaultNotification.vue'

export default {
  name: 'Signup',
  layout: 'empty',
  components: { DefaultNotification },

  asyncData({ store }) {
    const metaData = store.getters["default/getMeta"]?.signup || {};;
    const client = store.getters["default/getClient"];

    let faviconVal = ''; 
    for (const ky in store.getters["default/getTypeConfigs"]) {
      if (store.getters["default/getTypeConfigs"][ky].field_name === 'homepage_favicon_image') {
        faviconVal = store.getters["default/getTypeConfigs"][ky].field_value;
      }
    }

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
    return { headData, client };
  },

  data() {
    return {
      signupDisable: true,
      show_pwd: false,
      show_pwd2: false,
      form: {
        overAge: 0,
        agreeTerms: 0,
        username: '',
        email: '',
        password: '',
        confirm_password: '',
      },
      isValid: true,
      error: null,
      msgClass: null,
      valid: true,
      nameRules: [],
      emailRules: [],
      passwordRules: [],
      cnfpasswordRules: [],
      overAgeRules: [],
      agreeTermsRules: [],
      favicon: '',
      logoImage: ''
    }
  },
  head() {
    return this.headData;
  },
  watch: {
    'form.overAge'(val) {
      this.overAgeRules = []
    },
    'form.agreeTerms'(val) {
      this.agreeTermsRules = []
    },
    'form.username'(val) {
      this.nameRules = []
    },
    'form.email'(val) {
      this.emailRules = []
    },
    'form.password'(val) {
      this.passwordRules = []
    },
    'form.confirm_password'(val) {
      this.cnfpasswordRules = []
    },
  },
  mounted() {
    this.favicon = this.getTypeConfig(
      this.$store.getters['default/getTypeConfigs'],
      'homepage_favicon_image'
    );
    this.logoImage = this.getTypeConfig(
      this.$store.getters['default/getTypeConfigs'],
      'homepage_header_text_desktop'
    );
  },
  
  methods: {
    getTypeConfig(typeConfigs, name) {
      for (const typeConfig in typeConfigs) {
        if (typeConfigs[typeConfig].field_name === name) {
          return typeConfigs[typeConfig].field_value
        }
      }

      return ''
    },
    formSubmit() {
      this.addValidation()
      const self = this
      setTimeout(function () {
        if (self.$refs.form.validate()) {
          self.register()
        }
      })
    },
    async register() {
      try {
        if (this.$refs.form.validate()) {
          this.isValid = false
          this.error = null
          const formData = { ...this.form };
          if (this.$route.query.refId) formData.refId = this.$route.query.refId;
          await this.$axios
            .$post("/user/register", formData)
            .then((response) => {
              if (response.code === 200) {
                this.isValid = true
                this.msgClass = 'is-green'
                this.error = response.message
                const self = this
                setTimeout(function () {
                  self.$router.push({ path: '/login' })
                }, 3000)
              } else {
                this.isValid = true
                this.error = response.data.message
                this.msgClass = 'is-danger'
              }
            })
            .catch((exception) => {
              this.isValid = true
              this.msgClass = 'is-danger'
              this.error = exception.response.data.message
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
      this.nameRules = [
        (v) => !!v || 'Username is required',
        (v) => v.length <= 12 || 'Name must be less than 12 characters',
        (v) => v.length >= 5 || 'Name must be greater than 5 characters',
      ]
      this.emailRules = [
        (v) => !!v || 'E-mail is required',
        (v) => /.+@.+/.test(v) || 'E-mail must be valid',
      ]
      this.passwordRules = [(v) => !!v || 'Password is required']
      this.cnfpasswordRules = [
        (v) => !!v || 'Confirm Password is required',
        (v) =>
          this.form.password === this.form.confirm_password ||
          'Password should match with confirm password',
      ]
      this.overAgeRules = [
        (v) => !!v || 'You must agree age terms to continue!',
      ]
      this.agreeTermsRules = [(v) => !!v || 'You must agree terms to continue!']
    },
  },
}
</script>

<style lang="scss" scoped>
.signup {
  .logoClass {
    text-decoration: none;
    color: white;
  }

  .is-danger {
    margin-bottom: 0 !important;
    margin-top: 10px;
  }
  .is-green {
    margin-bottom: 0 !important;
    margin-top: 10px;
  }
  .header {
    background: #2e305c;
    h1 {
      font-style: normal;
      font-weight: 400;
      font-size: 24px;
      line-height: 29px;
      /* identical to box height */
      padding: 22px 0;
      text-align: center;
      color: #ffffff;
      span {
        color: #fa8c28;
        font-weight: 800;
      }
    }
  }
  .body {
    background: #ffffff;
    padding: 64px;
    @media screen and (max-width: 768px) {
      padding: 20px;
    }
    .form-card {
      max-width: 824px;
      margin: 0 auto;
      background: #ffffff;
      box-shadow: 1px 4px 34px rgb(46 48 92 / 20%);
      padding: 30px;
      h1 {
        padding-top: 48px;
        padding-bottom: 16px;
        font-style: normal;
        font-weight: 400;
        font-size: 21px;
        line-height: 25px;
        text-align: center;
        color: #2e305c;
      }
      p {
        text-align: center;
        font-style: normal;
        font-weight: 300;
        font-size: 14px !important;
        line-height: 17px;
        /* identical to box height */

        color: #000000;
        a {
          color: #fa8c28;
          font-weight: 600;
        }
      }
      .custom-form {
        padding: 18px 0px;
        .container {
          padding: 0px;
          @media screen and (max-width: 768px) {
            padding: 0;
          }
          .row {
            .custom-input {
              margin: 0px;
            }
          }
          .submit-btn {
            margin-top: 20px;
            background: #fa8c28;
            border-radius: 4px;
            padding: 23px 24px;
            width: 100%;
            height: 64px;

            font-style: normal;
            font-weight: 500;
            font-size: 16px;
            line-height: 19px;
            text-transform: uppercase;

            color: #ffffff;
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
      }
    }
    .footer {
      text-align: center;
      padding-top: 22px;
      padding-bottom: 45px;
      a {
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
}
</style>
