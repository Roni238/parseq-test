import { createApp } from "vue";
import App from "@/app/App.vue";
import { createPinia } from "pinia";

const app = createApp(App);
app.use(createPinia()).mount("#app");
