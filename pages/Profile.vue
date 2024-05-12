<template>
  <div class="profile">
    <!-- <p class="header-nav-link">Home > <span>Profile</span></p> -->
    <div class="body">
      <div class="left">
        <div class="left-content">
          <div
            :class="`tag profile-tag ${
              rightContent === 'profile-panel' ? 'active' : ''
            }`"
            @click="setRightContent('profile-panel')"
          >
            <img src="@/assets/icon/default-avatar.svg" alt="default avatar" />
            <span>Profile</span>
          </div>
          <div class="splitter"></div>
          <div
            :class="`tag change-password-tag ${
              rightContent === 'change-password' ? 'active' : ''
            }`"
            @click="setRightContent('change-password')"
          >
            <img src="@/assets/icon/lock-small.svg" alt="lock small" />
            <span>Change password</span>
          </div>
        </div>
      </div>
      <client-only>
        <div class="right">
          <profile-panel
            v-if="rightContent === 'profile-panel'"
            @setRightContent="setRightContent"
          />
          <change-password v-else-if="rightContent === 'change-password'" />
          <edit-profile v-else />
        </div>
      </client-only>
    </div>
  </div>
</template>

<script>
import ProfilePanel from "@/components/profile/ProfilePanel.vue";
import ChangePassword from "@/components/profile/ChangePassword.vue";
import EditProfile from "@/components/profile/EditProfile.vue";

export default {
  name: "Profile",
  middleware: "auth-user",
  components: {
    ProfilePanel,
    ChangePassword,
    EditProfile,
  },
  data() {
    return {
      rightContent: "profile-panel",
    };
  },
  methods: {
    setRightContent(content) {
      this.rightContent = content;
    },
  },
};
</script>

<style lang="scss" scoped>
.profile {
  background: #d8d8d8;
  padding: 32px 252px;

  .header-nav-link {
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    color: #000;

    span {
      color: #2e305c;
    }
  }
  .body {
    margin-top: 0px;
    display: flex;
    justify-content: center;
    .left {
      max-width: 400px;
      width: 100%;
      .left-content {
        background: #ffffff;
        margin-right: 33px;
        & .tag {
          cursor: pointer;
          color: #000;
          font-size: 16px;
          padding: 20px 20px;
          display: flex;
          align-items: center;
          gap: 6px;

          img {
            margin-right: 10px;
          }
          &.active {
            color: #fa8c28;
          }
          @media all and (max-width: 767px) {
            padding: 10px 20px;
          }
        }
        .splitter {
          height: 0;
          margin: 0;
          border-bottom: 1px solid #eeeeee;
        }
      }
    }
    .right {
      max-width: 600px;
      width: 100%;
      padding-bottom: 0px;
    }
  }
  @media screen and (max-width: 767px) {
    padding: 32px 16px 0;
    .body {
      display: block;
      .left,
      .right {
        margin-bottom: 24px;
        max-width: 100%;
        .left-content {
          margin-right: 0;
        }
      }
    }
  }
}
</style>
