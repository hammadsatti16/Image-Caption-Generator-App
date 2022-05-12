<template>
  <q-btn
    v-if="icon && icon.length"
    v-bind="$attrs"
    no-caps
    :color="$attrs.color ? $attrs.color : 'primary'"
    :icon="icon.includes('rhc') ? svgAddress + icon : icon"
  >
    <slot></slot>
  </q-btn>
  <q-btn
    v-else
    v-bind="$attrs"
    no-caps
    :color="$attrs.color ? $attrs.color : 'primary'"
  >
    <slot></slot>
  </q-btn>
</template>

<script lang="ts" setup>
import { ref } from "vue";

defineProps<{
  icon: string;
}>();

const svgAddress = ref(process.env.VUE_APP_SVG_ADDRESS);
</script>
