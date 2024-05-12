<template>
  <div class="new-ticket">
    <left-panel-vue />
    <div class="middle-panel">
      <div v-show="editorReady" class="content">
        <default-notification
          v-if="message"
          :message="message"
          :msg-class="msgClass"
        />
        <v-form
          ref="form"
          v-model="valid"
          class="custom-form ticket-form"
          lazy-validation
          @submit.prevent="formSubmit"
        >
          <v-container>
            <v-row>
              <v-col v-if="$route.params?.id" cols="12">
                <p class="info">Bet info: {{ form.subject }}</p>
              </v-col>
              <v-col v-else cols="12">
                <div class="tag">Title <span>*</span></div>
                <v-text-field
                  v-model.trim="form.subject"
                  :rules="titleRules"
                  :error-messages="errorMessage.title"
                  filled
                  class="custom-input"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" class="pb-0">
                <div class="tag">Message <span>*</span></div>
                <client-only>
                  <ckeditor
                    v-model="form.message"
                    @ready="editorReady = true"
                  ></ckeditor>
                </client-only>
                <v-input
                  v-model.trim="form.message"
                  :rules="messageRules"
                  :error-messages="errorMessage.message"
                  filled
                  class="custom-input"
                ></v-input>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <div class="btns">
                  <button
                    type="submit"
                    class="save"
                    :class="{ disabled: isLoading }"
                    :disabled="isLoading"
                  >
                    CREATE TICKET
                  </button>
                  <a
                    class="cancel"
                    :href="previous"
                    :disabled="isLoading"
                    :class="{ disabled: isLoading }"
                    >CANCEL</a
                  >
                </div>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </div>
      <div v-if="!editorReady" class="notfound">
        <v-progress-circular
          color="primary"
          indeterminate
          :size="55"
          :width="8"
        ></v-progress-circular>
      </div>
    </div>
    <right-panel-vue />
  </div>
</template>

<script>
import RightPanelVue from "@/components/common/RightPanel.vue";
import LeftPanelVue from "@/components/common/LeftPanel.vue";
import DefaultNotification from "@/components/common/DefaultNotification.vue";

export default {
  name: "NewTicket",
  components: {
    LeftPanelVue,
    RightPanelVue,
    DefaultNotification,
  },
  data() {
    return {
      form: {
        ticketType: this.$route.params.id ? "pick" : "site-issue",
        subject: "",
        message: "",
      },
      isPick: false,
      isLoading: false,
      editorReady: false,
      message: null,
      msgClass: null,
      valid: true,
      titleRules: [],
      messageRules: [],
      errorMessage: {
        title: "",
        message: "",
      },
    };
  },
  async fetch() {
    if (this.$route.params.id) {
      await this.$axios
        .$get(`support-ticket/new/${this.$route.params.id}/pick`)
        .then((response) => {
          this.form.subject = response.data.title;
        });
    }
  },
  computed: {
    previous() {
      return "/support-ticket";
    },
  },
  watch: {
    "form.title"(val) {
      this.overAgeRules = [];
    },
  },

  methods: {
    formSubmit() {
      this.addValidation();
      const self = this;
      setTimeout(function () {
        if (self.$refs.form.validate()) {
          self.createTicket();
        }
      });
    },
    async createTicket() {
      const self = this;
      try {
        self.isLoading = true;
        self.message = null;
        await self.$axios
          .$post("/support-ticket/create", {
            ...self.form,
            ticketType: self.$route.params.id ? "pick" : "site-issue",
            pickId: self.$route.params.id || "",
          })
          .then((response) => {
            localStorage.setItem("ticketSuccessMessage", response.message);
            window.location.href = "/support-ticket";
          })
          .catch((exception) => {
            self.isLoading = false;
            if (
              exception.response.data.message.message ||
              exception.response.data.message.subject
            ) {
              self.errorMessage.title =
                exception.response.data.message.subject || "";
              self.errorMessage.message =
                exception.response.data.message.message || "";
            } else {
              self.msgClass = "is-danger";
              self.message = exception.response.data.message.message;
            }
          });
      } catch (e) {
        self.isLoading = false;
        self.msgClass = "is-danger";
        self.message = e.response.data.message;
      }
    },
    validate() {
      this.$refs.form.validate();
    },
    addValidation() {
      this.titleRules = [(v) => !!v || "Please Enter Title"];
      this.messageRules = [(v) => !!v || "Please Enter Message"];
      return true;
    },
  },
};
</script>

<style lang="scss">
.notfound {
  font-weight: bold;
  text-align: center;
  margin-top: 10%;
  margin-bottom: 10%;
}
.ticket-form {
  .v-text-field--filled > .v-input__control > .v-input__slot {
    min-height: 40px;
  }
  .v-text-field.v-text-field--enclosed .v-text-field__details {
    min-height: 0px;
    margin-bottom: 0px;
  }
}
</style>
<style lang="scss" scoped>
.new-ticket {
  display: flex;
  justify-content: space-between;
  padding: 24px 32px;
  gap: 24px;
  background-color: #ececec;
  .middle-panel {
    .content {
      background: #ffffff;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      padding: 15px;
      .tag {
        font-style: normal;
        font-weight: 600;
        font-size: 16px;
        line-height: 24px;
        margin-bottom: 12px;
        color: #000000;
        span {
          color: #ff1c1c;
        }
      }
      .info {
        background: #ebecf6;
        border-radius: 8px;
        padding: 12px 16px;
        font-style: normal;
        font-weight: 600;
        font-size: 16px;
        line-height: 15px;
        color: #000000;
      }
      .message {
        margin-bottom: 12px;
        color: #2e305c;
        font-style: normal;
        font-weight: 600;
        font-size: 16px;
        line-height: 24px;
        span {
          color: #ff1c1c;
        }
      }
      .btns {
        margin: 10px 0 16px;
        a {
          text-decoration: none;
        }
        a,
        button {
          background: #0fae3b;
          border-radius: 4px;
          align-items: center;
          padding: 8px 16px;
          font-style: normal;
          font-weight: 600;
          font-size: 14px;
          line-height: 17px;
          /* identical to box height */

          text-transform: uppercase;

          color: #ffffff;

          @media screen and (max-width: 640px) {
            font-size: 12px;
          }
          &.save {
            background: #0fae3b;
            margin-right: 10px;
            &.disabled {
              opacity: 0.7;
              background: #73e693;
              cursor: not-allowed;
              pointer-events: none;
            }
          }
          &.cancel {
            background: #212237;
            margin-right: 10px;
            &.disabled {
              opacity: 0.7;
              background: #636483;
              cursor: not-allowed;
              pointer-events: none;
            }
          }
          &.mark-as-read {
            background: #2e305c;
          }
        }
      }
    }
  }
  @media screen and (max-width: 767px) {
    padding: 15px;
    background-color: #ffffff;
    .middle-panel {
      min-width: 100%;
      .content {
        border: none;
        border-radius: 0;
        .info {
          text-align: left;
        }
      }
    }
  }
}
</style>
