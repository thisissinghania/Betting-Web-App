<template>
  <div class="t-c">
    <left-panel />
    <div class="middle-panel">
      <h1 class="heading">How it Works</h1>
      <p class="content">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum.
      </p>

      <h1 class="heading">Where does it come from?</h1>
      <p class="content">
        Contrary to popular belief, Lorem Ipsum is not simply random text. It
        has roots in a piece of classical Latin literature from 45 BC, making it
        over 2000 years old. Richard McClintock, a Latin professor at
        Hampden-Sydney College in Virginia, looked up one of the more obscure
        Latin words, consectetur, from a Lorem Ipsum passage, and going through
        the cites of the word in classical literature, discovered the
        undoubtable source.
      </p>
      <p class="video">
        <iframe
          width="100%"
          height="550"
          src="https://www.youtube.com/embed/9xwazD5SyVg"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
      </p>
    </div>
    <right-panel />
  </div>
</template>

<script>
import LeftPanel from "@/components/common/LeftPanel.vue";
import RightPanel from "@/components/common/RightPanel.vue";
export default {
  name: "About",
  components: {
    LeftPanel,
    RightPanel,
  },
};
</script>

<style lang="scss" scoped>
.t-c {
  display: flex;
  justify-content: space-between;
  padding: 24px 32px;
  gap: 24px;
  background-color: #ececec;

  .middle-panel {
    padding: 16px;
    background: #ffffff;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    height: fit-content;
    h1.heading {
      font-style: normal;
      font-weight: 700;
      font-size: 24px;
      line-height: 29px;
      /* identical to box height */
      color: #2e305c;
      margin: 24px 0;
    }
    h1.title {
      font-style: normal;
      font-weight: 700;
      font-size: 16px;
      color: #2e305c;
      margin-bottom: 12px;
    }
    p.content {
      font-style: normal;
      font-weight: 400;
      font-size: 15px;
      line-height: 24px;
      color: #000;
      margin-bottom: 24px;
      span.link-here {
        text-decoration: underline;
        cursor: pointer;
        color: #2e305c;
      }
    }
    .video {
      iframe {
        aspect-ratio: 2;
        height: 100%;
      }
    }
  }
  @media screen and (max-width: 768px) {
    padding: 16px;
    .middle-panel {
      min-width: 100%;
      width: 100%;
    }
  }
}
</style>
