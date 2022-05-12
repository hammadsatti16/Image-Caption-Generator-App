<template>
  <div class="q-pa-md">
    <q-list separator>
      <q-item v-for="(file, i) in files" :key="file.__key">
        <q-item-section thumbnail class="gt-xs">
          <Icon name="rhc-configuration" size="sm" />
        </q-item-section>
        <q-item-section>
          <q-item-label class="full-width ellipsis">
            {{ file.name }}
          </q-item-label>

          <q-item-label caption>
            Size: {{ (file.size / (1024 * 1024)).toFixed(2) }} MB
          </q-item-label>
        </q-item-section>

        <q-item-section top side>
          <q-btn
            class="gt-xs"
            size="12px"
            flat
            dense
            round
            icon="delete"
            @click="removeFile(i)"
          />
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Icon from "../Icon.vue";

export default defineComponent({
  components: { Icon },
  props: {
    files: {
      type: Array,
    },
  },
  emits: ["remove-file", "update:modelValue"],
  setup(props, context) {
    const removeFile = (i: number) => {
      context.emit("remove-file", i);
    };

    return {
      removeFile,
    };
  },
});
</script>
