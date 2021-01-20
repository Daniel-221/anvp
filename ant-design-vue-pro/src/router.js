import Vue from "vue";
import VueRouter from "vue-router";
import findLast from 'lodash/findLast';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { check, isLogin } from './utils/auth'
import nProgress from "nprogress";

Vue.use(VueRouter);

const routes = [


  {
    //嵌套路由，方便扩展
    path: '/user',
    hideInMenu: true,
    //component:RenderRouterView,
    //使用render函数
    //component:{ render: h=> h("router-view")},
    component: () =>
      import(/* webpackChunkName: "user" */ "./Layout/UserLayout.vue"),


    children: [
      {
        path: '/user',
        redirect: '/user/login'
      },
      {
        path: '/user/login',
        name: 'login',
        //组件使用异步加载，仅在访问时加载
        component: () =>
          import(/* webpackChunkName: "user" */ "./views/User/Login.vue")
      },
      {
        path: '/user/register',
        name: 'register',
        //组件使用异步加载，仅在访问时加载
        component: () =>
          import(/* webpackChunkName: "user" */ "./views/User/Login.vue")
      }

    ]
  },


  {
    path: "/",
    component: () => import(/* webpackChunkName: "layout" */ "./Layout/BasicLayout"),
    meta: {
      authority: ['user', 'admin']
    },
    children: [
      //dashboard仪表盘
      {
        path: "/",
        redirect: "/dashboard/analysis"
      },
      {
        path: "/dashboard",
        name: "dashboard",
        meta: { icon: 'dashboard', title: "仪表盘" },
        component: { render: h => h("router-view") },
        children: [
          {
            path: "/dashboard/analysis",
            name: "analysis",
            meta: { title: "分析页" },
            component: () => import(/* webpackChunkName: "dashboard" */ "./views/Dashboard/Analysis")

          }
        ]
      },

      {
        path: "/form",
        name: "form",
        meta: { icon: "form", title: "表单", authority: ['admin'] },
        component: { render: h => h("router-view") },
        children: [
          {
            path: "/form/basic-form",
            name: "basic-form",
            meta: {
              title: "基础表单",
            },
            component: () =>
              import(/* webpackChunkName: "form" */ "./views/Forms/BasicForm"),

          },


          {
            path: "/form/step-form",
            name: "step-form",

            meta: { title: "分步表单" },
            hideChildInMenu: true,
            component: () =>
              import(/* webpackChunkName: "form" */ "./views/Forms/StepForm/index"),
            children: [
              {
                path: "/form/step-form",
                redirect: "/form/step-form/info"
              },
              {
                path: "/form/step-form/info",
                name: "info",
                component: () => import(/* webpackChunkName: "form" */ "./views/Forms/StepForm/Step1")
              },
              {
                path: "/form/step-form/confirm",
                name: "confirm",
                component: () => import(/* webpackChunkName: "form" */ "./views/Forms/StepForm/Step2")

              },
              {
                path: "/form/step-form/result",
                name: "result",
                component: () => import(/* webpackChunkName: "form" */ "./views/Forms/StepForm/Step3")

              }
            ]
          }
        ]
      },

    ]
  },


  {
    path: "/403",
    name: "403Forbidden",
    hideInMenu: true,
    component: () =>
      import(/* webpackChunkName: "about" */ "./403.vue")
  },

  {
    path: "*",
    name: "404NOTFOUND",
    hideInMenu: true,
    component: () =>
      import(/* webpackChunkName: "about" */ "./404.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

//路由守卫
router.beforeEach((to, from, next) => {
  if (to.path !== from.path) {
    NProgress.start();
  }
  //找到最近的有authority的
  const record = findLast(to.matched, record => record.meta.authority)
  if (record && !check(record.meta.authority)) {
    if (!isLogin() && to.path !== "/user/login") {
      next({
        path: "/user/login"
      });
    }
    else if (to.path !== "/403") {
      next({
        path: "/403"
      });
    }
    //主动终止掉这个
    nProgress.done();
  }

  next();
}
);

router.afterEach(() => {
  NProgress.done();
})


export default router;
