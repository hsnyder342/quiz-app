<script setup lang="ts">
import SideBar from './components/SideBar.vue'
</script>

<template>
  <VApp>
    <!-- Sidebar -->
    <SideBar />

    <VMain>
      <!-- Content -->
      <Suspense>
        <RouterView />
      </Suspense>
    </VMain>
  </VApp>
</template>
