<template>
  <div class="tq-message">
    <div class="header">
      <h1>Pick<span>ATM</span></h1>
    </div>
    <div class="body">
      <message :msg="msg" />
    </div>
  </div>
</template>
    
<script>
import Message from '@/components/common/DefaultMessage.vue'

export default {
  name: 'ForgetPassword',
  layout: 'empty',
  components: {
    Message,
  },
  data() {
    return {
        msg: this.$route.query.msg
    }
  },
  methods: {},
}
</script>
    
<style lang="scss" scoped>
.tq-message {
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
    