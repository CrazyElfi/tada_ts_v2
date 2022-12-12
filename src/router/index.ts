import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import ChatList from '../views/ChatList.vue'
import FormPage from '../views/FormPage.vue'
import NewChat from '../views/NewChat.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'home',
    component: FormPage
  },
  {
    path: '/chats',
    name: 'chats',
    component: ChatList
  },
  {
    path: '/newChat',
    name: 'newChat',
    component: NewChat
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
