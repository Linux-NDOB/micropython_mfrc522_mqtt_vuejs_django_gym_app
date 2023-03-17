import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
const pinia = createPinia();
createApp(App).use(pinia)

import { defineStore } from 'pinia'
import {ref} from 'vue'
export const ada_data = defineStore('counter', () => {
  const rfid = ref(0)
  function increment() {
    count.value++
  }

  return { rfid, increment }
})


