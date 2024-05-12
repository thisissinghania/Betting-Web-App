<template>
  <div class="profile-panel">
    <DefaultNotification :message="error" v-if="error" :msgClass="msgClass" />
    <div class="header" v-if="isLoading">
      <span class="name"></span>
      <span class="edit-btn"></span>
    </div>
    <div class="content" v-else>
        <div class="header">
          <span class="name">{{ (getProfile.data) ? getProfile.data.username : '' }}</span>
          <span class="edit-btn" @click="setRightContent">Edit profile</span>
        </div>
        <div class="avatar">
          <img :src="(getProfile.data) ? getProfile.data.user_logo : ''" alt="default profile avatar" />
        </div>
        <div class="line username-field">
          <span class="key">Username</span>
          <span class="value">{{ (getProfile.data) ? getProfile.data.username : '' }}</span>
        </div>
        <div class="line email">
          <span class="key">Email address</span>
          <span class="value">{{ (getProfile.data)? getProfile.data.email : '' }}</span>
        </div>
        <div class="splitter"></div>
        <div class="bottom">
          <span class="name">Delete my account</span>
          <a class="delete-btn" href="javascript:;" @click="deleteUser">Delete</a>
        </div>
    </div>
    <div v-if="isLoading" class="notfound">
        <v-progress-circular
          color="primary"
          indeterminate
          :size="55"
          :width="8"
        ></v-progress-circular>
    </div>
  </div>
</template>

<script>
import DefaultNotification from '@/components/common/DefaultNotification.vue';

export default {
  name: 'ProfilePanel',
  components: { DefaultNotification },
  data() {
    return {
      error: null,
      msgClass: null,
      isLoading: true,
      meta: {
        metaTitle: '',
        metaDescription: '',
      },
    }
  },
  methods: {
    setRightContent() {
      this.$emit('setRightContent', 'edit-profile')
    },
    async deleteUser() {
      if (
        confirm(" By proceeding with this action, you will be initiating the permanent removal of your profile, along with all pending and completed picks that are associated with it. It is important to note that this process is irreversible and cannot be undone, meaning that you will not be able to retrieve any of the information or data that was associated with your profile after it has been deleted. \n\n In addition to the removal of your profile and associated picks, please be aware that once this process is complete, you will no longer have access to the website. This means that you will not be able to log in, view your account information, or interact with other users of the platform.")
      ) {
        try {
          this.error = null
          await this.$axios
            .$post('/user/delete', {})
            .then((response) => {
              if (response.code === 200) {
                this.msgClass = 'is-green'
                this.error = response.message
                const self = this
                setTimeout(function () {
                  self.logout()
                }, 2000)
              } else {
                this.error = response.data.message
                this.msgClass = 'is-danger'
              }
            })
            .catch((exception) => {
              this.msgClass = 'is-danger'
              this.error = exception.response.data.message
            })
        } catch (e) {
          this.isValid = true;
          this.msgClass = 'is-danger';
          this.error = e.response.data.message;
        }
      }
    },
    async logout() {
      await this.$auth.logout()
    },
  },
  async beforeMount() {
    await this.$store.dispatch('profile/apiCall');

    this.meta.metaTitle       = this.$store.getters['profile/getProfile'].meta.metaTitle;
    this.meta.metaDescription = this.$store.getters['profile/getProfile'].meta.metaDescription;
    this.isLoading            = false;
  },
  computed: {
    getProfile() {
      return this.$store.getters['profile/getProfile']
    },
  },
  head() {
    return {
      title: this.meta.metaTitle,
      meta: [
        {
          name: 'description',
          content: this.meta.metaDescription,
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
.profile-panel {
  background: #ffffff;
  box-shadow: 0px 2px 34px rgba(46, 48, 92, 0.11);
  padding: 20px;
  .notfound {
        font-weight: bold;
        text-align: center;
      }
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    @media all and (max-width: 767px) {
      padding: 0px !important;
    }
    .name {
      font-style: normal;
      font-weight: 500;
      font-size: 21px;
      line-height: 25px;

      color: #000000;
    }
    .edit-btn {
      cursor: pointer;
      background: #fa8c28;
      border-radius: 4px;
      padding: 10px 24px;
      font-style: normal;
      font-weight: 500;
      font-size: 16px;
      line-height: 19px;

      color: #ffffff;
    }
  }
  .avatar {
    margin-top: 30px;
    margin-bottom: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 100px;
      border: #ccc solid thin;
      border-radius: 200px;
      outline-offset: 8px;
    }
  }
  .line {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 32px;
    .key {
      font-weight: 500;
      font-size: 18px;
      line-height: 22px;
      /* identical to box height */
      color: rgb(41, 35, 35);
      @media all and (max-width: 380px) {
        font-size: 14px;
      }
    }
    .value {
      font-weight: 500;
      font-size: 18px;
      line-height: 22px;
      /* identical to box height */
      text-align: right;
      color: #000;

      @media all and (max-width: 380px) {
        font-size: 14px;
      }
    }
  }
  .splitter {
    width: 100%;
    height: 0;
    border-bottom: 1px solid #eeeeee;
  }
  .bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 16px;
    margin-bottom: 0px;
    .name {
      font-style: normal;
      font-weight: 400;
      font-size: 18px;

      line-height: 25px;

      color: #000000;
    }
    .delete-btn {
      cursor: pointer;
      background: #ff6666;
      border-radius: 4px;
      padding: 10px 24px;
      font-style: normal;
      font-weight: 500;
      font-size: 16px;
      line-height: 19px;
      text-decoration: none;
      color: #ffffff;
    }
  }
}
</style>
