<template>
  <client-only>
    <span
      >Time Remaining to Enter Pick:
      {{ hours % 24 < 10 ? "0" + (hours % 24) : hours % 24 }}:{{
        minutes % 60 < 10 ? "0" + (minutes % 60) : minutes % 60
      }}:{{ seconds % 60 < 10 ? "0" + (seconds % 60) : seconds % 60 }}</span
    >
  </client-only>
</template>

<script>
import { toRef, ref } from "vue";

export default {
  name: "TimerSecondHalf",
  props: ["secondhalfendtime"],
  setup(props) {
    const hours             = ref(0)
    const minutes           = ref(0)
    const seconds           = ref(0)
    const secondhalfendtime = toRef(props, 'secondhalfendtime')
    const lunchDate         = new Date(secondhalfendtime.value)
    let startedReload       = true;

    setInterval(() => {
      const currentDate = new Date()
      const lunchTime = lunchDate - currentDate

      if (parseInt(lunchTime / 1000) % 60 >= 0) {
        seconds.value = parseInt(lunchTime / 1000)
        minutes.value = parseInt(seconds.value / 60)
        hours.value   = parseInt(minutes.value / 60)
      } else {
        seconds.value = 0
        minutes.value = 0
        hours.value   = 0
      }

      if (minutes.value === 0 && seconds.value === 0 && startedReload) {
        startedReload = false;
        window.location.reload();
      }
    }, 1000);

    return { hours, minutes, seconds }
  },
};
</script>
