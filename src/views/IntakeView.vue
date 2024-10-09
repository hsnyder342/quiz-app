<script setup lang="ts">
import { ref, watch } from 'vue'

const topic = ref(null)
let topicIndex: Number
const questionCount = ref(5)
const difficulty = ref(null)
const topicsAvail: string[] = []
const categories = new Map<Number, String>()
let maxQuestions = ref(100)

// Call the database to get categories
let res = await fetch(`https://opentdb.com/api_category.php`)
let json = await res.json()
for (const entry in json.trivia_categories) {
  // @ts-ignore
  categories.set(json.trivia_categories[entry].id, json.trivia_categories[entry].name)
  topicsAvail.push(json.trivia_categories[entry].name)
}

// When topic or difficulty changes, update question max
async function updateQuestions() {
  if (topic.value == null) maxQuestions.value = 0
  let index: Number = -1

  for (let key of categories.keys()) {
    if (categories.get(key) == topic.value) {
      index = key
    }
  }

  res = await fetch(`https://opentdb.com/api_count.php?category=${index}`)
  topicIndex = index
  json = await res.json()

  // All we've done is pick a topic, wait a second
  if (difficulty.value == null) return
  switch (difficulty.value!) {
    case 'Easy':
      maxQuestions.value = json.category_question_count.total_easy_question_count
      break
    case 'Medium':
      maxQuestions.value = json.category_question_count.total_medium_question_count
      break
    case 'Hard':
      maxQuestions.value = json.category_question_count.total_hard_question_count
      break
  }

  // If our new max is less than current, set the current
  if (maxQuestions.value < questionCount.value) {
    console.log('curr higher than max')
    questionCount.value = maxQuestions.value
  }
}

watch(difficulty, updateQuestions)
watch(topic, updateQuestions)
</script>

<script lang="ts"></script>

<template>
  <!-- Topic Selection -->
  <VAutocomplete placeholder="Select a Topic" v-model="topic" :items="topicsAvail" />

  <!-- Difficulty Selection -->

  <VSelect
    label="Difficulty"
    :items="['Easy', 'Medium', 'Hard']"
    v-model="difficulty"
    v-bind:disabled="topic == null"
  ></VSelect>

  <!-- Number of Questions Selection -->
  <VSlider
    v-bind:disabled="difficulty == null"
    min="0"
    v-bind:max="maxQuestions"
    v-model="questionCount"
    step="1"
    label="Number of Questions"
    thumb-label
  ></VSlider>

  <!-- Start Quiz -->
  <div class="justify-center">
    <VBtn
      variant="outlined"
      v-bind:to="`/quiz/${topicIndex}/${difficulty}/${questionCount}`"
      v-bind:disabled="difficulty == null"
    >
      Start Quiz
    </VBtn>
  </div>
</template>
