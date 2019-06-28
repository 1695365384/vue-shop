import Vue from "vue";
import Router from "vue-router";
import { getToKen } from "@/assets/js/userInfo";

Vue.use(Router);

const routerLink = new Router({
  routes: [
    {
      path: "/login",
      name: "login",
      meta: {
        title: "登陆页"
      },
      component: () => {
        return import("./views/login.vue");
      }
    },

    {
      path: "/",
      name: "index",
      meta: {
        title: "主页"
      },
      component: () => {
        return import("./views/index.vue");
      },

      children: [
        {
          path: "/users",
          name: "users",
          meta: {
            title: "用户角色管理"
          },
          component: () => {
            return import("./views/indexChild/users.vue");
          }
        }
      ]
    }
  ]
});

routerLink.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  if (to.name === "login") {
    next();
  } else {
    if (!getToKen()) {
      next({ name: "login" });
    } else {
      next();
    }
  }
});

export default routerLink;
