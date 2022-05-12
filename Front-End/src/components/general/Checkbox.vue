<template>
  <q-checkbox v-model="inputValue" v-bind="$attrs" />
</template>

<script lang="ts" setup>
import { computed } from "vue";

const props = defineProps<{
  modelValue: boolean | number;
}>();

const emits = defineEmits<{
  (e: "update:modelValue", val: boolean): void;
}>();

const inputValue = computed({
  get() {
    if (props.modelValue) {
      return true;
    } else {
      return false;
    }
  },
  set(val: boolean) {
    emits("update:modelValue", val);
  },
});
</script>
