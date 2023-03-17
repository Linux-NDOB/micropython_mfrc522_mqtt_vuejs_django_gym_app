<script>
import {
  create_user,
  swal_user_creation_error,
} from "../components/api_functions.vue";
import { reactive, computed } from "vue";
import useVuelidate from "@vuelidate/core";
import {
  required,
  minLength,
  maxLength,
  sameAs,
  numeric,
} from "@vuelidate/validators";

export default {
  data() {
    return {
      v$: useVuelidate(),
    };
  },
  setup() {
    //const store = useStore();
    const endpoint = "http://localhost:8000/api/persons/";
    const state = reactive({
      rfid: "",
      name: "",
      lastname: "",
      cc: "",
      phone: "",
    });

    const rules = computed(() => {
      return {
        rfid: {
          required,
          minLength: minLength(1),
          maxLength: maxLength(15),
        },
        cc: {
          required,
          minLength: minLength(1),
          maxLength: maxLength(15),
          numeric,
        },

        name: {
          required,
          minLength: minLength(1),
          maxLength: maxLength(15),
        },
        lastname: {
          required,
          minLength: minLength(1),
          maxLength: maxLength(15),
        },
        phone: {
          required,
          minLength: minLength(1),
          maxLength: maxLength(10),
          numeric,
        },
      };
    });

    const v$ = useVuelidate(rules, state);

    return { state, v$, endpoint };
  },

  methods: {

    clean_fields(){
      this.state.rfid = ""
      this.state.name = ""
      this.state.lastname = ""
      this.state.cc = ""
      this.state.phone = ""
      },

    save() {
      this.v$.$validate();
      if (!this.v$.$error) {
        create_user(this.endpoint, this.state);
        this.clean_fields();
      } else {
        swal_user_creation_error();
      }
    },
    
    mounted() {
      M.AutoInit();
    },
  },
};
</script>

<template>
  <div class="container">
    <div class="row align-items center">
      <div class="card">
        <div class="card-title black-text">
          <h5><b>REGISTRAR NUEVO USUARIO</b></h5>
        </div>
        <div class="card-content row">
          <div class="input-field">
            <ul class="valign-wrapper">
              <li class="col s2">
                <font-awesome-icon icon="fa-solid fa-id-card" />
              </li>
              <li class="col s10">
                <input
                  v-model="state.rfid"
                  Placeholder="RFID"
                  id="first_name"
                  type="text"
                  class="validate"
                />
              </li>
            </ul>
          </div>

          <div class="input-field">
            <ul class="valign-wrapper">
              <li class="col s2">
                <font-awesome-icon icon="fa-solid fa-fingerprint" />
              </li>
              <li class="col s10">
                <input
                  v-model="state.cc"
                  Placeholder="Cedula"
                  id="first_name"
                  type="text"
                  class="validate"
                />
              </li>
            </ul>
          </div>

          <div class="input-field">
            <ul class="valign-wrapper">
              <li class="col s2">
                <font-awesome-icon icon="fa-solid fa-user" />
              </li>
              <li class="col s10">
                <input
                  v-model="state.name"
                  Placeholder="Nombre"
                  id="first_name"
                  type="text"
                  class="validate"
                />
              </li>
            </ul>
          </div>

          <div class="input-field">
            <ul class="valign-wrapper">
              <li class="col s2">
                <font-awesome-icon icon="fa-solid fa-user" />
              </li>
              <li class="col s10">
                <input
                  v-model="state.lastname"
                  Placeholder="Apellidos"
                  id="first_name"
                  type="text"
                  class="validate"
                />
              </li>
            </ul>
          </div>

          <div class="input-field">
            <ul class="valign-wrapper">
              <li class="col s2">
                <font-awesome-icon icon="fa-solid fa-mobile" />
              </li>
              <li class="col s10">
                <input
                  v-model="state.phone"
                  Placeholder="Telefono"
                  id="first_name"
                  type="text"
                  class="validate"
                />
              </li>
            </ul>
          </div>

          <div>
            <a class="btn black white-text" @click="save()">Guardar</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
