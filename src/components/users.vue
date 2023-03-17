<script setup>
import { ref, onMounted } from "vue";
import { client, onConnectionLost } from "../components/connect_adafruit.vue";
import {
  generate_report,
  delete_user_function,
  add_to_actives,
  swal_rfid_not_found,
  is_in_actives,
  validate_rfid_existance,
} from "../components/api_functions.vue";
const endpoint = "http://localhost:8000/api/rfids/";
const actives_endpoint = "http://localhost:8000/api/actives/";
const rfid = ref(0);
const actives_list = ref({});

async function refresh_table_button() {
  const answer = await fetch(actives_endpoint);
  const answer_to_json = await answer.json();
  actives_list.value = answer_to_json;
  console.log(answer_to_json)
}

async function test() {
  console.log("start timer");
  await new Promise((resolve) => setTimeout(resolve, 1000));
  refresh_table_button();
}

client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;

async function onMessageArrived(message) {
  // Message incoming from mqtt server
  console.log("msg arived");
  let payload = message.payloadString;
  rfid.value = payload;

  const validate_rfid = await validate_rfid_existance(endpoint, payload);

  console.log("validate_rfid: ", validate_rfid);

  const actives = await is_in_actives(payload, validate_rfid);

  console.log("Actives", actives);

  if (validate_rfid == true) {
    console.log("rfid existe");
    if (actives == true) {
      generate_report(payload);

      delete_user_function(actives_endpoint, payload);
    } else {
      console.log("actives: ", actives);
      console.log("trash");
      add_to_actives(payload);
    }
  } else {
    swal_rfid_not_found();
  }

  test();
}
 test();
</script>

<template>
  <div class="container center">
    <h5><b>Seccion de usuarios activos</b></h5>

    <table>
      <thead>
        <tr>
          <th>Id NFC</th>
          <th>C.C</th>
          <th>Nombre</th>
          <th>Hora entrada</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td></td>
        </tr>
         <tr v-for="item of actives_list.actives_list" :key='item.rfid'>     
           <td>{{item.rfid}}</td> 
           <td>{{item.person_id}}</td> 
           <td>{{item.name}}</td> 
           <td>{{item.start_hour}}</td> 
          </tr> 
      </tbody>
      <tr>
        <td></td>
      </tr>
    </table>
    <a class="btn black white-text center" @click="refresh_table_button"
      >Refrescar</a
    >
  </div>
</template>
