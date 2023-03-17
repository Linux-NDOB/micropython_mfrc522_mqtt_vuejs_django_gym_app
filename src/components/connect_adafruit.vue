<script >
//---MQTT SIDE---
// Create a client instance
export const client = new Paho.MQTT.Client(
  "io.adafruit.com",
  443,
  "/ws",
  "ClientId"
);
// set callback handlers
// connect the client
client.connect({
  onSuccess: onConnect,
  userName: "SirAstolf",
  password: "aio_Stcj91U9ifefquhG9IrYsDlRqdec",
  mqttVersion: 3,
});

// called when the client connects
export function onConnect() {
  // Once a connection has been made, make a subscription and send a message.
  console.log("onConnect");
  client.subscribe("SirAstolf/feeds/rfid");
  console.log("Connected now");
  //const message = new Paho.MQTT.Message("Hello from JS");
  //message.destinationName = "bomb-state";
  //client.send(message);
}

// called when the client loses its connection
export function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0) {
    console.log("onConnectionLost:" + responseObject.errorMessage);
  }
}

// called when a message arrives
// Assigns the sensor values to reactive variables and calls
// the update_chart method
//console.log("onMessageArrive

export function swal_confirm_copy_text() {
  console.log("notify");
  Swal.fire({
    //position: 'top-end',
    icon: "success",
    title: "Copiado con exito al portapapeles",
    showConfirmButton: false,
    timer: 2500,
  });
}

export function copy_rfid(text) {
  navigator.clipboard.writeText(text);
  swal_confirm_copy_text();
}
</script>
