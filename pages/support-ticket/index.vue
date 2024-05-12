<template>
  <div class="support-tickets">
    <left-panel-vue />
    <div class="middle-panel">
      <div class="header">
        <v-alert v-if="successMessage" class="success" type="success">
          <span>{{ successMessage }}</span>
        </v-alert>
        <div class="player">
          <div class="diplayinline">
            <img src="@/assets/icon/player-round.svg" alt="player round" />
          </div>
          <div class="right diplayinline widht100">
            <h1>Got a Pick Scored Wrong?</h1>
            <button @click="showModal">
              <div class="btn-content">
                <span>Watch Video</span>
                <img src="@/assets/icon/player.png" alt="player" />
              </div>
            </button>
          </div>
        </div>
        <p class="text">
          Please review the grading rules prior to putting in a support ticket.
          <span><a class="link" href="/rules">(Rules)</a></span>
        </p>
        <div class="info">
          <p>Answered tickets are deleted every 7 days</p>
        </div>
        <div class="tags">
          <p class="left">Open Tickets</p>
        </div>
        <div class="table-responsive">
          <table>
            <thead>
              <tr>
                <th class="ticket">TICKET</th>
                <th class="user">USER</th>
                <th class="updated">UPDATED</th>
                <th class="actions">
                  STATUS <span class="thhidemobile">| ACTIONS</span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(ticket, index) in pendingTickets"
                :key="`pendingTicket${index}`"
              >
                <td class="ticket">
                  <a
                    v-if="ticket.pickId"
                    :href="`/${ticket.pickId}/detail-pick`"
                    target="_blank"
                    >View Pick</a
                  >
                  <span v-else>{{ ticket.subject }}</span>
                </td>
                <td class="user">{{ ticket.userName }}</td>
                <td class="updated">{{ ticket.dateUpdated }}</td>
                <td>
                  <div class="d-flex">
                    <div
                      :class="{
                        status: true,
                        answered: ticket.status.toLowerCase() === 'answered',
                      }"
                    >
                      <font-awesome-icon icon="fa-solid fa-circle-check" />
                    </div>
                    <div class="actions">
                      <span class="reply" @click="goReplyPage(ticket)"
                        >REPLY
                      </span>
                    </div>
                  </div>
                </td>
              </tr>
              <tr v-if="!pendingTickets.length">
                <td colspan="4">
                  <div v-if="pendindLoading" class="notfound">
                    <v-progress-circular
                      color="primary"
                      indeterminate
                      :size="55"
                      :width="8"
                    ></v-progress-circular>
                  </div>
                  <p v-else class="notification">No tickets are available.</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="bottom">
          <a href="/support-ticket/new/site-issue"
            ><span class="">Create a Support Ticket</span></a
          >
        </div>
      </div>
      <div class="content">
        <h1 class="heading">Answered Tickets</h1>
        <div class="table-responsive">
          <table>
            <thead>
              <tr>
                <th class="ticket">TICKET</th>
                <th class="user">USER</th>
                <th class="updated">UPDATED</th>
                <!-- <th class="status"></th> -->
                <th class="actions">
                  STATUS <span class="thhidemobile">| ACTIONS</span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(item, index) in currentData"
                :key="'support-ticket-' + index"
              >
                <td class="ticket">
                  <a
                    v-if="item.pickId"
                    :href="`/${item.pickId}/detail-pick`"
                    target="_blank"
                    >View Pick</a
                  >
                  <span v-else>{{ item.subject }}</span>
                </td>
                <td class="user">{{ item.userName }}</td>
                <td class="updated">{{ item.dateUpdated }}</td>
                <td>
                  <div class="d-flex">
                    <div
                      :class="{
                        status: true,
                        answered: item.status.toLowerCase() === 'answered',
                      }"
                    >
                      <font-awesome-icon icon="fa-solid fa-circle-check" />
                    </div>
                    <div class="actions">
                      <span class="reply" @click="goReplyPage(item)"
                        >REPLY</span
                      >
                    </div>
                  </div>
                </td>
              </tr>
              <tr v-if="!currentData.length">
                <td colspan="4">
                  <div v-if="openLoading" class="notfound">
                    <v-progress-circular
                      color="primary"
                      indeterminate
                      :size="55"
                      :width="8"
                    ></v-progress-circular>
                  </div>
                  <p v-else class="notification">No tickets are available.</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <pagination-vue
          v-if="currentData.length"
          :from-index="fromIndex"
          :to-index="toIndex"
          :total-count="totalCount"
          :total-pages="totalPages"
          :current-page="currentPage"
          @goPage="goPage"
        />
      </div>
    </div>
    <right-panel-vue />
    <client-only>
      <modal
        class="my-custom-modal support-ticket-video-modal"
        name="video-modal"
      >
        <div class="modal-content">
          <h1>YOUTUBE VIDEO WILL PLAY IN THIS POPUP</h1>
        </div>
      </modal>
    </client-only>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import RightPanelVue from "@/components/common/RightPanel.vue";
import LeftPanelVue from "@/components/common/LeftPanel.vue";
import PaginationVue from "@/components/common/PaginationPage.vue";

export default {
  name: "SupportTickets",
  components: {
    RightPanelVue,
    LeftPanelVue,
    PaginationVue,
  },
  middleware: "auth",
  asyncData({ store }) {
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
        "Have an issue? Submit a support ticket, and we will get your issue resolved.",
      image: clientData?.sharingImage,
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
    return { headData };
  },
  data() {
    return {
      dialog: true,
      pendingTickets: [],
      successMessage: "",
      openLoading: true,
      pendindLoading: true,
    };
  },
  async fetch() {
    const page = this.$route.query.page || 1;
    if (page) {
      this.setPage(Number(page));
    }

    await this.$axios
      .$get("support-ticket/?status=pending")
      .then((response) => {
        this.pendingTickets = response.data.records || [];
        this.pendindLoading = false;
      })
      .catch((e) => {
        this.pendindLoading = false;
      });
    await this.$store.dispatch("supporttickets/fetchSupportTickets");
    this.openLoading = false;
  },
  head() {
    return this.headData;
  },

  computed: {
    ...mapState("supporttickets", {
      currentPage: (state) => state.currentPage,
      pageSize: (state) => state.pageSize,
    }),
    ...mapGetters("supporttickets", [
      "currentData",
      "totalPages",
      "totalCount",
    ]),
    fromIndex() {
      return this.pageSize * (this.currentPage - 1) + 1;
    },
    toIndex() {
      const endIndex = this.pageSize * this.currentPage;
      return endIndex > this.totalCount ? this.totalCount : endIndex;
    },
  },
  mounted() {
    this.successMessage = localStorage.getItem("ticketSuccessMessage");
    localStorage.removeItem("ticketSuccessMessage");
    const page = this.$route.query.page || 1;
    if (page && Number(this.currentPage) < Number(page))
      this.goPage(this.currentPage);
  },

  methods: {
    ...mapActions("supporttickets", ["setPage"]),
    goPage(page) {
      this.setPage(page);
      window.location.href = "/support-ticket?page=" + page;
    },
    goReplyPage(item) {
      window.location.href = `/support-ticket/reply/${item.id}`;
    },
    showModal() {
      this.$modal.show("video-modal");
    },
  },
};
</script>

<style lang="scss" scoped>
.link {
  text-decoration: none;
  color: #0fae3b !important;
}
.notfound {
  font-weight: bold;
  text-align: center;
  margin-top: 10%;
  margin-bottom: 10%;
}
.support-tickets {
  display: flex;
  justify-content: space-between;
  padding: 24px 32px;
  gap: 24px;
  background-color: #ececec;
  .middle-panel {
    .header {
      background: #ffffff;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      padding: 15px;
      @media screen and (max-width: 767px) {
        margin-top: 0px !important;
      }
      .player {
        margin: 0;
        background: linear-gradient(92.95deg, #e7ffff 0.64%, #d7e7ff 100%);
        border: 0.5px solid #dfe0f4;
        border-radius: 8px;
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 12px 16px;
        gap: 16px;

        @media screen and (max-width: 767px) {
          margin-top: 0px !important;
        }
        .right {
          text-align: center;
          h1 {
            font-style: normal;
            font-weight: 700;
            font-size: 18px;
            line-height: 22px;
            color: #2e305c;
          }
          button .btn-content {
            display: flex;
            align-items: center;
            padding: 10px 14px;
            gap: 6px;
            background: #f3f4ff;
            border: 1px solid #2e305c;
            border-radius: 6px;
            margin-top: 8px;
            span {
              font-style: normal;
              font-weight: 1000;
              font-size: 14px;
              line-height: 10px;
              /* identical to box height */

              color: #2e305c;
              margin-right: 8px;
            }
          }
        }

        .diplayinline {
          display: inline-block;
        }
        .widht100 {
          width: 100%;
        }
      }
      .text {
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 13px;
        text-align: center;
        color: #000;
        margin: 15px 0;
        @media screen and (max-width: 767px) {
          font-size: 14px !important;
          font-weight: 500 !important;
        }
        span {
          color: #fa8c28;
          text-decoration: none;
        }
      }
      .info {
        background: #ebecf6;
        border-radius: 8px;
        padding: 12px 16px;
        p {
          font-weight: 600;
          font-size: 15px;
          line-height: 18px;
          /* identical to box height */
          text-align: center;
          color: #2e305c;
          @media screen and (max-width: 767px) {
            font-size: 15px !important;
          }
        }
      }
      .tags {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 16px;
        margin-bottom: 0;
        padding: 10px 0;
        font-size: 16px;
        @media screen and (max-width: 767px) {
          padding: 0;
          margin-bottom: 0 !important;
        }
        .left {
          color: #000000;
          font-style: normal;
          font-weight: 700;
          font-size: 16px;
          line-height: 24px;
          @media screen and (max-width: 959px) {
            font-size: 14px !important;
          }
        }
        .right {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 7px;
          font-style: normal;
          font-weight: 600;
          font-size: 12px;
          line-height: 24px;
          color: #fa8c28;
          svg {
            width: 16px;
            height: 16px;
          }
        }
      }
      .bottom {
        justify-content: space-between;
        padding: 30px;
        text-align: center;
        a {
          text-decoration: none;
        }
        span {
          font-style: normal;
          font-weight: 600;
          font-size: 15px;
          line-height: 15px;
          text-transform: uppercase;
          color: #ffffff;
          background: #2e305c;
          border-radius: 4px;
          padding: 8px 16px;
          &.right {
            background: #5d5f88;
          }
        }
      }
      .success {
        background-color: #0fae3b;
        border-color: #0fae3b;
        color: #ffffff;
        span {
          padding-left: 5px;
        }
      }
    }
    .content {
      margin-top: 20px;
      background: #ffffff;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      padding: 15px;
      .heading {
        color: #000000;
        font-style: normal;
        font-weight: 700;
        font-size: 16px;
        line-height: 24px;
        margin-bottom: 12px;
      }
      table {
        @media screen and (max-width: 1024px) {
          margin: 0 0 16px !important;
        }
      }
    }
    table {
      background: #ffffff;
      border-spacing: 0;
      border-collapse: separate;
      margin-top: 0;
      width: 100%;
      @media screen and (max-width: 767px) {
        margin-top: 10px !important;
      }
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
        &.ticket {
          a {
            text-decoration: none;
            color: #000000;
          }
        }
      }
      tr th {
        background: #eee;
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
        font-style: normal;
        background: #fafafa;
        tr {
          th {
            font-weight: 700;
            font-size: 14px;
            line-height: 1.2;
            color: #000000;
            align-items: center;
            padding: 10px 16px;
            width: 15%;
            text-align: center;
            white-space: nowrap;
            @media screen and (max-width: 767px) {
              font-size: 14px !important;
            }
            &.ticket,
            &.actions {
              width: 20%;
            }
            &.updated {
              @media screen and (max-width: 767px) {
                display: none;
              }
            }
          }
        }
      }
      tbody {
        tr {
          td {
            font-size: 15px;
            line-height: 1.2;
            font-weight: 400;
            padding: 10px 8px !important;
            white-space: nowrap;
            @media screen and (max-width: 959px) {
              padding: 10px 8px !important;
              font-size: 14px !important;
              font-weight: 500 !important;
            }
            &.ticket {
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              width: 140px;
              max-width: 140px;
              /* or 150% */
              color: #000000;
              padding: 14px;

              &:hover {
                width: auto;
                max-width: fit-content;
                text-overflow: clip;
                white-space: normal;
              }
            }
            &.user {
              text-align: center;
              text-transform: uppercase;
            }

            &.updated {
              line-height: 10px;
              /* identical to box height */
              text-align: center;
              text-transform: uppercase;
              @media screen and (max-width: 767px) {
                display: none;
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
            .actions {
              font-style: normal;
              font-weight: 400;
              line-height: 10px;
              text-transform: uppercase;
              @media screen and (max-width: 767px) {
                font-weight: 500;
              }
              span {
                cursor: pointer;
                flex-grow: 1;
                text-align: center;
                &.delete {
                  border-right: 1px solid #e0e0e0;
                  color: #eb0d0d;
                }
                &.reply {
                  color: #000000;
                }
              }
            }
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
      .header {
        .player {
          margin: 12px;
          .right {
            h1 {
              font-size: 17px;
            }
          }
        }
        .bottom {
          flex-direction: column;
          gap: 16px;
          margin-bottom: 12px;
        }
      }
      table {
        .user {
          width: 20%;
          text-align: center;
        }
        .ticket,
        .actions {
          width: 100%;
        }
        tr td.actions > div {
          flex-direction: column;
          align-items: center;
          span {
            width: fit-content;
            padding: 8px 10px;
            &.delete {
              border-right: none !important;
              border-bottom: 1px solid #e0e0e0;
            }
          }
        }
      }
      .thhidemobile {
        display: none;
      }
    }
  }
}
</style>
