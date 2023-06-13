import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

export const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      label: "Home",
    },
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: () => import("../views/Dashboard.vue"),
    meta: {
      label: "Dashboard",
    },
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
    meta: {
      label: "Login",
    },
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../views/About.vue"),
    meta: {
      label: "About",
    },
  },
];

// 动态控制的路由
const dynamicRoutes = [
  {
    name: "User",
    path: "/user",
    component: () => import("../views/User.vue"),
    meta: {
      label: "User",
      roles: ["admin", "user"],
    },
    children: [
      {
        name: "UserList",
        path: "/list",
        component: () => import("../views/UserList.vue"),
        meta: {
          label: "UserList",
          roles: ["admin"],
        },
      },
      {
        name: "UserInfo",
        path: "/list",
        component: () => import("../views/UserInfo.vue"),
        meta: {
          label: "UserInfo",
          roles: ["user"],
        },
      },
    ],
  },
  {
    path: "orders",
    name: "UserOrders",
    component: () => import("../views/Orders.vue"),
    meta: {
      label: "Orders",
      roles: ["user"],
    },
    children: [
      {
        name: "OrderCategory",
        path: "/category",
        component: () => import("../views/OrderCategory.vue"),
        meta: {
          label: "OrderCategory",
          roles: ["user"],
        },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
