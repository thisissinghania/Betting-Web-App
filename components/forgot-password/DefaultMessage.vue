<template>
  <div class="message">
    <div class="card">
      <img src="../../assets/image/padlock.svg" alt="success image" />
      <p>Your password has been reset!</p>
    </div>
    <p>
      <a href="/login">Back To Login</a>
    </p>
  </div>
</template>

<style lang="scss" scoped>
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
