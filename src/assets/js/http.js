import axios from "axios";
import { getToKen } from "./userInfo";
import router from "@/router";

//添加一个初始的地址
export const http = axios.create({
  baseURL: "http://localhost:8888/api/private/v1/"
});

//如果hash的地址是login添加令牌到请求头里
http.interceptors.request.use(
  function(config) {
    if (config.url !== "/login") {
      config.headers["Authorization"] = getToKen();
    }
    return config;
  },
  function(err) {
    return Promise.reject(err);
  }
);

//响应的拦截器,根据状态码来
/**
 * 如果状态码为403 返回错误对象
 * 如果是401 改变路由到login
 */
http.interceptors.response.use(
  function(response) {
    const { meta } = response.data;
    if (meta.status === 403) {
      window.alert("你没有权限操作");
    } else if (meta.status === 401) {
      router.push({
        name: "login",
        query: {
          redirect: window.localStorage.hash
        }
      });
    }
    return response;
  },
  function(error) {
    return Premise.reject(error);
  }
);

/**
 * 创建一个插件对象,将我们的http添加到vue的原型中
 */
const httpPlugin = {};

httpPlugin.install = function(Vue, option) {
  Vue.prototype.$http = http;
};

export default httpPlugin;
