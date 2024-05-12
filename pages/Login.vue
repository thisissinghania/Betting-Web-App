<template>
  <div class="login">
    <client-only>
      <div class="header">
        <h1><a href="/" class="logoClass" v-html="logoImage"></a></h1>
      </div>
      <div class="body">
        <div class="form-card">
          <!-- <img
          class="img-avatar"
          src="../assets/image/avatar.png"
          alt="default avatar"
        /> -->
          <img v-if="loginIcon != ''" class="img-logo" :src="loginIcon" height="72px" width="72px" />
          <h1>Sign in to your account</h1>
          <DefaultNotification
            v-if="error"
            :message="error"
            :msg-class="msgClass"
          />
          <v-form
            ref="form"
            v-model="valid"
            class="custom-form"
            lazy-validation
            @submit.prevent="formSubmit"
          >
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="form.username"
                    label="Email or Username"
                    filled
                    class="custom-input"
                    :rules="usernameRules"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="form.password"
                    label="Password"
                    filled
                    class="custom-input"
                    :rules="passwordRules"
                    :type="show_pwd ? 'text' : 'password'"
                    :append-icon="show_pwd ? 'mdi-eye-off' : 'mdi-eye'"
                    @click:append="show_pwd = !show_pwd"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row class="add-on">
                <v-col cols="6">
                  <v-checkbox
                    class="custom-input"
                    label="Remember me"
                    color="red"
                  ></v-checkbox>
                </v-col>
                <v-col cols="6">
                  <p class="forget-pwd">
                    <router-link to="/forgot-password">
                      Forget password?
                    </router-link>
                  </p>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <button
                    :class="`submit-btn ${isValid ? '' : 'disabled'}`"
                    @click="validate"
                  >
                    SIGN IN
                  </button>
                </v-col>
              </v-row>
              <v-row class="bottom">
                <v-col cols="12">
                  <p>
                    Don't have an account?
                    <a href="/signup">Sign Up</a>
                  </p>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </div>
        <div class="footer">
          <a href="/">Back to home page</a>
        </div>
      </div>
    </client-only>
  </div>
</template>

<script>
import DefaultNotification from '@/components/common/DefaultNotification.vue'

export default {
  name: 'Login',
  components: { DefaultNotification },
  layout: 'empty',

  asyncData({ store }) {
    const metaData = store.getters["default/getMeta"]?.login || {};;
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
      isValid: true,
      show_pwd: false,
      form: {
        username: '',
        password: '',
      },
      error: null,
      msgClass: null,
      valid: true,
      usernameRules: [],
      passwordRules: [],
      favicon: '',
      loginIcon: '',
      logoImage: ''
    }
  },
  head() {
    return this.headData;
  },
  watch: {
    'form.username'(val) {
      this.usernameRules = []
    },
    'form.password'(val) {
      this.passwordRules = []
    },
  },
  mounted() {
    this.favicon = this.getTypeConfig(
      this.$store.getters['default/getTypeConfigs'],
      'homepage_favicon_image'
    );
    this.loginIcon = this.getTypeConfig(
      this.$store.getters['default/getTypeConfigs'],
      'login_circle_image'
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
          self.login()
        }
      })
    },
    async login() {
      try {
        if (this.$refs.form.validate()) {
          this.isValid = false
          this.error = null
          await this.$auth
            .loginWith('local',{
              data: {
                username: this.form.username,
                password: this.form.password,
              },
            })
            .then((response) => {
              this.msgClass = 'is-green'
              this.error = 'You have login successfully.';
              window.location.href = '/' + '?n=' + new Date().getTime();
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
      this.usernameRules = [(v) => !!v || 'E-mail/Username is required']
      this.passwordRules = [(v) => !!v || 'Password is required']
    },
  },
}
</script>

<style lang="scss" scoped>
.login {
  .logoClass {
    text-decoration: none;
    color: white;
    span {
      font-weight: 800;
      color: #fa8c28;
    }
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
    // height: calc(100vh - 73px);
    background: #ffffff;
    padding: 64px 0;
    @media screen and (max-width: 768px) {
      padding: 20px;
    }
    .form-card {
      max-width: 577px;
      margin: 0 auto;
      background: #ffffff;
      box-shadow: 1px 4px 34px rgb(46 48 92 / 20%);
      padding: 48px 44px 40px;
      @media screen and (max-width: 768px) {
        padding: 20px;
      }
      img {
        display: block;
        margin: 0 auto 24px;
        &.img-logo {
          display: block;
        }
      }
      h1 {
        font-style: normal;
        font-weight: 400;
        font-size: 21px;
        line-height: 25px;
        text-align: center;
        color: #2e305c;
        margin-bottom: 20px;
      }
      .custom-form {
        .container {
          .add-on {
            margin-top: 10px;
            padding-top: 0;
            align-items: center;
            div {
              padding-top: 0;
            }
            .forget-pwd {
              line-height: 20px;
              /* identical to box height */

              text-align: right;

              a {
                font-style: normal;
                font-weight: 500;
                font-size: 14px;
                color: #fa8c28;
                text-decoration: none;

                @media all and (max-width: 380px) {
                  font-size: 12px;
                }
              }
            }
          }
          .custom-input.v-input--selection-controls {
            margin-top: 0;
            padding-top: 0;
            .v-label.theme--light {
              color: red;
            }
          }
          .submit-btn {
            width: 100%;
            height: 64px;
            margin-top: 20px;
            background: #fa8c28;
            border-radius: 4px;

            font-style: normal;
            font-weight: 500;
            font-size: 16px;
            line-height: 19px;
            text-transform: uppercase;

            color: #ffffff;
            &.disabled {
              background-color: #eeeeee;
              cursor: not-allowed;
              pointer-events: none;
            }
          }
          .bottom {
            p {
              text-align: center;
              font-style: normal;
              font-weight: 300;
              font-size: 14px;
              line-height: 17px;
              /* identical to box height */

              color: #2e305c;
              a {
                text-decoration: underline;
                font-weight: 600;
                margin-left: 10px;
                color: #fa8c28;
              }
            }
          }
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
}
</style>
