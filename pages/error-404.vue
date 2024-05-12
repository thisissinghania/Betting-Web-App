<template>
  <div class="error-page">
    <div class="middle-panel">
      <div class="centerbox">
        <!-- <img src="@/assets/icon/404.svg" alt="404" /> -->
        <img src="@/assets/icon/orange-404.svg" alt="404" />
        <h2>Page Not Found!</h2>
        <p>Dude, we can't find that page!</p>
        <a href="/" class="backhome">Back to home</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Error",
  layout: "default",
};
</script>

<style lang="scss" scoped>
.error-page {
  display: flex;
  justify-content: space-between;
  padding: 24px 32px;
  gap: 24px;
  background-color: #ececec;
  .middle-panel {
    .centerbox {
      width: 100%;
      max-width: 600px;
      margin: auto;
      padding: 15px;
      text-align: center;

      img {
        width: 100%;
      }

      h2 {
        font-size: 30px;
        margin-top: 30px;
        text-transform: uppercase;
      }
      p {
        font-size: 18px;
        margin-top: 14px;
      }
      a.backhome {
        display: inline-block;
        background: #fa8c28;
        padding: 10px 15px;
        margin-top: 16px;
        border-radius: 5px;
        color: #fff;
        text-decoration: none;
      }
    }
  }
}
</style>
