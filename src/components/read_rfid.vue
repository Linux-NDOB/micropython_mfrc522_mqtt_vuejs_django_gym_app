<script setup>
import {
  client,
  onConnect,
  onConnectionLost,
  copy_rfid,
} from "../components/connect_adafruit.vue";

import Footer from '../components/footer.vue';
// import {ref} from 'vue';
// import {ada_data} from '../adafruit.js';
// import { storeToRefs } from 'pinia'
// //console.log(ada_data)
// const store = ada_data()
//
// let { rfid } = storeToRefs(store)
//
// //let rfids = store.rfid;

import { ref } from "vue";
const rfid = ref(0);
//import { getCurrentInstance } from 'vue';
//import { ada_data } from '../adafruit.js';

client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;

function onMessageArrived(message) {
  //console.log("onMessageArrived:"+message.payloadString);

  // Message incoming from mqtt server
  let payload = message.payloadString;

  rfid.value = payload;

  console.log(rfid);
  //console.log(payload);

  // Message to json
  //let json = JSON.parse(payload);

  // Object destructuration
  //let { temperature, humidity } = json;

  // Assigns values from server to reactive vars
}
</script>

<template>
  <div class="container">
    <div class="row align-items center">
      <div class="card">
        <div class="card-title black-text">
          <h5><b>ID DE LA TARJETA LEIDA</b></h5>
        </div>
        <div class="card-content row">
          <div class="input-field">
            <ul class="valign-wrapper">
              <li class="col s2">
                <font-awesome-icon icon="fa-solid fa-sd-card" />
              </li>
              <li class="col s10">
                <input
                  disabled
                  id="disabled"
                  type="text"
                  class="validate"
                  v-model="rfid"
                />
              </li>
            </ul>
          </div>
          <div></div>

          <a class="btn black white-text" @click="copy_rfid(rfid)">Copiar</a>
        </div>
      </div>
    </div>
  </div>
</template>
