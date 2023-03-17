//import store from './store';
import { createRouter, createWebHistory } from "vue-router";

import home from './components/home.vue';

import users from './components/users.vue';

import reports from './components/reports.vue';

import admin from './components/admin.vue';

const routes = [

   { path: "/", component: home },
  
   { path: "/admin", name: "admin", component: admin },
  
   { path: "/users", name: "users", component: users },

   { path: '/reports', name: 'reports', component: reports}

];


const history = createWebHistory();

const router = createRouter({
  history,
  routes,
});


export default router;
