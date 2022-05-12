<template>
  <q-drawer
    mini
    :mini-width="70"
    :width="70"
    v-bind="$attrs"
    show-if-above
    bordered
    class="bg-primary text-white sidebar"
  >
    <q-list class="column justify-between" style="height: 97vh">
      <q-item clickable to="/">
        <q-item-section avatar>
          <Icon
            class="q-ml-sm"
            size="50px"
            color="white"
            name="rhc-random-logo"
          />
          <p class="text-weight-bold text-body2 q-ma-xs text-white">Name</p>
        </q-item-section>
      </q-item>
      <div>
        <q-item
          v-for="(route, i) in routes[1].children"
          :key="i"
          class="q-my-md"
          clickable
          :to="{ name: route.name }"
        >
          <q-item-section avatar>
            <Icon
              class="menu-icons"
              size="23"
              color="white"
              :name="route.meta?.icon"
            />
          </q-item-section>
        </q-item>
      </div>
    </q-list>
  </q-drawer>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const routes = computed(() => {
  return router.options.routes;
});
</script>

<style lang="scss">
.sidebar {
  .user-icon {
    max-width: 50px;
    width: 100%;
  }
  .menu-icons {
    opacity: 0.6;
  }
  .q-router-link--active {
    svg {
      opacity: 1 !important;
    }
  }
}
</style>
