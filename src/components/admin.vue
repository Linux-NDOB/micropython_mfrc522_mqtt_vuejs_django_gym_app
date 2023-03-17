<script setup>
import { onMounted } from "vue";
import add_user from "../components/add_user.vue";
import delete_user from "../components/delete_user.vue";
import read_rfid from "../components/read_rfid.vue";

import Footer from '../components/footer.vue';
onMounted(() => {
  M.AutoInit();
});
</script>

<template>
  <div class="container row">
    <ul id="tabs-swipe-demo" class="tabs">
      <li class="tab col s4">
        <a href="#test-swipe-1" class="black white-text">Aniadir Usuario</a>
      </li>
      <li class="tab col s4">
        <a class="active black white-text" href="#test-swipe-2"
          >Eliminar Usuario</a
        >
      </li>
      <li class="tab col s4">
        <a class="active black white-text" href="#test-swipe-3"
          >Lector de Tarjetas</a
        >
      </li>
    </ul>
    <div id="test-swipe-1" class="col s12"><add_user /></div>
    <div id="test-swipe-2" class="col s12"><delete_user /></div>
    <div id="test-swipe-3" class="col s12"><read_rfid /></div>
  </div>
</template>
