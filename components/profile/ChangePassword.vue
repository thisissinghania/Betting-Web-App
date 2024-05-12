<template>
  <div class="change-password">
    <h1 class="header">Change password</h1>
    <div class="form">
      <DefaultNotification :message="error" v-if="error" :msgClass="msgClass" />
      <v-form
        @submit.prevent="formSubmit"
        class="custom-form"
        v-model="valid"
        ref="form"
        lazy-validation
      >
        <v-text-field
          v-model="form.old_password"
          :rules="oldpasswordRules"
          label="Your old password"
          filled
          class="custom-input"
          :type="show_pwd_old ? 'text' : 'password'"
          :append-icon="show_pwd_old ? 'mdi-eye-off' : 'mdi-eye'"
          @click:append="show_pwd_old = !show_pwd_old"
        ></v-text-field>
        <v-text-field
          v-model="form.new_password"
          :rules="newpasswordRules"
          label="New password"
          filled
          class="custom-input"
          :type="show_pwd_new ? 'text' : 'password'"
          :append-icon="show_pwd_new ? 'mdi-eye-off' : 'mdi-eye'"
          @click:append="show_pwd_new = !show_pwd_new"
        ></v-text-field>
        <v-text-field
          v-model="form.con_new_password"
          :rules="cnfnewpasswordRules"
          label="Re-type new password"
          filled
          class="custom-input"
          :type="show_pwd_new2 ? 'text' : 'password'"
          :append-icon="show_pwd_new2 ? 'mdi-eye-off' : 'mdi-eye'"
          @click:append="show_pwd_new2 = !show_pwd_new2"
        ></v-text-field>
        <v-row>
          <v-col cols="12" class="text-center">
            <button
              type="submit"
              :class="`submit-btn ${isValid ? '' : 'disabled'}`"
              @click="validate"
            >
              CHANGE PASSWORD
            </button>
          </v-col>
        </v-row>
      </v-form>
    </div>
  </div>
</template>


<script>
import DefaultNotification from '@/components/common/DefaultNotification.vue'

export default {
  name: 'ChangePassword',
  components: { DefaultNotification },
  data() {
    return {
      show_pwd_old: false,
      show_pwd_new: false,
      show_pwd_new2: false,
      form: {
        old_password: '',
        new_password: '',
        con_new_password: '',
      },
      oldpasswordRules: [],
      newpasswordRules: [],
      cnfnewpasswordRules: [],
      isValid: true,
      error: null,
      msgClass: null,
      valid: true,
    }
  },
  watch: {
    'form.old_password'(val) {
      this.oldpasswordRules = []
    },
    'form.new_password'(val) {
      this.newpasswordRules = []
    },
    'form.con_new_password'(val) {
      this.cnfnewpasswordRules = []
    },
  },
  methods: {
    formSubmit() {
      this.addValidation()
      const self = this
      setTimeout(function () {
        if (self.$refs.form.validate()) {
          self.changePassword()
        }
      })
    },
    async changePassword() {
      try {
        if (this.$refs.form.validate()) {
          this.isValid = false
          this.error = null
          await this.$axios
            .$post('/user/changePassword', { ...this.form })
            .then((response) => {
              if (response.code === 200) {
                this.isValid = true
                this.msgClass = 'is-green'
                this.error = response.message
                const self = this
                setTimeout(function () {
                  self.$router.push({ path: '/' })
                }, 2000)
              } else {
                this.isValid = true
                this.error = response.data.message
                this.msgClass = 'is-danger'
              }
            })
            .catch((exception) => {
              this.isValid = true
              this.msgClass = 'is-danger'
              this.error = exception.response.data.message
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
      this.oldpasswordRules = [(v) => !!v || 'Old Password is required']
      this.newpasswordRules = [(v) => !!v || 'New Password is required']
      this.cnfnewpasswordRules = [
        (v) => !!v || 'Confirm New Password is required',
        (v) =>
          this.form.new_password === this.form.con_new_password ||
          'Password should match with confirm password',
      ]
    },
  },
  computed: {
    getProfile() {
      return this.$store.getters['profile/getProfile']
    },
  },
  head() {
    return {
      title: this.getProfile.meta.metaTitle
        ? this.getProfile.meta.metaTitle
        : "PickATM",
      meta: [
        {
          name: "description",
          content: this.getProfile.meta.metaDescription
            ? this.getProfile.meta.metaDescription
            : "PickATM",
        },
      ],
    };
  },
}
</script>

<style lang="scss" scoped>
.change-password {
  background: #ffffff;
  box-shadow: 0px 2px 34px rgba(46, 48, 92, 0.11);
  padding: 40px 32px;
  .header {
    font-style: normal;
    font-weight: 500;
    font-size: 21px;
    line-height: 25px;
    color: #000000;
  }
  .form {
    padding: 0px;
    margin-top: 30px;
    .custom-input:not(:nth-child(3)) {
      margin-bottom: 16px;
    }
    .submit-btn {
      cursor: pointer;
      display: block;
      margin-top: 32px;
      background: #fa8c28;
      border-radius: 4px;
      padding: 23px 24px;
      font-weight: 500;
      font-size: 16px;
      line-height: 19px;
      text-transform: uppercase;
      text-align: center;
      color: #ffffff;
      width: 100%;
      &.disabled {
        background-color: #eeeeee;
        cursor: not-allowed;
        pointer-events: none;
      }
    }
  }
  @media screen and (max-width: 768px) {
    padding: 40px 24px;
    .form {
      padding: 37px 0 0;
    }
  }
}
</style>
