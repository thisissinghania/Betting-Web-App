<template>
  <div class="slider">
    <!-- <img src="@/assets/icon/arrow-left.svg" alt="arrow left" /> -->
    <font-awesome-icon
      :class="activeNav == 0 ? 'disabled' : ''"
      icon="fa-solid fa fa-arrow-left"
      @click="goSlider(-1)"
    />
    <a
      v-for="(nav, index) in getLeagues"
      :key="index"
      :class="`${nav.urlSlug === getCurrentLeague() ? 'active' : ''} ${
        index >= startIndexL && index < endIndexL ? 'mob-item' : ''
      }`"
      :href="generateUrl(nav.urlSlug)"
    >
      {{ nav.titleDsp }}
    </a>
    <!-- <img src="@/assets/icon/arrow-right.svg" alt="arrow right" /> -->
    <font-awesome-icon
      :class="activeNav == leagues.length - 1 ? 'disabled' : ''"
      icon="fa-solid fa fa-arrow-right"
      @click="goSlider(1)"
    />
  </div>
</template>

<script>
export default {
  name: 'DefaultSlider',
  props: {
    type: String,
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
      window.location.href = this.generateUrl(
        this.leagues[parseInt(this.activeNav) + param].urlSlug
      )
    },
    generateUrl(urlSlug) {
      return '/' + urlSlug + '/' + this.type
    },
    getCurrentLeague() {
      if (this.$route.params.league) {
        return this.$route.params.league
      } else {
        return this.getLeagues[0].urlSlug
      }
    },
  },
  computed: {
    getLeagues() {
      const leagues =
        this.$route.name === 'league-computer-picks' || this.$route.name === 'computer-picks-with-type'
          ? this.$store.getters['default/getComputerLeagues']
          : this.$store.getters['default/getLeagues']

      const finalLeagues = []

      leagues.forEach((league) => {
        if (
          ![
            'league-scores-with-league',
            'league-scores-with-type',
            'league-scores-type',
            "consensus-picks-with-type",
            "league-consensus-picks"
          ].includes(this.$route.name) ||
          (league.urlSlug !== 'next-30' && league.urlSlug !== 'live')
        ) {
          finalLeagues.push(league)
        }
      })

      return finalLeagues;
    },
  },
  created() {
    this.leagues = this.getLeagues
    for (const league in this.getLeagues) {
      if (this.getLeagues[league].urlSlug === this.getCurrentLeague()) {
        this.activeNav = league

        if (league >= 5) {
          this.startIndexL = league - 4
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
