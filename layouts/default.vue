<template>
  <div id="app">
    <DefaultHeader />
    <nuxt />
    <client-only>
      <script async src="//www.adplugg.com/serve/js/ad.js" setup></script>
      <script setup>
        (AdPlugg = window.AdPlugg || []).push({});
      </script>
    </client-only>
    <DefaultFooter />
  </div>
</template>

<script>
import DefaultHeader from "../components/layout/DefaultHeader.vue";
import DefaultFooter from "../components/layout/DefaultFooter.vue";

export default {
  name: "Default",
  components: { DefaultHeader, DefaultFooter },
  mounted() {
    if (
      window.innerWidth > 767 &&
      localStorage.getItem("currentPage") !== window.location.href
    ) {
      localStorage.setItem("currentPage", window.location.href);
      if (this.$auth.loggedIn) {
        this.$store.dispatch("default/updatePageView");
      }
    }
  },
};
</script>

<style lang="scss">
// @font-face {
//   font-family: "Roboto";
//   src: url("./assets/fonts/Roboto_Flex/RobotoFlex-VariableFont_wght.ttf");
// }

@font-face {
  font-family: "Roboto";
  src: url("./assets/fonts/Roboto_Flex/RobotoFlex-VariableFont_wght.ttf");
}

* {
  box-sizing: border-box;
  font-family: "Roboto";
  transition: all 0.2s;
  margin: 0;
  padding: 0;
}

body {
  margin: 0;
  &.lock-y {
    height: 100vh;
    overflow-y: hidden;
  }
}
.pb-0 {
  padding-bottom: 0 !important;
}
.text-center {
  text-align: center;
}

.v-messages__wrapper {
  color: red;
}

.header {
  span {
    font-weight: 600;
  }
}

.custom-input {
  &.v-text-field--filled {
    border-radius: 0 !important;
  }
  &.theme--light.v-text-field > .v-input__control > .v-input__slot {
    &::before {
      display: none;
    }
    &::after {
      display: none;
    }
  }
  &.v-text-field--filled .v-label--active,
  .v-text-field--full-width .v-label--active {
    transform: translateY(-12px) !important;
    font-size: 0.8em;
  }

  &.theme--light.v-text-field--filled > .v-input__control > .v-input__slot {
    background: #ffffff !important;
    border: 1px solid #e0e0e0 !important;
    border-radius: 4px !important;
    .v-text-field__slot {
      margin: 3px 0;
    }
    input {
      padding-top: 5px;
      color: #2e305c;
    }
  }

  .v-messages__wrapper {
    color: red;
  }
  .v-input__append-inner .v-icon {
    font-size: 20px;
  }

  .v-input__control .v-input__slot .v-input--selection-controls__input {
    margin-right: 8px;
    i.v-icon {
      color: #2e305c;
    }
  }
  &.v-input--selection-controls {
    margin-top: 0;
    padding-top: 0;
    .v-label.theme--light {
      color: #2e305c;
      font-size: 14px;
      font-style: normal;
      font-weight: 600;

      @media all and (max-width: 380px) {
        font-size: 12px;
      }
    }
    .v-input__slot {
      margin-bottom: 0px;
    }
  }
  .v-messages {
    min-height: auto;
  }
  .v-text-field__details {
    padding: 0px !important;
  }
}
.my-custom-modal {
  .vm--overlay {
    background: rgba(0, 0, 0, 0.9) !important;
  }
  .vm--modal {
    left: 0 !important;
    margin: auto;
    top: 50% !important;
    transform: translateY(-50%);
  }
}
.project-pitcher-modal .vm--modal {
  @media all and (max-width: 767px) {
    width: 94% !important;
  }
}
.project-pitcher-modal .vm--modal,
.balance-modal .vm--modal,
.detail-pick-modal .vm--modal {
  height: auto !important;
}
.balance-modal {
  .vm--modal {
    @media screen and (max-width: 767px) {
      width: 100% !important;
      height: auto !important;
    }
  }
}

.my-bet-modal {
  .vm--modal {
    width: 80% !important;
    height: fit-content !important;
  }
  .modal-content {
    height: 100%;
    padding: 56px 144px;
    .heading {
      font-style: normal;
      font-weight: 600;
      font-size: 32px;
      line-height: 39px;
      color: #2e305c;
      margin-bottom: 40px;
      text-align: center;
    }
    .body {
      display: flex;
      justify-content: space-between;
      .item {
        &.challenge {
          order: 1;
        }
        &.pick-3 {
          order: 2;
        }
        &.pick-5 {
          order: 3;
        }
        &.race {
          order: 4;
        }
        text-align: center;
        p {
          font-style: normal;
          font-weight: 600;
          font-size: 18px;
          line-height: 22px;
          color: #2e305c;
          margin-top: 16px;
        }
      }
    }
  }
  @media screen and (max-width: 768px) {
    .vm--modal {
      width: 85% !important;
    }
    .modal-content {
      padding: 20px 20px 0;
      .heading {
        font-size: 21px;
        line-height: 25px;
        margin-bottom: 24px;
      }
      .body {
        flex-wrap: wrap;
        .item {
          &.challenge {
            order: 1;
          }
          &.race {
            order: 2;
          }
          &.pick-3 {
            order: 3;
          }
          &.pick-5 {
            order: 4;
          }
          margin-bottom: 24px;
          width: 50%;
          img {
            width: 72px;
          }
          p {
            font-size: 11.5629px;
            line-height: 14px;
            margin-top: 10px;
          }
        }
      }
    }
  }
}
.support-ticket-video-modal {
  .vm--modal {
    width: 70% !important;
  }
  .modal-content {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
  @media screen and (max-width: 768px) {
    .vm--modal {
      width: 85% !important;
    }
  }
}
.my-pending-picks-detail-modal {
  .vm--modal {
    height: fit-content !important;
  }
  .modal-content {
    height: 100%;
    padding: 15px;
    .header {
      display: flex;
      justify-content: space-between;
      margin: 0px 0px 20px;
      @media screen and (max-width: 1025px) {
        padding: 5px 2px !important;
        margin-bottom: 10px;
      }
      .date-time {
        font-style: normal;
        font-weight: 500;
        font-size: 18px;
        line-height: 22px;
        color: #000000;
      }
      img {
        cursor: pointer;
        width: 22px;
        height: 22px;
      }
    }
    .body {
      h3 {
        margin-bottom: 10px;
        margin-top: 10px;
        font-weight: 500;
      }
      table {
        background: #ffffff;
        border-spacing: 0;
        border-collapse: separate;
        width: 100%;
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
            &:nth-child(even) {
              background: #fff;
            }
            &:nth-child(odd) {
              background: #f1f1f1;
            }
            th {
              font-style: normal;
              font-weight: 500;
              font-size: 15px;
              line-height: 15px;
              white-space: nowrap;
              /* identical to box height */

              text-transform: capitalize;

              color: #000000;
              padding: 15px;
              text-align: left;
              @media screen and (max-width: 767px) {
                font-size: 14px !important;
              }
            }
          }
        }
        tbody {
          tr {
            &:nth-child(even) {
              background: #fff;
            }
            &:nth-child(odd) {
              background: #f1f1f1;
            }
            td {
              padding: 15px;
              white-space: nowrap;
              @media screen and (max-width: 959px) {
                font-size: 14px !important;
              }
              div {
                display: flex;
                align-items: center;
                gap: 8px;
                span {
                  font-style: normal;
                  font-size: 15px;
                  line-height: 15px;
                  @media screen and (max-width: 959px) {
                    font-size: 14px !important;
                  }
                  &.title {
                    font-weight: 500;
                    color: #000000;
                    /* identical to box height */
                    text-transform: capitalize;
                  }
                  &.value {
                    font-weight: 500;
                    color: #000000;
                  }
                }
                .donetik {
                  width: 22px;
                }
              }
            }
          }
        }
      }
    }
  }
  @media screen and (max-width: 768px) {
    .vm--modal {
      width: 85% !important;
    }
    .modal-content {
      padding: 8px;
    }
  }
}
.my-pending-picks-delete-modal {
  .vm--modal {
    width: 45% !important;
    height: fit-content !important;
  }
  .modal-content {
    padding: 55px 165px;
    text-align: center;
    .heading {
      font-style: normal;
      font-weight: 400;
      font-size: 28px;
      line-height: 34px;
      color: #2e305c;
      margin-top: 16px;
    }
    .info {
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 21px;
      color: #000;
      margin-top: 16px;
    }
    .btn {
      display: block;
      border-radius: 4px;
      font-style: normal;
      font-weight: 500;
      font-size: 16px;
      line-height: 19px;
      text-transform: uppercase;
      padding: 22.5px;
      cursor: pointer;
      margin-top: 14px;
      height: auto;
      &.btn-yes {
        color: #ffffff;
        background: #fa8c28;
        &:hover {
          opacity: 0.8;
        }
      }
      &.btn-no {
        color: #2e305c;
        &:hover {
          opacity: 0.8;
          background: #f0f0f0;
        }
      }
    }
  }
  @media screen and (max-width: 768px) {
    .vm--modal {
      width: 85% !important;
    }
    .modal-content {
      padding: 40px 24px;
      img {
        width: 80px;
        height: 80px;
      }
      .heading {
        font-size: 24px;
      }
      .info {
        font-size: 12px;
      }
      .btn {
        font-size: 12px;
        padding: 12px;
      }
    }
  }
}
</style>
