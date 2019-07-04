import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./plugins/element.js";
import "./assets/css/base.css";
import moment from "vue-moment";
import httpPlugin from "@/assets/js/http";
Vue.use(moment)
Vue.use(httpPlugin)

Vue.config.productionTip = false;
new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
