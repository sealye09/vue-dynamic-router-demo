<script setup>
import { inject } from "vue";

const myRoutes = inject("myRoutes");
</script>

<template>
  <ul class="flex gap-4 pl-20 flex-col">
    <li
      v-for="item in myRoutes"
      :key="item.name"
    >
      <router-link :to="{ name: item.name }"> [{{ item.meta.label }}] </router-link>

      <template v-if="item.children">
        <menu :data="item.children"></menu>
      </template>
    </li>
  </ul>
</template>
