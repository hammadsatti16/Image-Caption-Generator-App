<template>
  <q-header v-bind="$attrs" elevated class="glossy">
    <q-toolbar>
      <q-btn
        flat
        dense
        round
        aria-label="Menu"
        icon="menu"
        @click="$emit('btnClicked')"
      />

      <q-toolbar-title> Quasar App </q-toolbar-title>

      <div>Quasar v{{ $q.version }}</div>
    </q-toolbar>
  </q-header>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  emits: ["btnClicked"],
});
</script>
