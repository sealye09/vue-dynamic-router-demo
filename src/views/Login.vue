<script setup>
import { inject } from "vue";
import { useRouter } from "vue-router";
import { addRoutesByRole, removeAllRoutes, addBasicRoutes } from "../router";

const myRoutes = inject("myRoutes");

const loginHandle = (role) => {
  myRoutes.value = addRoutesByRole(role);
};

const logOut = () => {
  removeAllRoutes();
  myRoutes.value = addBasicRoutes();
};
</script>
<template>
  <div class="flex gap-4 justify-center items-center">
    <button
      class="px-4 py-2 rounded-md shadow bg-yellow-700"
      @click="
        () => {
          logOut();
          loginHandle('admin');
        }
      "
    >
      Admin Login
    </button>
    <button
      class="px-4 py-2 rounded-md shadow bg-yellow-700"
      @click="
        () => {
          logOut();
          loginHandle('user');
        }
      "
    >
      User Login
    </button>
    <button
      class="px-4 py-2 rounded-md shadow bg-red-700"
      @click="
        () => {
          logOut();
        }
      "
    >
      Logout
    </button>
  </div>
</template>

<style scoped></style>
```
