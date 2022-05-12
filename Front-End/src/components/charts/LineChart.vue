<template>
  <LineChart
    :chart-data="data"
    :options="options"
    css-classes="chart-container"
  />
</template>

<script lang="ts">
import { ref, computed, defineComponent } from "vue";
import { LineChart } from "vue-chart-3";
import {
  Chart,
  LineController,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";
Chart.register(
  LineController,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
);

export default defineComponent({
  components: {
    LineChart,
  },
  setup() {
    const dataValue1 = ref([12, 14, 16, 18, 11, 13, 15]);
    const dataValue2 = ref([10, 11, 13, 15, 17, 19, 21]);
    const data = computed(() => ({
      labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      datasets: [
        {
          label: "Foo",
          data: dataValue1.value,
          backgroundColor: "#dc322f",
        },
        {
          label: "Foo",
          data: dataValue2.value,
          backgroundColor: "#dc322f",
        },
      ],
    }));
    const options = ref({
      plugins: {
        title: {
          text: "Line",
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
