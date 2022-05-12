<template>
  <q-toggle v-model="inputValue" v-bind="$attrs" :color="color" />
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
export default defineComponent({
  props: {
    color: {
      type: String,
      default: "green",
    },
    modelValue: {
      type: Number || Boolean,
    },
  },
  emits: ["update:modelValue"],
  setup(props, context) {
    const inputValue = computed({
      get() {
        if (props.modelValue) {
          return true;
        } else {
          return false;
        }
      },
      set(val) {
        context.emit("update:modelValue", val);
      },
    });
    return {
      inputValue,
    };
  },
});
</script>
