<template>
  <q-dialog v-bind="$attrs">
    <q-card
      :class="!dense ? 'q-pa-md' : ''"
      :style="`max-width: ${width}; width: 100%;`"
    >
      <div
        v-if="title && title.length"
        class="row justify-between q-px-md q-py-sm"
      >
        <h6 class="q-my-sm">{{ title }}</h6>
        <q-icon
          v-close-popup
          size="sm"
          name="cancel"
          class="cursor-pointer q-my-auto"
        />
      </div>
      <slot></slot>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "GenericModal",
  props: {
    title: {
      type: String,
    },
    width: {
      type: String,
      default: "700px",
    },
    dense: {
      type: Boolean,
      default: false,
    },
  },
});
</script>
