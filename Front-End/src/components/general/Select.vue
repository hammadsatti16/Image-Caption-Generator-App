<template>
  <p
    v-if="heading"
    class="text-black text-weight-bold text-medium no-margin q-pb-sm q-px-sm"
    :class="headingColor"
  >
    {{ heading }}
  </p>
  <q-select class="q-px-sm" v-bind="$attrs" />
</template>

<script lang="ts" setup>
defineProps<{
  heading: string;
}>();
</script>
