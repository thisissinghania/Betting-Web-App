<template>
  <div :class="msgClass">
    {{ message }}
  </div>
</template>
  
  <script>
export default {
  name: 'DefaultNotification',
  props: {
    message: String,
    msgClass: String
  }
}
</script>

<style scoped>
.is-danger {
  color:red;
  margin-bottom: 10px;
}

.is-green {
  color:green;
  margin-bottom: 10px;
}
</style>