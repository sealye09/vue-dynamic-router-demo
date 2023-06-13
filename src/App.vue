<script setup>
import { routes } from "./router";

console.log(routes);
</script>

<template>
  <div
    class="w-full h-full bg-gray-800 text-gray-200 flex gap-8 flex-col justify-center items-center"
  >
    <div class="flex gap-4">
      <router-link
        v-for="item in routes"
        :key="item.name"
        :to="{ name: item.name }"
        >【{{ item.meta.label }}】
      </router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<style scoped></style>
