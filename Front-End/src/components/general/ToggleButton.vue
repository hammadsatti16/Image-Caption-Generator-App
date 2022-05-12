<template>
  <div class="toggle-btn">
    <Icon
      :class="gridView ? 'bg-primary' : ''"
      :color="gridView ? 'white' : 'warning'"
      class="brdr q-pa-sm cursor-pointer"
      size="20px"
      name="rhc-grid"
      @click="gridView = true"
    />
    <Icon
      :class="gridView ? '' : 'bg-primary'"
      class="brdr q-pa-sm cursor-pointer"
      size="20px"
      :color="gridView ? 'warning' : 'white'"
      name="rhc-list"
      @click="gridView = false"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import Icon from "./Icon.vue";

export default defineComponent({
  components: {
    Icon,
  },
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["update:modelValue"],
  setup(props, context) {
    const gridView = computed({
      get() {
        return props.modelValue;
      },
      set(val) {
        context.emit("update:modelValue", val);
      },
    });

    return {
      gridView,
    };
  },
});
</script>

<style lang="scss">
.toggle-btn {
  border: 1px solid #c9c9c9;
}
</style>
