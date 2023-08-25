<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
    <div class="header">
        <RouterView />
    </div>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
  justify-content: center;
  place-items: center;
}
</style>
