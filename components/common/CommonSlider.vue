<template>
  <div class="slider">
    <!-- <img src="@/assets/icon/arrow-left.svg" alt="arrow left" /> -->
    <font-awesome-icon
      :class="activeNav == 0 ? 'disabled' : ''"
      icon="fa-solid fa fa-arrow-left"
      @click="goSlider(-1)"
    />
    <a
      v-for="(nav, index) in sliderItem"
      :key="index"
      :class="`${nav.isActive ? 'active' : ''} ${
        index >= startIndexL && index < endIndexL ? 'mob-item' : ''
      }`"
      :href="nav.urlSlug"
    >
      {{ nav.titleDsp }}
    </a>
    <!-- <img src="@/assets/icon/arrow-right.svg" alt="arrow right" /> -->
    <font-awesome-icon
      :class="activeNav == sliderItem.length - 1 ? 'disabled' : ''"
      icon="fa-solid fa fa-arrow-right"
      @click="goSlider(1)"
    />
  </div>
</template>

<script>
export default {
  name: 'CommonSlider',
  props: {
    sliderItem: Array,
  },
  data() {
    return {
      activeNav: 0,
      leagues: {},
      startIndexL: 0,
      endIndexL: 5,
    }
  },
  methods: {
    goSlider(param = 1) {
      window.location.href = this.sliderItem[parseInt(this.activeNav) + param].urlSlug
    },
  },
  computed: {
    
  },
  created() {
    for (const item in this.sliderItem) {
      if (this.sliderItem[item].isActive) {
        this.activeNav = item

        if (item >= 5) {
          this.startIndexL = item - 4
          this.endIndexL = this.startIndexL + 5
        }
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.slider {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 20px 16px;
  // gap: 18px;
  height: 64px;
  background: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  user-select: none;
  svg {
    color: #000;
    cursor: pointer;
    &.disabled {
      color: #939393;
      cursor: not-allowed;
      pointer-events: none;
    }
  }
  a {
    text-decoration: none;
    padding: 4.5px 12px;
    border-radius: 100px;
    font-style: normal;
    font-weight: 600;
    font-size: 12px;
    line-height: 15px;
    color: #000;
    cursor: pointer;
    &.active {
      background-color: #fa8c28;
      color: #ffffff;
    }
  }
  img {
    cursor: pointer;
  }
  @media screen and (max-width: 768px) {
    a {
      &:not(.mob-item) {
        display: none;
      }
    }
  }
}

.svg-inline--fa {
  display: var(--fa-display, inline-block);
  height: 1em;
  overflow: visible;
  vertical-align: -0.125em;
}
</style>
