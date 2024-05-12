<template>
  <div class="change-password">
    <div class="header">
      <h1>Pick<span>ATM</span></h1>
    </div>
    <div class="body">
      <password
        v-if="isTokenValid"
        :password="password"
        @changePassword="changePassword"
      />
      <div v-if="error" class="message">
        <div class="card">
          <img src="../../assets/image/padlock.svg" alt="success image" />
          <p>{{ error }}</p>
        </div>
        <p>
          <a href="/login">Back To Login Page</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import Password from "@/components/forgot-password/DefaultPassword.vue";

export default {
  name: "ChangePassword",
  components: {
    Password,
  },
  layout: "empty",
  data() {
    return {
      isTokenValid: false,
      email: "",
      password: "",
      error: null,
    };
  },
  async fetch() {
    try {
      await this.$axios
        .$get("/reset-password/reset/" + this.$route.params.token)
        .then((response) => {
          if (response.code === 200) {
            this.isTokenValid = true;
          } else {
            this.error = response.message;
          }
        });
    } catch (e) {
      this.error = e.response.data.message;
    }
  },
  methods: {
    changePassword: function (password) {
      this.password = password;
    },
  },
};
</script>

<style lang="scss" scoped>
.change-password {
  .header {
    background: #2e305c;
    h1 {
      font-style: normal;
      font-weight: 400;
      font-size: 24px;
      line-height: 29px;
      /* identical to box height */
      padding: 22px 0;
      text-align: center;
      color: #ffffff;
      span {
        color: #fa8c28;
        font-weight: 800;
      }
    }
  }
  .body {
    background: #ffffff;
  }
}

.message {
  padding: 155px 0 157px;
  .card {
    max-width: 448px;
    background: #ffffff;
    box-shadow: 0px 2px 34px rgba(46, 48, 92, 0.11);
    margin: 0 auto 32px;
    padding: 80px 24px;
    img {
      display: block;
      margin: 0 auto;
      margin-bottom: 16px;
    }
    p {
      font-style: normal;
      font-weight: 400;
      font-size: 21px;
      line-height: 25px;
      text-align: center;

      color: #2e305c;
      text-align: center;
    }
  }
  p {
    text-align: center;
    a {
      font-style: normal;
      font-weight: 600;
      font-size: 14px;
      line-height: 17px;
      /* identical to box height */

      text-decoration-line: underline;

      color: #2e305c;
    }
  }
  @media screen and (max-width: 768px) {
    padding: 155px 16px 157px;
  }
}
</style>
