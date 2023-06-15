<script setup>
import { provide, ref } from "vue";
import { routes } from "./router";

const myRoutes = ref(routes);
provide("myRoutes", myRoutes);
</script>

<template>
  <div
    class="w-full h-full bg-gray-800 text-gray-200 flex gap-8 flex-col items-center pt-20"
  >
    <div class="flex gap-4">
      <router-link
        v-for="item in myRoutes"
        :key="item.name"
        :to="{ name: item.name }"
        >[{{ item.meta.label }}]
      </router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<style scoped></style>
