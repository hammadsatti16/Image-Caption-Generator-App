<template>
  <Sidebar v-if="$q.screen.gt.xs && $q.screen.gt.sm" v-model="leftDrawerOpen" />
  <MobileSidebar v-else />
  <q-page-container class="q-mx-sm">
    <router-view />
  </q-page-container>
  <Footer />
</template>

<script lang="ts">
import { ref, defineComponent } from "vue";
import Footer from "../components/layout/Footer.vue";
import Sidebar from "../components/layout/Sidebar.vue";
import MobileSidebar from "../components/layout/MobileSidebar.vue";
export default defineComponent({
  name: "App",
  components: {
    Sidebar,
    Footer,
    MobileSidebar,
  },
  setup() {
    return {
      leftDrawerOpen: ref(false),
    };
  },
});
</script>
