<template>
  <div class="tell-friends-block">
    <default-notification v-if="error" :message="error" :msg-class="msgClass" />
    <form class="tell-friends" @submit.prevent="formSubmit">
      <div class="form-fields">
        <span><img src="@/assets/image/user.png" alt="user" /></span>
        <input
          v-model.trim="form.name"
          type="text"
          class="custom-input"
          placeholder="Name"
        />
      </div>
      <div class="form-fields">
        <span><img src="@/assets/image/email.png" alt="email" /></span>
        <input
          v-model.trim="form.email"
          type="text"
          class="custom-input"
          placeholder="Enter your friends email"
        />
      </div>
      <button type="submit" :class="{ disabled: isLoading }">
        Tell Your friends
      </button>
    </form>
  </div>
</template>
  
  <script>
import DefaultNotification from "./DefaultNotification.vue";
export default {
  name: "TellFriends",
  components: { DefaultNotification },
  data() {
    return {
      form: {
        name: "",
        email: "",
      },
      isLoading: false,
      error: null,
      msgClass: null,
    };
  },
  methods: {
    async formSubmit() {
      this.isLoading = true;
      try {
        if (this.formValidate()) {
          this.error = null;
          await this.$axios
            .$post("/user/refer-friend", { ...this.form })
            .then((response) => {
              this.msgClass = "is-green";
              this.error = response.data;
              this.form = {
                name: "",
                email: "",
              };
              const self = this;
              setTimeout(function () {
                self.$router.push({ path: "/refer-friend" });
              }, 3000);
            })
            .catch((exception) => {
              this.msgClass = "is-danger";
              this.error =
                exception?.response?.data?.data ??
                exception?.response?.data?.message;
            });
        }
      } catch (e) {
        this.msgClass = "is-danger";
        this.error = e.response?.data?.message;
      }
      this.isLoading = false;
    },
    formValidate() {
      let returnData = true;
      let errorMessage = "";

      // Name Validations
      if (!this.form.name) {
        returnData = false;
        errorMessage = "Name should not be blank";
      } else if (this.form.name.length > 100) {
        returnData = false;
        errorMessage =
          "Name is too long. It should have 100 characters or less";
      }

      // Email Validations
      const mailformat = /^\w+([!#$%&'*+-/=?^_`{|}~.]?\w+)*@\w+([.-]?\w+)*(\.\w{2,5})+$/;

      if (!this.form.email) {
        returnData = false;
        errorMessage += errorMessage ? " ," : "";
        errorMessage += "Email should not be blank";
      } else if (!this.form.email.match(mailformat)) {
        returnData = false;
        errorMessage += errorMessage ? " ," : "";
        errorMessage += `The email "${this.form.email}" is not a valid email`;
      }
      this.error = errorMessage;
      this.msgClass = errorMessage ? "is-danger" : "";
      return returnData;
    },
  },
};
</script>
  
<style lang="scss" scoped>
.tell-friends-block {
  margin-bottom: 16px;
  background: #ffffff;
  border: 1px solid #e0e0e0;
  padding: 12px;
  border-radius: 8px;
  .tell-friends {
    display: flex;
    display: -webkit-flex;
    align-items: center;
    -webkit-align-items: center;
    .form-fields {
      display: flex;
      display: -webkit-flex;
      align-items: center;
      -webkit-align-items: center;
      width: 100%;
      border: 1px solid #e0e0e0;
      padding: 5px 10px;
      span {
        width: 100%;
        max-width: 22px;
        min-width: 22px;
        line-height: 0px;
        margin-right: 15px;
        opacity: 0.3;
        img {
          max-width: 100%;
        }
      }
      input.custom-input {
        width: 100%;
        border: none;
        outline: none;
        box-shadow: none;
        height: 30px;
        font-size: 16px;
      }
    }
    .form-fields + .form-fields {
      margin-left: 10px;
      @media all and (max-width: 767px) {
        margin-left: 0;
        margin-top: 10px;
      }
    }
    button {
      background-color: #666dff;
      border-radius: 4px;
      white-space: nowrap;
      padding: 9px 20px;
      color: #fff;
      font-size: 16px;
      text-transform: capitalize;
      height: 42px;
      margin-left: 10px;
      @media all and (max-width: 767px) {
        margin-left: 0;
        margin-top: 10px;
        width: 100%;
        font-weight: 600;
      }
      &.disabled {
        background-color: #b3b7fd;
        cursor: not-allowed;
        color: rgba(0, 0, 0, 0.3);
        pointer-events: none;
      }
    }
    // a {
    //   @media all and (max-width: 767px) {
    //     width: 100%;
    //   }
    // }
    @media all and (max-width: 767px) {
      flex-wrap: wrap;
      -webkit-flex-wrap: wrap;
    }
  }
}
</style>
  