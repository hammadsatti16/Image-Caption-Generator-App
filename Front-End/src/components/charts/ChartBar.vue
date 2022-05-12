<template>
  <BarChart
    :chart-data="data"
    :options="options"
    css-classes="chart-container"
  />
</template>

<script lang="ts">
import { ref, computed, defineComponent } from "vue";
import { BarChart } from "vue-chart-3";

import {
  Chart,
  BarController,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
Chart.register(BarController, CategoryScale, LinearScale, BarElement);

export default defineComponent({
  components: {
    BarChart,
  },
  setup() {
    const dataValues = ref([
      [1, 3, 5, 7, 2, 4, 6],
      [1, 5, 2, 6, 3, 7, 4],
    ]);
    const data = computed(() => ({
      labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      datasets: [
        {
          label: "Foo",
          data: dataValues.value[0],
          backgroundColor: "#FABA18",
        },
        {
          label: "Bar",
          data: dataValues.value[1],
          backgroundColor: "#364FCC",
        },
      ],
    }));
    const options = ref({
      plugins: {
        title: {
          text: "Bar",
        },
      },
    });

    return {
      data,
      options,
    };
  },
});
</script>
