<template>
  <div :disabled="disable">
    <div>
      <p
        v-if="heading"
        class="text-secondary text-weight-bold text-medium no-margin q-pb-sm"
      >
        {{ heading }}
        <span v-if="requiredModifier" class="text-grey">
          {{ requiredModifier }}
        </span>
      </p>
      <div v-if="!inputValue || inputValue.length == 0 || isMulti">
        <q-select
          ref="qSearchRef"
          v-bind="$attrs"
          v-model="inputValue"
          dense
          borderless
          use-input
          input-class="text-medium"
          input-debounce="750"
          hide-dropdown-icon
          hide-bottom-space
          behavior="menu"
          type="search"
          options-dense
          hide-selected
          :multiple="isMulti"
          :option-value="optionId"
          :option-label="optionLabel"
          class="my-searchDep-input"
          :loading="searching"
          :options="optionsResult"
          :lazy-rules="requiredModifier ? true : false"
          :rules="
            requiredModifier
              ? [(val) => checkRule(val) || 'Select ' + heading]
              : null
          "
          @filter="filterFn"
        >
          <template #option="scope">
            <q-item
              class="q-py-sm"
              v-bind="scope.itemProps"
              v-on="scope.itemEvents"
            >
              <slot name="options" :opt="scope.opt" />
            </q-item>
          </template>
          <template #prepend>
            <q-icon name="search" />
          </template>
          <template #no-option>
            <q-item>
              <q-item-section class="text-grey text-medium">
                No results
              </q-item-section>
            </q-item>
          </template>
          <template #loading>
            <q-spinner v-if="searching" />
          </template>
        </q-select>
      </div>
      <slot v-if="isMulti" name="select-multi" />
      <div v-if="inputValue && Object.keys(inputValue).length > 0 && !isMulti">
        <slot v-if="isDetailed" name="select-detailed" />
        <div v-else class="row">
          <div class="col-12 item-section">
            <q-item :disable="disable">
              <q-item-section class="col-11">
                <slot name="select-minimal" />
              </q-item-section>
              <q-item-section v-if="removeBtn" class="items-end col-1">
                <q-icon
                  size="xs"
                  class="cursor-pointer text-grey"
                  name="remove_circle_outline"
                  color="accent"
                  @click="[emit('remove'), (inputValue = null)]"
                />
              </q-item-section>
            </q-item>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch, toRefs } from "vue";

const props = defineProps<{
  modelValue: Array<any> | Record<string, unknown> | string;
  heading: string;
  isMulti: boolean;
  isDetailed: boolean;
  requiredModifier: string;
  hideRemoveBtn: boolean;
  optionId: string;
  optionLabel: string;
  options: Array<any>;
}>();
const emit = defineEmits<{
  (e: "update:modelValue", val: any): void;
  (e: "remove"): void;
}>();
// const search = ref("");
const qSearchRef = ref();
const searching = ref(false);
const optionsResult = ref<any[]>([]);

const filterFn = (val: string, update: any) => {
  update((): void => {
    const searchVal = val;
    optionsResult.value = props.options.filter((v) =>
      v.name.includes(searchVal)
    );
  });
};

const checkRule = (val: string) => {
  if (props.isMulti) {
    if (val && val.length > 0) return true;
    else return false;
  } else {
    return val ? true : false;
  }
};

const removeBtn = computed(() => {
  if (props.disable) {
    return false;
  } else return !props.readonly;
});

const inputValue = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});

watch(
  () => toRefs(props).modelValue,
  (val) => {
    if (qSearchRef.value && props.requiredModifier && val) {
      qSearchRef.value.validate();
    }
  }
);
</script>

<style lang="scss">
.my-searchDep-input {
  input {
    text-align: left;
    letter-spacing: 0px;
    color: #a09fad;
    opacity: 1;
  }
  .q-icon {
    color: #a09fad;
    opacity: 1;
  }
  .q-field__marginal,
  .q-field__control {
    background: #f3f3f3 0% 0% no-repeat padding-box !important;
    border-radius: 7px;
    padding: 0px 12px;
    height: 45px !important;
  }
}
.priority-box {
  width: 23px;
  height: 20px;
  background: #0e2e61 0 0 no-repeat padding-box;
  border-radius: 4px;
  opacity: 1;
  color: white;
}
</style>
