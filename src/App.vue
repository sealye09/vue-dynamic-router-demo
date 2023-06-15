<script setup>
import { provide, ref } from "vue";
import { routes } from "./router";
import Menu from "./components/Menu.vue";

const myRoutes = ref(routes);
provide("myRoutes", myRoutes);
</script>

<template>
  <div class="w-full h-full bg-gray-800 text-gray-200 flex gap-8 items-center">
    <Menu />
    <router-view></router-view>
  </div>
</template>

<style scoped></style>
