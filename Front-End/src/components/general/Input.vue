<template>
  <p
    v-if="heading"
    class="text-black text-weight-bold text-medium no-margin q-pb-sm q-px-sm"
    :class="headingColor"
  >
    {{ heading }}
  </p>
  <q-input class="q-px-sm" outlined v-bind="$attrs">
    <template #prepend>
      <slot name="prepend"></slot>
    </template>
    <template #append>
      <slot name="append"></slot>
    </template>
  </q-input>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    heading: {
      type: String,
    },
    headingColor: {
      type: String,
    },
  },
});
</script>
