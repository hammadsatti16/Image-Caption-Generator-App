<template>
  <div class="row bg-primary q-px-md">
    <div class="col-6">
      <h6 class="q-my-sm text-white text-weight-bold">RHC Dashboard</h6>
    </div>
    <div class="col-6 q-my-auto text-right">
      <q-icon
        class="cursor-pointer"
        color="white"
        name="menu"
        size="md"
        @click="toggleMenu = !toggleMenu"
      />
    </div>
  </div>
  <div v-if="toggleMenu" class="row secondary-sidebar">
    <q-list class="full-width">
      <q-item
        v-for="(route, index) in routes[1].children"
        :key="index"
        :to="{ name: route.name }"
        @click="toggleMenu = false"
      >
        <div class="row full-width">
          <q-icon class="q-my-auto q-mr-lg" :name="route.meta.icon" />
          <h6 class="q-my-sm text-white">{{ route.name }}</h6>
        </div>
      </q-item>
    </q-list>
  </div>
</template>

<script lang="ts">
import { useRouter } from "vue-router";
import { computed, defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    const router = useRouter();
    const toggleMenu = ref(false);

    const routes = computed(() => {
      return router.options.routes;
    });

    return {
      routes,
      toggleMenu,
    };
  },
});
</script>

<style lang="scss">
.secondary-sidebar {
  height: 100vh;
  width: 100vw;
  background-color: #141411;
}
</style>
