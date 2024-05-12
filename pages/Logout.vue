<template>
  <div></div>
</template>
<script>
export default {
  name: "Logout",
  beforeMount() {
    localStorage.removeItem("user");
    this.$router.push({ path: "/" });
  },
};
</script>
