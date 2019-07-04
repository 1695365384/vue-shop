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
            title: "用户列表"
          },
          component: () => {
            return import("./views/indexChild/users.vue");
          }
        },

        {
          path: "/roles",
          name: "roles",
          meta: {
            title: "角色列表"
          },
          component: () => {
            return import("./views/indexChild/roles.vue");
          }
        },

        {
          path: "/rights",
          name: "rights",
          meta: {
            title: "权限列表"
          },
          component: () => {
            return import("./views/indexChild/rights.vue");
          }
        },

        {
          path: "/goods",
          name: "goods",
          meta: {
            title: "商品列表"
          },
          component: () => {
            return import("./views/indexChild/goods.vue");
          }
        },

        {
          path: "/categories",
          name: "categories",
          meta: {
            title: "分类列表"
          },
          component: () => {
            return import("./views/indexChild/categories.vue");
          }
        },

        {
          path: "/params",
          name: "params",
          meta: {
            title: "分类列表"
          },
          component: () => {
            return import("./views/indexChild/params.vue");
          }
        },

        {
          path: "/goods-add",
          name: "goodsAdd",
          meta: {
            title: "添加商品"
          },
          component: () => {
            return import("./views/indexChild/goodsAdd.vue");
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
