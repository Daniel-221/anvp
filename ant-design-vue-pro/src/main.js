import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
//全部引入
//import Antd from "ant-design-vue";
//import "ant-design-vue/dist/antd.less"
//精准引入，减小体积
//import Button from "ant-design-vue/lib/button";
//import "ant-design-vue/lib/button/style";
//使用Babel,直接写位置，而且不需要特地引入样式（需要配置）
 import {Button,Layout,Icon,Drawer,Radio,Menu} from "ant-design-vue";
import Authorized from "./components/Authorized";
import Auth from './directives/auth'


// 全局注册antdesign的组件
Vue.use(Button);
//自动注册Layout下面的header，content，footer等组件
Vue.use(Layout);
Vue.use(Icon);
Vue.use(Drawer);
Vue.use(Radio);
Vue.use(Menu);
Vue.component("Authorized",Authorized);

Vue.config.productionTip = false;
Vue.use(Auth);


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
