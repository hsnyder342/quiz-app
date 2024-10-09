<template>
  <!-- Display Questions -->
  <p v-if="loading">Loading...</p>
  <div v-else v-for="(question, index) in questions" :key="index">
    <!-- @vue-ignore -->
    <div class="questionWrapper" v-bind:correct="question[4]">
      <h2>{{ index + 1 }}.</h2>
      <VRadioGroup v-model="choices[index]">
        <VRadio label="True" value="True"></VRadio>
        <VRadio label="False" value="False"></VRadio>
      </VRadioGroup>
      <p>
        {{
          //@ts-ignore
          question.question
        }}
      </p>
    </div>
  </div>

  <!-- Submit Button -->
  <VBtn @click="submit">Submit</VBtn>
</template>

<script lang="ts">
import { VBtn, VRadio, VRadioGroup } from 'vuetify/components'
import { reactive, ref } from 'vue'
import router from '@/router'

export default {
  props: ['topic', 'difficulty', 'questionCount'],
  async setup(props) {
    const questions = ref(null)
    const loading = ref(true)
    let res = await fetch(
      `https://opentdb.com/api.php?amount=${props.questionCount}&category=${props.topic}&difficulty=${props.difficulty.toLowerCase()}&type=boolean`
    )
    let json = await res.json()
    questions.value = json.results // type, difficulty, category, question, correctAns
    loading.value = false

    const choices = reactive([])
    const choicesSimple: String[] = []
    const answers: String[] = []

    //@ts-ignore
    for (let i = 0; i < questions.value.length; i++) {
      //@ts-ignore
      answers.push(questions.value![i].correct_answer)
    }

    function submit() {
      for (let value of choices) {
        choicesSimple.push(value)
      }

      let a = 0

      for (let i = 0; i < answers.length; i++) {
        if (answers[i] == choicesSimple[i]) a++
      }

      router.push(`/results/${a}/${answers.length}`)
    }

    return { loading, questions, choices, submit }
  }
}
</script>

<style scoped>
.questionWrapper {
  background-color: #303030;
  margin: 1em;
  height: fit-content;
  max-height: 7.5em;
  border-radius: 15px;
}

.questionWrapper > h2 {
  position: relative;
  left: 0.5em;
  top: 0.25em;
}

.questionWrapper >>> .v-selection-control-group {
  position: relative;
  left: 90%;
  bottom: 1.35em;
}

.questionWrapper > p {
  position: relative;
  width: 80%;
  left: 2em;
  bottom: 6em;
}

.v-btn {
  position-anchor: 0.5, 0.5;
  position: relative;
  left: 45%;
}
</style>
