<template>
  <q-popup-proxy
    v-bind="$attrs"
    cover
    transition-show="scale"
    transition-hide="scale"
    @before-show="updateProxy"
  >
    <q-date today-btn>
      <div class="row items-center justify-end q-gutter-sm">
        <q-btn v-close-popup label="Cancel" color="primary" flat />
        <q-btn v-close-popup label="OK" color="primary" flat @click="save" />
      </div>
    </q-date>
  </q-popup-proxy>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({});
</script>
