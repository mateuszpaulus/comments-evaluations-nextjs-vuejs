<!-- components/Navbar.vue -->
<template>
  <nav class="shadow-custom h-[50px]">
    <ul class="flex h-full">
      <li class="flex">
        <NuxtLink
            :class="{'border-b-[3px] border-primary': isHome}"
            class="px-20 pt-[13px] pb-[19px] text-black text-[15px]"
            to="/"
        >
          Lista
        </NuxtLink>
      </li>
      <li class="flex">
        <NuxtLink
            :class="{'border-b-[3px] border-primary': !isHome}"
            class="px-20 pt-[13px] pb-[19px] text-black text-[15px]"
            to="/search"
        >
          Wyszukaj
        </NuxtLink>
      </li>
    </ul>
  </nav>
  <NuxtPage/>
</template>

<script setup>
const route = useRoute()

const isHome = computed(() => route.fullPath === '/')
</script>

<style scoped>
</style>
