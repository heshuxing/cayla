import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Preview from '../views/Preview.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/preview/:id', component: Preview },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
