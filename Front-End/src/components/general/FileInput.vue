<template>
  <q-file
    v-model="model"
    outlined
    class="my-file-input"
    standout
    v-bind="$attrs"
  >
    <span :class="textColor" class="cursor-pointer q-px-xs text-weight-bold">
      Browse
    </span>
  </q-file>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";

export default defineComponent({
  props: {
    modelValue: {
      type: Object,
    },
    textColor: {
      type: String,
      default: "text-black ",
    },
  },
  emits: ["update:modelValue"],
  setup(props, context) {
    const model = computed({
      get: function () {
        return props.modelValue;
      },
      set: function (newVal) {
        context.emit("update:modelValue", newVal);
      },
    });

    return {
      model,
    };
  },
});
</script>

<style lang="scss">
.my-file-input {
  width: auto;
  .q-field__control {
    padding: 0px !important;
    min-height: auto;
    border-radius: 5px;
    color: black;
  }
  .q-field__control:before {
    border: transparent;
  }
  .q-field__native {
    display: none;
  }
}
</style>
