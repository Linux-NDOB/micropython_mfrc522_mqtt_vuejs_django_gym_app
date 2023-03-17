<script setup>
import { ref } from "vue";
import {
  client,
  onConnectionLost,
} from "../components/connect_adafruit.vue";

import { jsontoexcel } from "vue-table-to-excel";

const reports_endpoint = 'http://localhost:8000/api/reports/';
const rfid = ref(0);
const reports_list = ref({});

async function refresh_table_button(){
  const answer = await fetch(reports_endpoint);
  const answer_to_json = await answer.json();
  reports_list.value = answer_to_json;
  console.log(reports_list.value)
}

async function test() {
  console.log('start timer');
  await new Promise(resolve => setTimeout(resolve, 1000));
  refresh_table_button()
}

test();

client.onConnectionLost = onConnectionLost ;
client.onMessageArrived =  onMessageArrived;

async function onMessageArrived(message) {
  // Message incoming from mqtt server
  test()
}

function download(){
  const table_data = JSON.parse(JSON.stringify(reports_list.value.in_report_list))
  //const table_header = Object.getOwnPropertyNames(table_data[0]);
  const table_header = [ "Reporte",  "Cedula", "Nombre", "Fecha de Reporte", "Hora de entrada", "Hora de salida"]
  const fileName = "Reportes.xlsx"

  jsontoexcel.getXlsx(table_data, table_header, fileName);
  }

refresh_table_button()
</script>

<template>
  <div class='container center'>
    <h5><b>Seccion de reportes</b></h5>
    <table>
        <thead>
          <tr>
              <th>#</th>
              <th>Cedula</th>
              <th>Nombre</th>
              <th>Fecha de reporte</th>
              <th>Hora entrada</th>
              <th>Hora de salida</th>
          </tr>
        </thead>
        <tbody>
         <tr>
          <td></td>
        </tr>
        
        <tr v-for='item of reports_list.in_report_list' :key='item.report_id'>
            <td>{{item.report_id}}</td>
            <td>{{item.person_id}}</td>
            <td>{{item.name}}</td>
            <td>{{item.report_date}}</td>
            <td>{{item.start_hour}}</td>
            <td>{{item.finish_hour}}</td>
          </tr>
       
        </tbody>
         <tr>
          <td></td>
          </tr>
      </table>
    <a class='btn black white-text center' @click='download'>Descargar reporte</a>
   </div>
</template>
