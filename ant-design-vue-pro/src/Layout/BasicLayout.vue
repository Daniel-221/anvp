<!--  -->
<template>
  <div :class="[`nav-theme-${navTheme}`, `nav-layout-${navLayout}`]">
    <a-layout id="components-layout-demo-side" style="min-height: 100vh">
      <a-layout-sider
        v-if="navLayout === 'left'"
        :theme="navTheme"
        :trigger="null" 
        v-model="collapsed"
        width="256px"
        collapsible
      >
        <div class="logo">Ant Design Vue Pro</div>
        <SliderMenu :theme="navTheme"></SliderMenu>
      </a-layout-sider>
      <a-layout>
        <a-layout-header style="background: #fff; padding: 0" @click="test">
        
          <a-icon
            v-auth="['admin']"
            class="trigger"
            :type="collapsed ? 'menu-unfold' : 'menu-fold'"
            @click="collapsed = !collapsed"
          ></a-icon>
          <Header></Header>
        </a-layout-header>
        <a-layout-content style="margin: 0 16px">
          <router-view></router-view>
        </a-layout-content>
        <a-layout-footer style="text-align: center">
          <Footer></Footer>
        </a-layout-footer>
      </a-layout>
    </a-layout>
    <!-- 将抽屉组件设置为管理员权限 -->

    <Authorized :authority="['admin']">
      <Drawer></Drawer>
    </Authorized>
  </div>
</template>
<script>
import Header from "./Header";
import Footer from "./Footer";
import SliderMenu from "./SliderMenu";
import Drawer from "../components/SettingDrawer/index";
export default {
  data() {
    return {
      collapsed: false,
    };
  },
  computed: {
    navTheme() {
      return this.$route.query.navTheme || "dark";
    },
    navLayout() {
      return this.$route.query.navLayout || "left";
    },
  },

  methods: {
    test: function () {
      console.log("test");
    },
  },
  components: {
    Header,
    Footer,
    SliderMenu,
    Drawer,
  },
};
</script>
<style scoped>
.nav-theme-dark >>> .logo {
  color: white;
}
#components-layout-demo-side .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}

.trigger {
  padding: 0 20px;
  line-height: 64px;
  font-size: 20px;
}
.trigger:hover {
  background-color: #eeeeee;
}
</style>