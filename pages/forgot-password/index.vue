<template>
  <div class="forgot-password">
    <div class="header">
      <h1>Pick<span>ATM</span></h1>
    </div>
    <div class="body">
      <email :email="email" @changeEmail="changeEmail" />
    </div>
  </div>
</template>

<script>
import Email from '@/components/forgot-password/DefaultEmail.vue'

export default {
  name: 'ForgetPassword',
  layout: 'empty',
  components: {
    Email,
  },
  data() {
    return {
      email: '',
    }
  },
  methods: {
    changeEmail: function (email) {
      this.email = email
    },
  },
}
</script>

<style lang="scss" scoped>
.forgot-password {
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
</style>
