<template>
  <div class="support-ticket-reply">
    <left-panel-vue />
    <div v-show="editorReady" class="middle-panel">
      <h1 class="heading">Ticket information</h1>
      <div class="table-responsive">
        <table>
          <thead>
            <tr>
              <th class="ticket">TICKET</th>
              <th class="created">USER</th>
              <th class="updated">UPDATED</th>
              <th class="status">STATUS</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="ticket" :class="{ 'pick-link': myTicket.pickId }">
                <a
                  v-if="myTicket.pickId"
                  :href="`/${myTicket.pickId}/detail-pick`"
                  target="_blank"
                  >View Pick</a
                >
                <span v-else>{{ myTicket.subject }}</span>
              </td>

              <td class="created">{{ myTicket.userName }}</td>
              <td class="updated">{{ myTicket.dateUpdated }}</td>
              <td class="status">
                <div class="d-flex">
                  <div
                    :class="{
                      status: true,
                      answered: myTicket.status.toLowerCase() === 'answered',
                    }"
                  >
                    <font-awesome-icon icon="fa-solid fa-circle-check" />
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div
        v-for="(reply, index) in replies"
        :key="'reply-' + index"
        class="reply"
      >
        <div class="header">
          <span class="email">{{
            reply.userName +
            " (" +
            (reply.isModerator ? "moderator" : reply.userEmail) +
            ")"
          }}</span>
          <span class="date">{{ reply.dateCreated }}</span>
        </div>
        <div class="body" v-html="reply.message"></div>
      </div>
      <default-notification
        v-if="message"
        :message="message"
        :msg-class="msgClass"
      />
      <v-form
        ref="form"
        v-model="valid"
        lazy-validation
        class="custom-form ticket-form"
        @submit.prevent="formSubmit"
      >
        <v-container>
          <v-row>
            <v-col cols="12" class="pb-0">
              <div class="tag">Message <span>*</span></div>
              <client-only>
                <ckeditor
                  v-model="form.message"
                  @ready="editorReady = true"
                ></ckeditor
              ></client-only>
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
                >
                  SEND
                </button>
                <a
                  :href="previous"
                  class="cancel"
                  :class="{ disabled: isLoading }"
                  :disabled="isLoading"
                  >CANCEL</a
                >
                <a
                  v-if="
                    $auth.hasScope('ROLE_ADMIN_USER') &&
                    myTicket.status?.toLowerCase() !== 'answered'
                  "
                  href="javascript:void(0)"
                  class="mark-as-read"
                  :class="{ disabled: isLoading }"
                  :disabled="isLoading"
                  @click="markAsRead()"
                  >MARK AS ANSWERED</a
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
    <right-panel-vue />
  </div>
</template>

<script>
import RightPanelVue from "@/components/common/RightPanel.vue";
import LeftPanelVue from "@/components/common/LeftPanel.vue";
import DefaultNotification from "@/components/common/DefaultNotification.vue";

export default {
  name: "SupportTicketReply",
  components: {
    RightPanelVue,
    LeftPanelVue,
    DefaultNotification,
  },
  middleware: "auth",
  async asyncData({ $axios, req, params, store }) {
    $axios.onRequest((config) => {
      config.headers.Origin = req.headers.host;
    });
     const clientData = store.getters["default/getClient"];

    let faviconVal = ''; 
    for (const ky in store.getters["default/getTypeConfigs"]) {
      if (store.getters["default/getTypeConfigs"][ky].field_name === 'homepage_favicon_image') {
        faviconVal = store.getters["default/getTypeConfigs"][ky].field_value;
      }
    }

    const mainData = {
      title: `Support Tickets | ${clientData?.siteName}`,
      description:
        "Have a issue? Create a support ticket and we will get it handled right away.",
      image: clientData?.sharingImage,
      favicon: faviconVal
    };
    const myTicket = (await $axios.$get("/support-ticket/" + params.id))?.data;

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
    return { headData, myTicket };
  },
  data() {
    return {
      editorReady: false,
      form: {
        message: "",
      },
      isLoading: false,
      message: null,
      msgClass: null,
      valid: true,
      messageRules: [],
      errorMessage: {
        message: "",
      },
    };
  },
  head() {
    return this.headData;
  },
  computed: {
    previous() {
      return "/support-ticket";
    },
    replies() {
      return Object.keys(this.myTicket).length ? this.myTicket.messages : [];
    },
  },
  watch: {
    "form.title"(val) {
      this.overAgeRules = [];
    },
  },
  methods: {
    async markAsRead() {
      const self = this;
      self.isLoading = true;
      await self.$axios
        .$put(`/support-ticket/${self.$route.params.id}`, { isAnswered: true })
        .then((response) => {
          localStorage.setItem("ticketSuccessMessage", response.message);
          window.location.href = "/support-ticket";
        })
        .catch((exception) => {
          self.isLoading = false;
          if (exception.response.data.message.message) {
            self.errorMessage.message =
              exception.response.data.message.message || "";
          } else {
            self.msgClass = "is-danger";
            self.message = exception.response.data.message.message;
          }
        });
    },
    formSubmit() {
      this.addValidation();
      const self = this;
      setTimeout(function () {
        if (self.$refs.form.validate()) {
          self.sendReplay();
        }
      });
    },
    async sendReplay() {
      const self = this;
      try {
        self.isLoading = true;
        self.message = null;
        const payload = { ...self.form };
        if (self.$auth.hasScope("ROLE_ADMIN_USER")) {
          payload.isAnswered = true;
        }
        await self.$axios
          .$put(`/support-ticket/${self.$route.params.id}`, payload)
          .then((response) => {
            localStorage.setItem("ticketSuccessMessage", response.message);
            window.location.href = "/support-ticket";
          })
          .catch((exception) => {
            self.isLoading = false;
            if (exception.response.data.message.message) {
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
      this.messageRules = [(v) => !!v || "Please Enter Message"];
      return true;
    },
  },
};
</script>

<style lang="scss" scoped>
.notfound {
  font-weight: bold;
  text-align: center;
  margin-top: 10%;
  margin-bottom: 10%;
}
.support-ticket-reply {
  display: flex;
  justify-content: space-between;
  padding: 24px 32px;
  gap: 24px;
  background-color: #ececec;
  .middle-panel {
    height: 100%;
    min-width: 549px;
    background-color: #ffffff;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    padding: 12px;
    .heading {
      color: #000000;
      font-style: normal;
      font-weight: 700;
      font-size: 16px;
      line-height: 24px;
      margin-bottom: 16px;
    }
    table {
      width: 100%;
      border-spacing: 0;
      border-collapse: separate;
      margin-bottom: 24px;
      tr th,
      tr td {
        border-right: 0.5px solid #e0e0e0;
        border-bottom: 0.5px solid #e0e0e0;
        &:first-child {
          border-left: 0.5px solid #e0e0e0;
        }

        .d-flex {
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
      tr th {
        border-top: 0.5px solid #e0e0e0;
        text-align: left;
      }

      /* top-left border-radius */
      tr:first-child th:first-child {
        border-top-left-radius: 4px;
      }

      /* top-right border-radius */
      tr:first-child th:last-child {
        border-top-right-radius: 4px;
      }

      /* bottom-left border-radius */
      tr:last-child td:first-child {
        border-bottom-left-radius: 4px;
      }

      /* bottom-right border-radius */
      tr:last-child td:last-child {
        border-bottom-right-radius: 4px;
      }
      thead {
        background: #fafafa;
        tr {
          th {
            font-style: normal;
            font-size: 14px;
            line-height: 10px;
            color: #000000;
            text-align: center;
            padding: 12px 6px;
            width: 25%;
            &.type {
              width: 16%;
            }

            @media screen and (max-width: 959px) {
              font-size: 14px !important;
              width: 25%;
            }
            @media screen and (min-width: 767px) and (max-width: 1396px) {
              font-size: 14px !important;
              width: auto;
            }
          }
        }
      }
      tbody {
        tr {
          td {
            text-align: center;
            font-style: normal;
            font-size: 15px;
            line-height: 17px;
            padding: 12px;
            color: #000000;
            @media screen and (max-width: 959px) {
              padding: 12px !important;
              font-size: 14px !important;
              font-weight: 500 !important;
            }

            &.type,
            &.created,
            &.updated {
              color: #000000;
            }
            &.ticket {
              &.pick-link {
                text-align: center;
              }
              a {
                text-decoration: none;
                color: #000000;
              }
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              width: 140px;
              max-width: 140px;
              /* or 150% */
              padding: 14px;
              text-align: left;

              &:hover {
                width: auto;
                max-width: fit-content;
                text-overflow: clip;
                white-space: normal;
              }
            }
            &.status {
              color: #000000;
              &.answered {
                color: #0fae3b;
              }
            }

            .status {
              line-height: 10px;
              margin-right: 8px;
              /* identical to box height */

              text-align: center;
              text-transform: uppercase;

              color: #000000;
              &.answered {
                color: #0fae3b;
                margin-right: 8px;
              }
            }
          }
        }
      }
    }
    .reply {
      margin-bottom: 20px;
      .header {
        background: #2e305c;
        border-radius: 4px 4px 0px 0px;
        padding: 12px 16px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        span {
          font-style: normal;
          font-weight: 700;
          font-size: 13px;
          line-height: 12px;
          color: #ffffff;
        }
      }
      .body {
        padding: 20px 16px 40px;
        background: #f9f9fc;
        border-width: 0px 0.5px 0.5px 0.5px;
        border-style: solid;
        border-color: #dfe0f4;
        border-radius: 0px 0px 4px 4px;
        font-weight: 400;
        font-size: 15px;
      }
    }
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
    .btns {
      margin: 10px 0 16px;
      a,
      button {
        text-decoration: none;
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
            background: #272733;
            cursor: not-allowed;
            pointer-events: none;
          }
        }
        &.mark-as-read {
          background: #2e305c;
          &.disabled {
            opacity: 0.7;
            background: #3a3c5c;
            cursor: not-allowed;
            pointer-events: none;
          }
        }
      }
    }
  }
  @media screen and (max-width: 767px) {
    background-color: #ffffff;
    padding: 16px;
    .middle-panel {
      min-width: 100%;
      table {
        th,
        td {
          padding-right: 0 !important;
          padding-left: 0 !important;
        }
      }
      .thhidemobile {
        display: none;
      }
    }
  }
}
</style>
