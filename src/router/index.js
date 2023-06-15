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
    path: "/user",
    name: "User",
    component: () => import("../views/User.vue"),
    meta: {
      label: "User",
      roles: ["admin", "user"],
    },
    children: [
      {
        path: "/list",
        name: "UserList",
        component: () => import("../views/UserList.vue"),
        meta: {
          label: "UserList",
          roles: ["admin", "user"],
        },
        children: [
          {
            path: "/usera",
            name: "UserA",
            component: () => import("../views/UserA.vue"),
            meta: {
              label: "UserA",
              roles: ["admin"],
            },
          },
          {
            path: "/userb",
            name: "UserB",
            component: () => import("../views/UserB.vue"),
            meta: {
              label: "UserB",
              roles: ["user"],
            },
          },
        ],
      },
      {
        path: "/info",
        name: "UserInfo",
        component: () => import("../views/UserInfo.vue"),
        meta: {
          label: "UserInfo",
          roles: ["user"],
        },
      },
    ],
  },
  {
    path: "/orders",
    name: "Orders",
    component: () => import("../views/Orders.vue"),
    meta: {
      label: "Orders",
      roles: ["admin", "user"],
    },
    children: [
      {
        path: "/category",
        name: "OrderCategory",
        component: () => import("../views/OrderCategory.vue"),
        meta: {
          label: "OrderCategory",
          roles: ["admin", "user"],
        },
      },
    ],
  },
];

/**
 * 根据路由的meta.roles属性，判断当前用户是否有权限访问该路由
 * @param {*} route 路由
 * @param {*} role 角色
 * @returns
 */
function isRole(route, role) {
  if (route.hasOwnProperty("meta") && route.meta.hasOwnProperty("roles")) {
    if (route.meta.roles.includes(role)) {
      console.log("🚀 ~ isRole:", true);
      return true;
    }
  }
  console.log("🚀 ~ isRole:", false);
  return false;
}

/**
 *
 * @param {*} route
 * @returns
 */
function hasChildren(route) {
  if (route.hasOwnProperty("children") && route.children.length !== 0) {
    console.log("🚀 ~ hasChildren:", route, true);
    return true;
  }
  console.log("🚀 ~ hasChildren:", route, false);
  return false;
}

/**
 * 根据用户角色，动态添加路由
 * @param {*} role
 * @returns
 */
export function addRoutesByRole(role) {
  const filteredDynamicRoutes = [];
  console.log("role: ", role);
  /**
   * 遍历路由数组，得到curr和children，
   * 判断curr是否有roles属性和是否包含当前用户的角色（isRole）
   * 判断是否已经添加到路由中，如果没有添加，添加到路由中
   */

  const deepChildren = (parent, children) => {
    children.forEach((child) => {
      const { children: nestChildren, ...curr } = child;
      if (!!nestChildren && nestChildren.length !== 0) {
        if (isRole(curr, role)) {
          if (!router.hasRoute(curr.name)) {
            if (!!parent) {
              router.addRoute(parent.name, { ...curr, path: parent.path + curr.path });
              filteredDynamicRoutes.push({ ...curr, path: parent.path + curr.path });
            } else {
              router.addRoute(curr);
              filteredDynamicRoutes.push(curr);
            }
          }
          deepChildren(curr, nestChildren);
        }
      } else {
        if (isRole(curr, role)) {
          if (!router.hasRoute(curr.name)) {
            if (!!parent) {
              router.addRoute(parent.name, { ...curr, path: parent.path + curr.path });
              filteredDynamicRoutes.push({ ...curr, path: parent.path + curr.path });
            } else {
              router.addRoute(curr);
              filteredDynamicRoutes.push(curr);
            }
          }
        }
      }
    });
  };

  deepChildren(null, dynamicRoutes);
  return [...routes, ...filteredDynamicRoutes];
}

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
