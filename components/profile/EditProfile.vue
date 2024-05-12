<template>
  <div class="edit-profile">
    <h1 class="header">Edit Profile</h1>
    <div class="body">
      <img :src="getProfile.data.user_logo" alt="default profile avatar" />
      <DefaultNotification :message="error" v-if="error" :msgClass="msgClass" />
      <v-form
        @submit.prevent="formSubmit"
        class="custom-form"
        v-model="valid"
        ref="form"
        lazy-validation
      >
        <v-file-input
          multiple
          :rules="rules"
          accept="image/png, image/jpeg, image/jpg"
          label="Upload Profile Picture"
          v-model="form.imageFile"
        ></v-file-input>
        <v-text-field
          v-model="form.email.value"
          label="Email"
          :rules="emailRules"
          :error-messages="form.email.error"
          filled
          class="custom-input"
        ></v-text-field>
        <v-row>
          <v-col cols="12" class="text-center">
            <button
              type="submit"
              :class="`submit-btn ${isValid ? '' : 'disabled'}`"
              @click="validate"
            >
              SAVE CHANGES
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
  name: 'EditProfile',
  components: { DefaultNotification },
  data() {
    return {
      form: {
        email: {
          value: '',
          error: ''
        },
      },
      isValid: true,
      error: null,
      msgClass: null,
      valid: true,
      emailRules: [],
      rules: [],
    }
  },
  watch: {
    'form.email.value'(val) {
      this.emailRules = []
    },
    'form.imageFile'(val) {
      this.rules = []
    }
  },
  computed: {
    getProfile() {
      return this.$store.getters['profile/getProfile']
    },
  },
  methods: {
    formSubmit() {
      this.addValidation()
      const self = this
      setTimeout(function () {
        if (self.$refs.form.validate()) {
          self.update()
        }
      })
    },
    async update() {
      try {
        this.form.email.error = '';
        const formData = new FormData();
        if (typeof this.form.imageFile !== "undefined" && this.form.imageFile) {
          if (this.form.imageFile.length > 0) {
            formData.append('imageFile', this.form.imageFile[0])
          }
        }
        formData.append('email', this.form.email.value);

        if (this.$refs.form.validate()) {
          this.isValid = false
          this.error = null
          await this.$axios
            .$post(
              '/user/profile/update',
              formData,
              {
                headers: {
                  'Content-Type': 'multipart/form-data',
                  'Access-Control-Allow-Origin': '*'
                },
              }
            )
            .then((response) => {
              if (response.code === 200) {
                this.isValid = true
                this.msgClass = 'is-green'
                this.error = response.message
                setTimeout(function () {
                  location.reload();
                })
              } else if(response.errors.email) {
                  this.form.email.error = response.errors.email;
                  this.isValid = true
              } else if(response.errors.imageFile) {
                  this.isValid = true
                  this.error = response.errors.imageFile;
                  this.msgClass = 'is-danger'
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
      this.emailRules = [
        (v) => !!v || 'E-mail is required',
        (v) => /.+@.+/.test(v) || 'E-mail must be valid',
      ]
      this.rules = [
        (value) => {
          return (
            !value ||
            !value.length ||
            value[0].size < 2000000 ||
            'Avatar size should be less than 2 MB!'
          )
        },
      ]
    },
  },
  mounted() {
    this.form.email.value = this.getProfile.data.email
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
.edit-profile {
  background: #ffffff;
  box-shadow: 0px 2px 34px rgba(46, 48, 92, 0.11);
  padding: 40px 32px;
  .header {
    font-style: normal;
    font-weight: 400;
    font-size: 21px;
    line-height: 25px;

    color: #2e305c;
  }
  .body {
    padding: 10px;
    img {
      display: block;
      margin: 10px auto 35px;
      width: 100px;
      border: #ccc solid thin;
      border-radius: 200px;
      outline-offset: 8px;
    }
    .file-input-tag {
      display: block;
      text-align: center;
      cursor: pointer;
      font-style: normal;
      font-weight: 500;
      font-size: 16px;
      line-height: 19px;
      text-decoration-line: underline;
      margin-top: 16px;
      margin-bottom: 50px;
      color: #2e305c;
    }
    .custom-input:not(:nth-child(5)) {
      margin-bottom: 16px;
    }
    .submit-btn {
      display: block;
      text-align: center;
      cursor: pointer;
      margin-top: 32px;
      background: #fa8c28;
      border-radius: 4px;
      padding: 23px 24px;
      font-style: normal;
      font-weight: 500;
      font-size: 16px;
      line-height: 19px;
      text-transform: uppercase;
      width: 100%;

      color: #ffffff;
      &.disabled {
        background-color: #eeeeee;
        cursor: not-allowed;
        pointer-events: none;
      }
    }
  }
  @media screen and (max-width: 768px) {
    padding: 40px 24px;
    .body {
      padding: 37px 0 0;
    }
  }
}
</style>
