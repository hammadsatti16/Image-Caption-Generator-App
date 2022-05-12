<template>
  <Modal ref="dialogRef" v-model="inputValue">
    <div class="brdr-dashed">
      <q-card-section align="center" class="q-pt-none q-pb-sm">
        <span class="row justify-center">
          <h6 class="q-my-sm q-px-sm text-weight-bold">Remove</h6>
          <h6 class="q-my-sm text-weight-bold text-capitalize">
            {{ props.name }}
          </h6>
        </span>
      </q-card-section>
      <q-card-section align="center" class="q-pt-none q-pb-md">
        <span>
          <p class="text-body1 q-my-sm">
            Are you sure you want to remove {{ props.name }}?
          </p>
        </span>
      </q-card-section>
      <q-card-actions align="center">
        <div class="row full-width justify-center q-pt-none q-pb-md">
          <q-btn
            class="q-mx-sm"
            unelevated
            color="primary"
            padding="7px 25px"
            label="Yes"
            @click="onDeleteAction"
          />
          <q-btn
            v-close-popup
            padding="7px 25px"
            unelevated
            outline
            label="No"
            type="reset"
          />
        </div>
      </q-card-actions>
    </div>
  </Modal>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import Modal from "./Modal.vue";

const props = defineProps<{
  name: string;
  modelValue: boolean;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", val: boolean): void;
  (e: "onDelete"): void;
}>();

const onDeleteAction = () => {
  emit("onDelete");
};

const dialogRef = ref();

const inputValue = computed({
  get() {
    return props.modelValue;
  },
  set(val) {
    emit("update:modelValue", val);
  },
});
</script>
