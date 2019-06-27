import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./plugins/element.js";
import "./assets/css/base.css";

import httpPlugin from "@/assets/js/http";

Vue.config.productionTip = false;
Vue.use(httpPlugin);
new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
