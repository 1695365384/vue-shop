import Vue from "vue";
import Element from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

Vue.use(Element);

// import upperFirst from 'lodash/upperFirst'
// import camelCase from 'lodash/camelCase'
// const requireComponent = require.context(
//     // 其组件目录的相对路径
//     'element-ui/lib',
//     // 是否查询其子目录
//     false, 正则)
// // 匹配基础组件文件名的正则表达式
// requireComponent.keys().forEach(fileName => {
//     // 获取组件配置
//     const componentConfig = requireComponent(fileName)
//     // 获取组件的 PascalCase 命名
//     const componentName = upperFirst(
//         camelCase(
//             // 获取和目录深度无关的文件名
//             fileName
//                 .split('/')
//                 .pop()
//                 .replace(正则)
//         )
//     )
// })
