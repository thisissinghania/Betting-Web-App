<template>
  <div class="fixed">
    <!-- <div id="topheader">
      <div class="termstext">
        By accessing this site you agree to our
        <a href="/privacy" class="privacy">privacy policy</a> and
        <a href="/terms" class="privacy">terms of use</a>.
        <a href="/" class="accept">Accept</a>
      </div>
      <span class="mobile-view"
        >You agree to our privacy policy and terms of use.
        <a href="/" class="accept">Accept</a></span
      >
    </div> -->
    <div class="header">
      <div class="top-bar">
        <div :class="{ brand: true, auth: $auth.loggedIn }">
          <a href="/" class="mobileLogo" :title="getTypeConfig('homepage_logo_alt_tag')" v-html="getTypeConfig('homepage_header_text_desktop')"></a>
        </div>
        <div class="top-nav-wrapper">
          <div class="mobileMenu">
            <img
              class="mobile-menu"
              src="@/assets/icon/mobile-menu.png"
              alt="mobile menu"
              @click="showMobileMenu = true"
            />
            <a
              href="/"
              :v-html="getTypeConfig('homepage_header_text_mobile')"
            ></a>
          </div>
          <div v-if="!$auth.loggedIn" class="top-nav guest">
            <a href="/chat-room" class="chatRoom desktop">
              <span>OPEN CHAT ROOM</span>
              <img src="@/assets/icon/comment.svg" alt="comment icon" />
            </a>

            <a
              class="about-link desktop"
              style="cursor: pointer"
              @click="showModal('hows')"
              title="Learn how this website works"
            >
              <span> how does this work </span>
              <img src="@/assets/icon/questn.svg" alt="svg icon" />
            </a>
            <a
              href="/login"
              class="login-link"
              :title="getTypeConfig('homepage_login_btl_alt_tag')"
              >login</a
            >
            <!-- <a
              href="/signup"
              class="signup-link"
              :title="getTypeConfig('homepage_signup_btl_alt_tag')"
              >sign up</a
            > -->
            <a
              class="questions mobile"
              style="cursor: pointer"
              @click="showModal('hows')"
            >
              <img src="@/assets/icon/question.svg" alt="svg icon" />
            </a>
            <a href="/chat-room" class="chatRoom mobile">
              <img src="@/assets/icon/comment.svg" alt="comment icon" />
            </a>
          </div>
          <div v-else class="top-nav auth">
            <div class="daily-revenue">
              <div class="title">Daily Page Revenue:</div>
              <span>{{ ($auth.loggedIn && rewards != '') ? rewards : '' }}</span>
              <div class="icon">
                <span>&#9432;</span>
                <div class="revenue-info" v-html="adminPopup('Daily Page View Revenue')">

                </div>
              </div>
            </div>
            <a class="logout" @click="logout">
              <span>LOGOUT</span>
            </a>
            <div :class="{ brand: true, auth: this.$auth.loggedIn }">
              <a class="mob-link profilenew" :href="linkWithTimeStamp('/profile/')">
                <!-- <img src="@/assets/icon/round-user.svg" alt="round user" /> -->
                <div class="newprofile">
                  <img :src="$auth.user.user_logo" alt="round user" />
                </div>
              </a>
            </div>
            <a class="link mob-item profilenew" :href="linkWithTimeStamp('/profile/')">
              <!-- <img src="@/assets/icon/round-user.svg" alt="round user" /> -->
              <div class="newprofile">
                <img :src="$auth.user.user_logo" alt="round user" />
              </div>
            </a>
          </div>
        </div>
      </div>
      <div :class="`nav ${showMobileMenu ? 'show-mobile' : ''}`">
        <div class="menus">
          <div class="logo-mobile">
            <a
              href="/"
              v-html="getTypeConfig('homepage_header_text_mobile')"
              :title="getTypeConfig('homepage_logo_alt_tag')"
            ></a>
          </div>
          <li
            v-for="(link, index) in links"
            :key="'menu-link-' + index"
            :class="[
              $route.path === link.to ? 'router-link-active' : '',
              [link.class ? link.class : ''],
              $route.name && $route.name.includes(link.matchingPrefix)
                ? 'router-link-active'
                : '',
              checkIsActive(link.activeRouteName),
            ]"
            @click="toggleDropdown($event)"
          >
            <a :href="link.to">
              {{ link.title }}
            </a>
            <ul v-if="link.childNav" class="submenu">
              <li
                v-for="(subLink, i) in link.childNav"
                :key="'sub-menu-link-' + i"
              >
                <a :href="subLink.to">{{ subLink.title }}</a>
              </li>
            </ul>
          </li>
        </div>
        <div class="backdrop" @click="showMobileMenu = false"></div>
      </div>

      <client-only>
        <modal
          class="my-custom-modal my-pending-picks-detail-modal"
          name="hows-modal"
        >
          <div class="modal-content">
            <div class="modal-header header">
              <img
                src="@/assets/icon/cross-gray.png"
                alt="cross"
                @click="hideModal('hows')"
              />
            </div>
            <iframe
              width="100%"
              height="450"
              src="https://www.youtube.com/embed/yAoLSRbwxL8"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
              class="ratiomobile"
            ></iframe>
          </div>
        </modal>
      </client-only>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "DefaultHeader",
  data() {
    return {
      showMobileMenu: false,
      links: [
        { title: "HOME", to: "/", matchingPrefix: "league-picks" },
        { title: "MY PICKS", to: "/my-picks?t=" + new Date().getTime(), matchingPrefix: "my-picks" },
        {
          title: "BALANCE",
          to: "/balance?t=" + new Date().getTime(),
          matchingPrefix: "balance-pick-points",
          activeRouteName: [
            "balance",
            "balance-last-week",
          ],
        },
        {
          title: "LEADERS",
          to: "/leaders/challenge-picks",
          matchingPrefix: "leaders",
        },
        {
          title: "CONSENSUS",
          to: "/consensus-picks",
          matchingPrefix: "consensus-picks",
          activeRouteName: [
            "consensus-picks",
            "league-consensus-teams",
            "league-line-tracking-teams",
          ],
        },
        {
          title: "COMPUTER PICKS",
          to: "/computer-picks",
          matchingPrefix: "computer-picks",
          activeRouteName: [
            "computer-picks",
          ],
        },
        { title: "SCORES", to: "/scores", matchingPrefix: "league-scores" },
        // { title: "SPORTSBOOKS", to: "/sportsbooks" },
        { title: "WINNERS", to: "/winners" },
        { title: "CHAT", to: "/chat-room", class: "onlyMobile" },
        {
          title: "HELP",
          to: "#",
          class: "helps",
          childNav: [
            {
              title: "FAQ",
              to: "/faq",
            },
            {
              title: "RULES",
              to: "/rules",
            },
            {
              title: "SUPPORT TICKETS",
              to: "/support-ticket?t=" + new Date().getTime(),
            },
          ],
        },
      ],
    };
  },
  computed: {
    rewards() {
      return this.$store.getters["default/getRewards"];
    },
    getClient() {
      return this.$store.getters["default/getClient"];
    },
    getLeagues() {
      return this.$store.getters["default/getLeagues"];
    },
    ...mapGetters('default', ['getTypeConfigs', 'getAdminPopup']),
  },
  watch: {
    showMobileMenu(newShow) {
      if (newShow) {
        document.body.classList.add("lock-y");
      } else {
        document.body.classList.remove("lock-y");
      }
    },
  },
  methods: {
    showModal(key) {
      // this.$modal.show(key + "-modal");
      window.location = "/how-does-this-work";
    },
    hideModal(key) {
      this.$modal.hide(key + "-modal");
    },
    linkWithTimeStamp(link) {
      return link + "?t=" + new Date().getTime()
    },
    async logout() {
      await this.$auth.logout();
      document.cookie = 'jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      document.cookie = 'jwt_refresh=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
      document.cookie = 'tokenExpiration=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
      document.cookie = 'userData=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
      document.cookie = 'auth._token.local=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
      document.cookie = 'auth._refresh_token.local=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'

      if (process.client) {
          localStorage.removeItem('refresh');
          localStorage.removeItem('token');
          localStorage.removeItem("tokenExpiration");
          localStorage.removeItem("userData");
          localStorage.removeItem("auth._refresh_token.local");
          localStorage.removeItem("auth._token.local");
      }
    },
    toggleDropdown(event) {
      event.currentTarget.classList.toggle("is-active");
    },
    getLeaguesMethod() {
      return this.getLeagues();
    },
    getTypeConfig(name) {
      for (const typeConfig in this.getTypeConfigs) {
        if (this.getTypeConfigs[typeConfig].field_name === name) {
          return this.getTypeConfigs[typeConfig].field_value;
        }
      }

      return "";
    },
    adminPopup(name) {
      for (const typeConfig in this.getAdminPopup) {

        if (this.getAdminPopup[typeConfig].name === name) {
          return this.getAdminPopup[typeConfig].content;
        }
      }

      return "";
    },
    checkIsActive(routesArray) {
      let isActive = false;
      if (routesArray && Array.isArray(routesArray)) {
        isActive = routesArray?.includes(this.$route.name);
      }
      return isActive ? "router-link-active" : "";
    },
  },
};
</script>

<style lang="scss" scoped>
#topheader {
  background: #000000;
  padding: 12px 8px;
  text-align: center;
  .termstext {
    color: #fff;
    font-size: 13px;
    font-weight: 500;
    @media screen and (max-width: "767px") {
      display: none;
    }
    a.privacy {
      color: #fff;
      text-decoration: underline;
    }
    a.accept {
      background: #fa8c28;
      color: #fff;
      padding: 5px;
      border-radius: 4px;
      font-size: 13px;
      margin-left: 10px;
      font-weight: 400;
      text-decoration: none;

      @media screen and (max-width: "767px") {
        display: inline-block;
        margin-top: 10px;
        margin-left: 0px;
      }
    }
  }
  .mobile-view {
    color: #fff;
    font-size: 11px;
    font-weight: 500;
    display: none;
    @media screen and (max-width: "767px") {
      display: block;
    }
    a.accept {
      background: #fa8c28;
      color: #fff;
      padding: 5px;
      border-radius: 4px;
      font-size: 10px;
      margin-left: 10px;
      font-weight: 400;
      text-decoration: none;

      @media screen and (max-width: "767px") {
        display: inline-block;
        margin-top: 0px;
        margin-left: 10px;
      }
    }
  }
}
.header {
  background-color: #2e305c;
  padding: 24px 56px;

  .top-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;

    a {
      color: white;
      text-decoration: none;
    }

    .mobileMenu {
      display: none;
    }

    .chatRoom {
      display: flex;
      align-items: center;
      background-color: #fa8c28;
      padding: 7px 12px;
      border-radius: 4px;
      height: 43px;
      @media all and (min-width: 1051px) {
        display: none;
      }

      &.mobile {
        display: none;
      }

      img {
        width: 30px;
        margin-left: 8px;
      }
    }

    .questions {
      display: flex;
      align-items: center;
      background-color: #666dff;
      padding: 7px 12px;
      border-radius: 4px;

      &.mobile {
        display: none;
      }

      img {
        width: 30px;
        margin-left: 8px;
      }
    }

    .brand {
      display: flex;
      justify-content: space-around;

      a {
        font-style: normal;
        font-weight: 400;
        font-size: 24px;
        line-height: 29px;

        span {
          font-weight: 800;
          color: #fa8c28;
        }

        &.mob-link {
          display: none;
        }
      }
    }

    .top-nav-wrapper {
      display: flex;
      justify-content: space-between;

      .mobile-menu {
        cursor: pointer;
        display: none;
      }

      .logout {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        padding: 12px 24px;
        gap: 10px;
        cursor: pointer;
        height: 43px;
        border-radius: 4px;
        background: #fa8c28;
        margin-right: 10px;

        @media screen and (max-width: 767px) {
          font-size: 14px;
          padding: 10px 15px;
          font-weight: 500;
        }
      }

      .top-nav {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 0px;
        gap: 2px;

        a {
          margin-right: 10px;
        }
        &.guest {
          height: 43px;

          a {
            // font-family: 'Inter';
            font-style: normal;
            font-weight: 500;
            font-size: 16px;
            line-height: 19px;
            text-transform: uppercase;
          }

          .about-link {
            img {
              width: 30px;
              margin-left: 8px;

              @media screen and (max-width: 767px) {
                width: 18px;
              }
            }
            &.desktop {
              display: flex;
            }

            &.mobile {
              padding: 12px 14px;
              display: none;
            }

            flex-direction: row;
            justify-content: center;
            align-items: center;
            padding: 12px 9.5px;
            gap: 6px;

            height: 43px;

            background: #666dff;
            border-radius: 4px;
          }

          .login-link,
          .signup-link {
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            padding: 12px 24px;
            gap: 10px;

            height: 43px;

            border-radius: 4px;
          }

          .login-link {
            background: #515580;
            @media screen and (max-width: 1050px) {
              background: #557aff;
            }
          }

          .signup-link {
            background: #fa8c28;
          }
        }

        &.auth {
          height: 32px;

          .link {
            display: flex;
            gap: 12px;
            align-items: center;

            &.profilenew {
              position: relative;

              .newprofile {
                background: #fa8c28;
                width: 43px;
                height: 43px;
                display: block;
                overflow: hidden;
                border-radius: 5px;

                img {
                  height: 100%;
                  width: 100%;
                  object-position: top center;
                  object-fit: cover;
                }
              }
            }

            &.router-link-active {
              .active-img {
                display: block;
              }

              .inactive-img {
                display: none;
              }

              span {
                color: #fa8c28;
              }
            }

            .active-img {
              display: none;
            }
            .logout {
              height: 32px;
              padding: 12px 12px;
            }
            span {
              font-style: normal;
              font-weight: 600;
              font-size: 15px;
              line-height: 17px;
              /* identical to box height, or 113% */

              display: flex;
              align-items: center;
              text-transform: uppercase;

              color: #ffffff;
            }
          }
        }
        .daily-revenue {
          display: flex;
          display: -webkit-flex;
          align-items: center;
          -webkit-align-items: center;
          padding: 7px 15px;
          height: 43px;
          background: #fff;
          border-radius: 4px;
          border: 1px solid #0e0f16;
          margin-right: 12px;
          font-size: 16px;
          font-weight: 500;
          color: #2e305c;
          .title {
            @media all and (max-width: 600px) {
              display: none;
            }
          }
          > span {
            margin: 0 5px;
            @media all and (max-width: 600px) {
              margin: 0 5px 0 0;
            }
          }
          .icon {
            position: relative;
            > span {
              line-height: 11px;
              color: #666dff;
              cursor: pointer;
              font-weight: 600;
            }
            .revenue-info {
              position: absolute;
              width: 430px;
              left: calc(50% - 13px);
              transform: translateX(-50%);
              -webkit-transform: translateX(-50%);
              background: #000000;
              z-index: 9;
              padding: 20px;
              color: #fff;
              border-radius: 5px;
              top: 30px;
              text-align: left;
              display: none;
              &::after {
                content: "";
                position: absolute;
                border: 10px solid;
                top: -20px;
                left: calc(50% - -14px);
                transform: translateX(-50%);
                -webkit-transform: translateX(-50%);
                border-color: transparent transparent black;
                @media all and (max-width: 1050px) {
                  left: calc(50% - -5px);
                }
              }
              @media all and (max-width: 1050px) {
                width: 450px;
                left: calc(50% - 4px);
              }
            }
            &:hover {
              .revenue-info {
                display: block;
              }
            }
          }
          @media all and (max-width: 767px) {
            display: none;
          }
        }
      }
    }
  }

  .nav {
    .menus {
      display: flex;
      justify-content: space-around;
      padding-top: 24px;

      .logo-mobile {
        font-style: normal;
        font-weight: 400;
        font-size: 24px;
        line-height: 29px;
        color: #fff;
        display: none;

        @media screen and (max-width: 1050px) {
          display: block;
          padding: 20px 10px;
        }

        span {
          font-weight: 800;
          color: #fa8c28;
          text-transform: uppercase;
        }
      }

      li {
        list-style: none;
        padding: 3.5px 8px;
        transition: all 0.2s;
        position: relative;
        &.router-link-active {
          background: #fa8c28;
          border-radius: 2px;
        }

        @media screen and (max-width: 1050px) {
          padding: 0px;
        }
        @media screen and (min-width: 1051px) and (max-width: 1299px) {
          padding: 3.5px 3px;
        }
      }
      a {
        // font-family: 'Inter';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 17px;
        /* identical to box height */

        text-transform: uppercase;
        text-decoration: none;

        color: #ffffff;
        padding: 3.5px 8px;
        transition: all 0.2s;
      }
      .submenu {
        position: absolute;
        right: 0;
        background: #fff;
        border-radius: 5px;
        box-shadow: 0 4px 5px rgb(0 0 0 / 20%);
        margin-top: 10px;
        display: none;

        @media screen and (max-width: 1050px) {
          left: 0;
          right: 0;
          background: #242650 !important;
          margin-top: 0px;
        }

        li {
          list-style: none;
          display: block;
          padding: 8px 8px !important;

          @media screen and (max-width: 1050px) {
            border-bottom: #454887 solid thin;
            padding: 4px 8px !important;
          }

          &:last-child {
            border-bottom: none;
          }
        }
        a {
          color: #000000 !important;
          font-size: 14px;
          font-weight: 400;
          display: block !important;
          width: 100% !important;

          @media screen and (max-width: 1050px) {
            color: #fff !important;
          }
        }
      }
      .onlyMobile {
        display: none;
      }
      .helps {
        position: relative;
        &.is-active > ul.submenu {
          display: block;
        }

        > a:first-child {
          padding-right: 30px;
          position: relative;

          &::after {
            content: "";
            position: absolute;
            top: 50%;
            right: 10px;
            width: 0;
            height: 0;
            border-left: 5px solid transparent;
            border-right: 5px solid transparent;
            border-top: 6px solid #fff;
            display: block;
            transform: translate(0px, -50%);
            cursor: pointer;

            @media screen and (max-width: 767px) {
              right: 18px;
            }
          }
        }
      }
    }
  }

  @media screen and (max-width: 1050px) {
    padding: 24px 16px;

    .top-bar {
      display: block;

      .mobileLogo {
        display: none;
      }

      .brand {
        // padding-bottom: 24px;

        &.auth {
          justify-content: space-between;

          .mob-link {
            display: block;
            &.profilenew {
              position: relative;
              .newprofile {
                background: #fa8c28;
                width: 43px;
                height: 43px;
                display: block;
                overflow: hidden;
                border-radius: 5px;

                img {
                  height: 100%;
                  width: 100%;
                  -o-object-position: top center;
                  object-position: top center;
                  -o-object-fit: cover;
                  object-fit: cover;
                }
              }
            }
          }
        }
      }

      .mobileMenu {
        display: block;
        display: flex;
        align-items: center;

        a {
          font-style: normal;
          font-weight: 400;
          font-size: 24px;
          line-height: 29px;
          margin-left: 5px;

          span {
            font-weight: 800;
            color: #fa8c28;
          }
        }
      }

      .chatRoom {
        padding: 4px 6px;
        line-height: 0px !important;

        &.mobile {
          img {
            margin-left: 0px;
            width: 18px;
          }
        }

        &.desktop {
          display: none;
        }
      }

      .questions {
        padding: 4px 6px;
        line-height: 0px !important;

        &.mobile {
          display: block;
          @media screen and (max-width: 1050px) {
            height: 28px;
            padding-top: 5px;
          }

          img {
            margin-left: 0px;
            width: 18px;
          }
        }

        &.desktop {
          display: none;
        }
      }

      .top-nav-wrapper {
        .mobile-menu {
          display: block;
        }

        .top-nav {
          gap: 12px;

          &.guest {
            height: 32px;

            .about-link {
              height: 32px;

              &.desktop {
                display: none;
              }

              &.mobile {
                padding: 12px 12px;
                display: flex;
              }
            }

            .login-link,
            .signup-link {
              height: 28px;
              padding: 12px 12px;
            }
          }

          &.auth {
            .splitter-img {
              display: none;
            }

            .link {
              gap: 4px;

              img {
                width: 24px;
                height: 24px;
              }

              span {
                font-size: 13px;
              }

              &.mob-item {
                display: none;
              }
            }
          }
        }
      }
    }

    .nav {
      transition-duration: 0.2s;
      display: flex;
      position: fixed;
      top: 0;
      left: -250px;
      bottom: 0;
      right: 100%;
      z-index: 100;

      &.show-mobile {
        left: 0;
        right: 0;

        .backdrop {
          display: block;
        }
      }

      .menus {
        overflow-y: auto;
        // flex-direction: column;
        display: block;
        padding: 1px;
        min-width: 200px;
        background-color: #2e305c;

        a {
          display: block;
          padding: 10px 8px !important;
        }

        .onlyMobile {
          display: block;
        }
      }

      .backdrop {
        width: 100%;
        background-color: rgba(0, 0, 0, 0.8);
        display: none;
      }
    }
  }

  .my-pending-picks-detail-modal {
    .vm--modal {
      height: fit-content !important;
      width: 40% !important;
    }
    .modal-content {
      height: 100%;
      padding: 12px;
      .header {
        display: flex;
        justify-content: flex-end;
        margin-bottom: 20px;
        background: transparent;
        padding: 0;
        @media screen and (max-width: 1025px) {
          padding: 5px 2px !important;
          margin-bottom: 10px;
        }
      }
      iframe.ratiomobile {
        aspect-ratio: 2;
        height: 100%;
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

  @media screen and (max-width: 470px) {
    .login-link,
    .signup-link {
      font-size: 12px !important;
    }

    .top-nav {
      gap: 5px !important;
    }

    .about-link {
      padding: 5px !important;
      height: fit-content !important;
    }
  }
}

@media screen and (max-width: 767px) {
  .fixed {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: 9999;
  }
}
</style>
