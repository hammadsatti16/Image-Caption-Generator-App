import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { Quasar } from "quasar";
import quasarUserOptions from "./quasar-user-options";

//Global Coimponent Registration
import Icon from "@/components/general/Icon.vue";
import Card from "@/components/general/Card.vue";
import Input from "@/components/general/Input.vue";
import Modal from "@/components/general/Modal.vue";
import Select from "@/components/general/Select.vue";
import Toggle from "@/components/general/Toggle.vue";
import Checkbox from "@/components/general/Checkbox.vue";
import Button from "@/components/general/Button.vue";
import Table from "@/components/general/Table/Table.vue";
import "./registerServiceWorker";

createApp(App)
  .use(Quasar, quasarUserOptions)
  .use(router)
  .component("Icon", Icon)
  .component("Card", Card)
  .component("Modal", Modal)
  .component("Table", Table)
  .component("Input", Input)
  .component("Toggle", Toggle)
  .component("Select", Select)
  .component("Button", Button)
  .component("Checkbox", Checkbox)
  .mount("#app");
