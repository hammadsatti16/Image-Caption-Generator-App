<template>
  <q-footer bordered unelevated class="bg-white text-black">
    <q-toolbar>
      <q-toolbar-title>
        <div class="row justify-between">
          <p class="text-body1 q-my-auto font-small">© 2021 Darvis</p>
          <div class="row">
            <Button color="text-white" label="Help center" flat />
            <Button color="text-white" label="Terms of use" flat />
            <Button color="text-white" label="Privacy policy" flat />
          </div>
        </div>
      </q-toolbar-title>
    </q-toolbar>
  </q-footer>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Button from "../general/Button.vue";

export default defineComponent({
  components: {
    Button,
  },
});
</script>
