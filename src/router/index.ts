import { createRouter, createWebHistory } from 'vue-router'
import LandingView from '@/views/LandingView.vue'
import LeaderboardView from '../views/LeaderboardView.vue'
import QuizView from '../views/QuizView.vue'
import IntakeView from '../views/IntakeView.vue'
import ResultsView from '@/views/ResultsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/intake',
      component: IntakeView
    },
    {
      path: '/leaderboard',
      component: LeaderboardView
    },
    {
      path: '/',
      component: LandingView
    },
    {
      path: '/quiz/:topic/:difficulty/:questionCount',
      component: QuizView,
      props: true
    },
    {
      path: '/results/:right/:total',
      component: ResultsView,
      props: true
    }
  ]
})

export default router
