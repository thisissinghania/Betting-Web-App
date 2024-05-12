<template>
  <div class="contactus" data-app>
    <left-panel />
    <div class="middle-panel">
      <div class="formbg">
        <h1>Contact Us</h1>
        <div class="form-card">
          <DefaultNotification
            :message="error"
            v-if="error"
            :msgClass="msgClass"
          />
          <v-form
            ref="form"
            v-model="valid"
            class="custom-form"
            lazy-validation
            @submit.prevent="formSubmit"
          >
            <v-container fluid>
              <v-row align="center">
                <v-select
                  :items="getIqTypes"
                  label="Type"
                  filled
                  class="custom-input"
                  v-model="form.inquiryType"
                  :rules="inquiryTypeRules"
                ></v-select>
              </v-row>
              <v-row>
                <v-text-field
                  v-model="form.contactName"
                  label="Name"
                  filled
                  class="custom-input"
                  :rules="contactNameRules"
                ></v-text-field>
              </v-row>

              <v-row>
                <v-text-field
                  v-model="form.contactEmail"
                  label="Email"
                  :rules="contactEmailRules"
                  filled
                  class="custom-input"
                ></v-text-field>
              </v-row>

              <v-row>
                <v-textarea
                  solo
                  v-model="form.contactMessage"
                  label="Message"
                  :rules="contactMessageRules"
                  filled
                  class="custom-input"
                ></v-textarea>
              </v-row>
              <v-row>
                <v-col cols="6">
                  <button
                    :class="`submit-btn ${isValid ? '' : 'disabled'}`"
                    @click="validate"
                  >
                    Submit
                  </button>
                </v-col>
                <v-col cols="6">
                  <button type="button" @click="backToHome" class="cancel-btn">
                    Cancel
                  </button>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </div>
      </div>
    </div>
    <right-panel />
  </div>
</template>

<script>
import DefaultNotification from "@/components/common/DefaultNotification.vue";
import LeftPanel from "@/components/common/LeftPanel.vue";
import RightPanel from "@/components/common/RightPanel.vue";

export default {
  name: "Contact",
  components: {
    LeftPanel,
    RightPanel,
    DefaultNotification,
  },
  data() {
    return {
      eqTypes: [],
      isValid: true,
      form: {
        inquiryType: "",
        contactName: "",
        contactEmail: "",
        contactMessage: "",
      },
      valid: true,
      error: null,
      msgClass: null,
      inquiryTypeRules: [],
      contactNameRules: [],
      contactEmailRules: [],
      contactMessageRules: [],
    };
  },
  computed: {
    getIqTypes() {
      return this.$store.getters["default/getIqTypes"];
    },
    getContactMeta() {
      return this.$store.getters["default/getClient"];
    },
  },
  watch: {
    "form.contactName"(val) {
      this.contactNameRules = [];
    },
    "form.contactEmail"(val) {
      this.contactEmailRules = [];
    },
    "form.contactMessage"(val) {
      this.contactMessageRules = [];
    },
    "form.inquiryType"(val) {
      this.inquiryTypeRules = [];
    },
  },
  methods: {
    formSubmit() {
      this.addValidation();
      const self = this;
      setTimeout(function () {
        if (self.$refs.form.validate()) {
          self.contactus();
        }
      });
    },
    async contactus() {
      try {
        if (this.$refs.form.validate()) {
          this.isValid = false;
          this.error = null;
          await this.$axios
            .$post("/contactus", { ...this.form })
            .then((response) => {
              if (response.code === 200) {
                this.isValid = true;
                this.msgClass = "is-green";
                this.error = response.message;
                const self = this;
                setTimeout(function () {
                  self.$router.push({ path: "/" });
                }, 3000);
              } else {
                this.isValid = true;
                this.error = response.data.message;
                this.msgClass = "is-danger";
              }
            })
            .catch((exception) => {
              this.isValid = true;
              this.msgClass = "is-danger";
              this.error = exception.response.data.message;
            });
        }
      } catch (e) {
        this.isValid = true;
        this.msgClass = "is-danger";
        this.error = e.response.data.message;
      }
    },
    validate() {
      this.$refs.form.validate();
    },
    addValidation() {
      this.contactNameRules = [
        (v) => !!v || "Name is required",
        (v) => v.length <= 30 || "Name must be less than 30 characters",
        (v) => v.length >= 3 || "Name must be greater than 3 characters",
      ];
      this.contactEmailRules = [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+/.test(v) || "E-mail must be valid",
      ];
      this.contactMessageRules = [(v) => !!v || "Message is required"];
      this.inquiryTypeRules = [(v) => !!v || "Please select Inquiry Type"];
    },
    resetValidations() {
      this.contactNameRules = [];
      this.contactEmailRules = [];
      this.contactMessageRules = [];
      this.inquiryTypeRules = [];
    },
    backToHome() {
      this.resetValidations();
      window.location.href = "/";
    },
  },
  head() {
    return {
      title:
        "Contact Us | " +
        (this.getContactMeta.site_name
          ? this.getContactMeta.site_name
          : "PickATM"),
      meta: [
        {
          name: "description",
          content:
            "For all advertising inquiries or general information please fill out the form. We will do our best to respond in the next 24-48 hours.",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.contactus {
  display: flex;
  justify-content: space-between;
  padding: 24px 32px;
  gap: 24px;
  background-color: #ececec;

  .middle-panel {
    background: #ffffff;
    border: 1px solid #e0e0e0;
    border-radius: 8px;

    .formbg {
      padding: 24px;

      h1 {
        font-size: 24px;
        font-weight: 700;
        margin-bottom: 15px;
      }
    }
  }

  .form-card {
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

        .cancel-btn {
          width: 100%;
          height: 64px;
          background: #f20;
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

  @media screen and (max-width: 768px) {
    padding: 16px;
    .middle-panel {
      min-width: 100%;
      width: 100%;
    }
  }
}
</style>
