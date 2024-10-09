<script setup lang="ts">
import router from '../router'

function intakeRoute() {
  router.push('/intake')
}

function lbRoute() {
  router.push('/leaderboard')
}

function landingRoute() {
  router.push('/')
}
</script>

<template>
  <VNavigationDrawer permanent>
    <VList density="compact" nav>
      <VListItem @click="landingRoute">Quizzical</VListItem>
      <VDivider />
      <VListItem @click="intakeRoute" title="Take a Quiz" value="quiz"> </VListItem>
      <VListItem @click="lbRoute" title="Leaderboard" value="leaderboard"> </VListItem>
    </VList>
  </VNavigationDrawer>
</template>
