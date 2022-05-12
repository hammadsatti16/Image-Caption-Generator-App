<template>
  <q-icon
    v-if="name.includes('rhc')"
    :size="size"
    :color="color"
    :name="svgAddress + name"
  />
  <q-icon v-else :size="size" :color="color" :name="name" />
</template>

<script lang="ts" setup>
import { ref } from "vue";
defineProps<{
  name: string;
  color: string;
  size: string;
}>();

const svgAddress = ref(process.env.VUE_APP_SVG_ADDRESS);
</script>

<style>
.custom-icon {
  overflow: hidden;
}
</style>
