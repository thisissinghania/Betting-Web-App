<template>
  <div class="my-pending-picks">
    <div class="banner">
      <img src="@/assets/image/banner-promotion.jpg" width="100%" />
    </div>
    <div class="content">
      <div class="headline">
        <span>Leaderboard</span>
        <div class="search-member">
          <input type="text" placeholder="Search member" />
        </div>
      </div>
      <div class="table-responsive">
        <table>
          <thead>
            <tr>
              <th>RANK</th>
              <th>MEMBER</th>
              <th>STREAK</th>
              <th>LAST PICK</th>
              <th>PICK</th>
              <th>DEADLINE</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>CleverSnNm</td>
              <td>12</td>
              <td>Mar 9, 2023</td>
              <td class="detail">
                <div>
                  <span
                    class="text text-ellipse-mobile"
                    @click="showModal('pickdetail')"
                    >Green Bay Packers/Chicago Bears Over 138.5</span
                  >
                  <span class="badge" :style="{ background: randomColor() }">
                    7B
                  </span>
                </div>
              </td>
              <td>
                <span
                  v-tooltip="{ content: 'Mar 18, 2023 04:39 PM' }"
                  class="info"
                  >&#x2139;</span
                >
                3 Days 8 Hrs 53 Min
              </td>
            </tr>
            <tr>
              <td>2</td>
              <td>mikeyj1621</td>
              <td>10</td>
              <td>Mar 11, 2023</td>
              <td class="detail">
                <div>
                  <span
                    class="text text-ellipse-mobile"
                    @click="showModal('pickdetail')"
                    >Green Bay Packers/Chicago Bears Over 138.5</span
                  >
                  <span class="badge" :style="{ background: randomColor() }">
                    7B
                  </span>
                </div>
              </td>
              <td>
                <span
                  v-tooltip="{ content: 'Mar 18, 2023 04:39 PM' }"
                  class="info"
                  >&#x2139;</span
                >
                5 Days 8 Hrs 19 Min
              </td>
            </tr>
            <tr>
              <td>3</td>
              <td>monlouie</td>
              <td>10</td>
              <td>Mar 11, 2023</td>
              <td class="detail">
                <div>
                  <span
                    class="text text-ellipse-mobile"
                    @click="showModal('pickdetail')"
                    >Green Bay Packers/Chicago Bears Over 138.5</span
                  >
                  <span class="badge" :style="{ background: randomColor() }">
                    7B
                  </span>
                </div>
              </td>
              <td>
                <span
                  v-tooltip="{ content: 'Mar 18, 2023 04:39 PM' }"
                  class="info"
                  >&#x2139;</span
                >
                5 Days 13 Hrs 15 Min
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <Pagination
        :from-index="fromIndex"
        :to-index="toIndex"
        :total-count="totalCount"
        :total-pages="totalPages"
        :current-page="currentPage"
        @goPage="goPage"
      />
    </div>

    <client-only>
      <modal
        class="my-custom-modal my-pending-picks-detail-modal"
        name="pickdetail-modal"
      >
        <div class="modal-content">
          <div class="header mobilenew">
            <h1 class="date-time">Sept 06, 2022 1:00 EDT</h1>
            <img
              alt="cross"
              src="@/assets/icon/cross-gray.png"
              @click="hideModal('pickdetail')"
            />
          </div>
          <div class="body">
            <div class="table-responsive">
              <table>
                <thead>
                  <tr>
                    <th class="green-bay">Green Bay Packers</th>
                    <th class="chicago">Chicago Bears</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="straight">
                    <td class="green-bay">
                      <div>
                        <span class="title">Straight: </span>
                        <span class="value">-1 (-123)</span>
                        <img
                          src="@/assets/icon/done.svg"
                          alt="done"
                          class="donetik"
                        />
                      </div>
                    </td>
                    <td class="chicago">
                      <div>
                        <span class="title">Straight: </span>
                        <span class="value">1 (+103)</span>
                      </div>
                    </td>
                  </tr>
                  <tr class="money">
                    <td class="green-bay">
                      <div>
                        <span class="title">Money: </span>
                        <span class="value">-130</span>
                      </div>
                    </td>
                    <td class="chicago">
                      <div>
                        <span class="title">Money: </span>
                        <span class="value">+120</span>
                      </div>
                    </td>
                  </tr>
                  <tr class="over">
                    <td class="green-bay">
                      <div>
                        <span class="title">Over: </span>
                        <span class="value">45.5 (-110)</span>
                      </div>
                    </td>
                    <td class="chicago">
                      <div>
                        <span class="title">Under: </span>
                        <span class="value">45.5 (-110)</span>
                      </div>
                    </td>
                  </tr>
                  <tr class="score">
                    <td class="green-bay">
                      <div>
                        <span class="title">Score: </span>
                        <span class="value"></span>
                      </div>
                    </td>
                    <td class="chicago">
                      <div>
                        <span class="title">Score: </span>
                        <span class="value"></span>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="modal-footer">
            <button @click="hideModal('pickdetail')">Close</button>
          </div>
        </div>
      </modal>
    </client-only>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import Pagination from "@/components/common/PaginationPage.vue";

export default {
  name: "SurvivorData",
  components: { Pagination },
  data() {
    return {
      colors: [
        "#6E37E3",
        "#FF1C74",
        "#37B0E3",
        "#0FAE3B",
        "#000000",
        "#F1B93F",
        "#E33737",
        "#96694F",
      ],
    };
  },
  computed: {
    ...mapState("survivorData", {
      currentPage: (state) => state.currentPage,
      pageSize: (state) => state.pageSize,
    }),
    ...mapGetters("survivorData", ["currentData", "totalPages", "totalCount"]),
    fromIndex() {
      return this.pageSize * (this.currentPage - 1) + 1;
    },
    toIndex() {
      const endIndex = this.pageSize * this.currentPage;
      return endIndex > this.totalCount ? this.totalCount : endIndex;
    },
  },
  methods: {
    randomColor() {
      const cnt = this.colors.length;
      const index = Math.floor(Math.random() * cnt);
      return this.colors[index];
    },
    ...mapActions("survivorData", ["setPage", "selectPick"]),
    goPage(page) {
      // this.setPage(page);
      // this.$router.push({ path: "/my-picks/completed?page=" + page });
      window.location.href = "/my-picks/survivor?page=" + page;
    },
    showModal(key) {
      this.$modal.show(key + "-modal");
    },
    hideModal(key) {
      this.$modal.hide(key + "-modal");
    },
  },
  // eslint-disable-next-line vue/order-in-components
  created() {
    const { page } = this.$route.query;
    if (page) {
      this.setPage(Number(page));
    }

    if (!page && this.currentPage) {
      this.$router.push({
        path: "/my-picks/survivor?page=" + this.currentPage,
      });
    }
  },
};
</script>

<style lang="scss" scoped>
.my-pending-picks {
  margin-top: 16px;
  .modal-footer {
    border-top: 0.5px solid #e0e0e0;
    padding: 15px 0 0;
    display: flex;
    display: -webkit-flex;
    justify-content: flex-end;
    -webkit-justify-content: flex-end;
    button {
      padding: 10px 15px;
      background: #6c757d;
      color: #fff;
      border-radius: 2px;
      font-size: 16px;
    }
  }
  .rules-area {
    display: grid;
    grid-template-columns: calc(40% - 6px) calc(60% - 6px);
    grid-column-gap: 12px;
    @media all and (max-width: 767px) {
      grid-template-columns: 100%;
      grid-row-gap: 15px;
    }
    .left-side {
      background: #ffffff;
      border-radius: 8px;
      padding: 0;
      border: 1px solid #e0e0e0;
      .title {
        padding: 10px 12px;
        color: #000000;
        font-style: normal;
        font-weight: 700;
        font-size: 20px;
        text-transform: capitalize;
        border-bottom: 1px solid #e0e0e0;
      }
      .list {
        padding: 12px;
        ul {
          li {
            list-style-type: none;
            margin-bottom: 11px;
            font-size: 16px;
            line-height: 18px;
            font-weight: 500;
            color: #000000;
            border: 1px solid #ffecd8;
            padding: 9px;
            border-radius: 5px;
            position: relative;
            background: #fffaf5;
            span {
              position: absolute;
              right: 12px;
              color: #fa8c28;
            }
            &:last-child {
              margin-bottom: 0px;
            }
          }
        }
      }
    }
    .right-side {
      background: #ffffff;
      border-radius: 8px;
      padding: 0;
      border: 1px solid #e0e0e0;
      .title {
        padding: 10px 12px;
        color: #000000;
        font-style: normal;
        font-weight: 700;
        font-size: 20px;
        text-transform: capitalize;
        border-bottom: 1px solid #e0e0e0;
      }
      .list {
        padding: 12px;
        ul {
          li {
            list-style-type: none;
            margin-bottom: 10px;
            font-size: 15px;
            line-height: 18px;
            color: #000000;
            padding-left: 25px;
            position: relative;
            &::after {
              content: "";
              position: absolute;
              position: absolute;
              left: 0;
              top: 4px;
              width: 13px;
              height: 6px;
              border-bottom: 2px solid #000;
              border-left: 2px solid #000;
              transform: rotate(-45deg);
              -webkit-transform: rotate(-45deg);
            }
          }
        }
      }
    }
  }
  .content {
    margin-top: 16px;
    background: #ffffff;
    border-radius: 8px;
    padding: 12px;
    .headline {
      color: #000000;
      font-style: normal;
      font-weight: 700;
      margin-bottom: 15px;
      font-size: 20px;
      display: flex;
      display: -webkit-flex;
      justify-content: space-between;
      -webkit-justify-content: space-between;
      align-items: center;
      -webkit-align-items: center;
      @media all and (max-width: 480px) {
        flex-wrap: wrap;
        -webkit-flex-wrap: wrap;
      }
      .search-member {
        @media all and (max-width: 480px) {
          width: 100%;
          margin-top: 15px;
        }
        input {
          background: #ffffff;
          border: 1px solid #e0e0e0;
          font-size: 16px;
          font-weight: 400;
          outline: none;
          box-shadow: none;
          padding: 7px 10px;
          width: 250px;
          border-radius: 5px;
          @media all and (max-width: 480px) {
            width: 100%;
          }
        }
      }
    }
    table {
      background: #ffffff;
      border-spacing: 0;
      border-collapse: separate;
      width: 100%;
      @media screen and (max-width: 1024px) {
        margin: 0 0 16px !important;
      }
      tr th,
      tr td {
        border-right: 0.5px solid #e0e0e0;
        border-bottom: 0.5px solid #e0e0e0;
        &:first-child {
          border-left: 0.5px solid #e0e0e0;
        }
      }
      tr th {
        background: #fafafa;
        border-top: 0.5px solid #e0e0e0;
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
        tr {
          th {
            font-style: normal;
            font-weight: 700;
            font-size: 14px;
            line-height: 17px;
            /* identical to box height */
            text-align: left;
            text-transform: uppercase;
            color: #000000;
            padding: 10px 8px;
            white-space: nowrap;

            @media screen and (max-width: 959px) {
              font-size: 14px !important;
              font-weight: 600 !important;
            }
          }
        }
      }
      tbody {
        tr {
          td {
            padding: 10px 8px;
            font-size: 15px;
            line-height: 18px;
            color: #000000;

            @media screen and (max-width: 959px) {
              font-size: 14px !important;
              font-weight: 400 !important;
              white-space: nowrap;
            }
            .info {
              width: 18px;
              height: 18px;
              background: #000;
              display: inline-block;
              color: #fff;
              text-align: center;
              border-radius: 100px;
              font-size: 14px;
              line-height: 16px;
              margin-right: 4px;
            }
            &.detail {
              width: 250px;
              div {
                display: flex;
                display: -webkit-flex;
                align-items: center;
                -webkit-align-items: center;
                gap: 12px;
                .text {
                  font-style: normal;
                  cursor: pointer;
                  text-decoration-line: underline;
                  color: #000000;
                  @media screen and (max-width: 959px) {
                    font-size: 14px !important;
                  }
                }

                .text-ellipse-mobile {
                  width: 140px;
                  white-space: nowrap;
                  text-overflow: ellipsis;
                  overflow: hidden;
                  text-decoration: none;

                  @media screen and (max-width: 767px) {
                    font-size: 16px !important;
                  }

                  &:hover {
                    width: auto;
                    white-space: normal;
                  }
                }

                .badge {
                  min-width: 16px;
                  width: 16px;
                  height: 16px;
                  border-radius: 500px;
                  color: #ffffff;
                  font-style: normal;
                  font-weight: 700;
                  font-size: 6px;
                  line-height: 7px;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  background-color: red;
                }
              }
            }
            &.result {
              div {
                display: flex;
                justify-content: space-around;
                align-items: center;
                img {
                  cursor: pointer;
                  @media screen and (max-width: 767px) {
                    width: 20px;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  @media screen and (max-width: 767px) {
    .content {
      padding: 0;
      table tbody tr td.result div {
        // flex-direction: column;
        gap: 8px;
      }
    }
  }
}
</style>
