<template>
  <h1>Congratulations!</h1>
  <h3>You completed your quiz.</h3>
  <h4>Your score: {{ ((ansCorrect / qTotal) * 100).toFixed(2) }}%</h4>
  <p>Would you like to take another?</p>
  <VBtn to="/intake">Retake</VBtn>
</template>

<script lang="ts">
import { ref } from 'vue'

export default {
  props: ['right', 'total'],
  setup(props) {
    const ansCorrect = ref(props.right)
    const qTotal = ref(props.total)

    return { ansCorrect, qTotal }
  }
}
</script>

<style scoped>
* {
  margin: auto;
  margin-top: 10px;
  width: 30%;
  text-align: center;
}

.v-btn {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
