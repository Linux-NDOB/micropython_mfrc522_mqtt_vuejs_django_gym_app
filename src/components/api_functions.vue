<script >
export function swal_table_refreshed() {
  Swal.fire({
    icon: "success",
    title: "Exito...",
    text: "La tabla se ha refrescado!",
  });
}

export function swal_added_to_reports() {
  Swal.fire({
    icon: "success",
    title: "Exito...",
    text: "Aniadido a la lista de reportes!",
  });
}
export function swal_added_to_actives() {
  Swal.fire({
    icon: "success",
    title: "Exito...",
    text: "Agregado a la lista de activos!",
  });
}

export function swal_rfid_not_found() {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: "El id NFC no existe!",
  });
}

export function swal_user_existance() {
  Swal.fire({
    icon: "succes",
    title: "Exito...",
    text: "El usuario existe!",
  });
}

export function swal_user_not_found() {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: "El usuario no existe!",
  });
}

export function swal_user_deletion_error() {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: "El usuario no se pudo eliminar!",
  });
}

function swal_user_deleted() {
  Swal.fire({
    //position: 'top-end',
    icon: "success",
    title: "Usuario eliminado con exito!",
    showConfirmButton: false,
    timer: 2500,
  });
}

export function swal_user_creation_error() {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: "Error en el formulario!",
  });
}

function swal_user_created() {
  Swal.fire({
    icon: "success",
    title: "Usuario creado con exito!",
    showConfirmButton: false,
    timer: 2500,
  });
}

export async function create_user(endpoint, information) {
  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      person_id: information.cc,
      rfid: information.rfid,
      name: information.name,
      lastname: information.lastname,
      phone: information.phone,
    }),
  });
  const user = await res.json();
  swal_user_created();
}

export async function validate_id_existance(endpoint, id) {
  const res = await fetch(endpoint + String(id));
  const us = await res.json();
  //console.log(us);
  let ex = false;
  us.hasOwnProperty("msg") || id == "" ? (ex = false) : (ex = true);
  return ex;
}

export async function delete_user_function(endpoint, id) {
  fetch(endpoint + id, {
    method: "DELETE",
  }).then((res) => res.json());
  swal_user_deleted();
}
export async function delete_user(endpoint, id) {
  let validate_state = await validate_id_existance(endpoint, id);
  validate_state ? delete_user_function(endpoint, id) : swal_user_not_found();
}

// USERS COMPONENT
export async function validate_rfid_existance(endpoint, rfid) {
  const answer = await fetch(endpoint + rfid);
  const answer_to_json = await answer.json();
  let existance = false;

  answer_to_json.hasOwnProperty("msg")
    ? (existance = false)
    : (existance = true);

  return existance;
}

export async function is_in_actives(rfid, recieved_boolean) {
  const actives_endpoint = "http://localhost:8000/api/actives/";
  const existance = recieved_boolean;
  console.log('ISEXISTANCE:', recieved_boolean)

  const endpoint_and_rfid = actives_endpoint + rfid;
  let active = false;

  if (existance) {
    const answer = await fetch(endpoint_and_rfid);
    const answer_to_json = await answer.json();
    answer_to_json.hasOwnProperty("msg") ? (active = false) : (active = true);
  } else {
    console.log("No existe en activos");
  }
  return active;
}

export async function add_to_actives(rfid) {
  const endpoint_to_rfid = "http://localhost:8000/api/rfids/";
  const endpoint_to_actives = "http://localhost:8000/api/actives/";
  const data_to_actives = await get_by_rfid(endpoint_to_rfid, rfid);
  const date = new Date();
  const hours = date.toLocaleTimeString(); 

  const touched_data = {
    rfid: data_to_actives.rfid,
    person: data_to_actives.person_id,
    name: data_to_actives.name,
    start_hour: hours,
    finish_hour: "",
  };

  const res = await fetch(endpoint_to_actives, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(touched_data),
  });

  swal_added_to_actives();
}

export async function get_by_rfid(endpoint, rfid) {
  const answer = await fetch(endpoint + rfid);
  const answer_to_json = await answer.json();
  return answer_to_json.rfid;
}

export async function get_actives(endpoint, rfid) {
  const answer = await fetch(endpoint + rfid);
  const answer_to_json = await answer.json();
  return answer_to_json.rfid;
}

export async function generate_report(rfid) {
  const endpoint_to_actives = "http://localhost:8000/api/actives/";
  const endpoint_to_reports = "http://localhost:8000/api/reports/";
  const answer = await fetch(endpoint_to_actives + rfid);
  const answer_to_json = await answer.json();
  const data_to_reports = answer_to_json.active;
  const date = new Date();
  const hours = date.toLocaleTimeString();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const date_with_hyphens = [year, month, day].join("-");

  const touched_data = {
    person: data_to_reports.person_id,
    name: data_to_reports.name,
    start_hour: data_to_reports.start_hour,
    finish_hour: hours,
    report_date: date_with_hyphens,
  };

  const res = await fetch(endpoint_to_reports, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(touched_data),
  });
  swal_added_to_reports();
}
</script>

