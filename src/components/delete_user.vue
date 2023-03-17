
<script>
import { delete_user, validate_id_existance, swal_user_deletion_error } from '../components/api_functions.vue';
import { reactive, computed } from "vue";
import useVuelidate from "@vuelidate/core";
import {
  required,
  minLength,
  maxLength,
  sameAs,
  numeric,
} from "@vuelidate/validators";

import Footer from '../components/footer.vue';
export default {
  data() {
    return {
      v$: useVuelidate(),
    };
  },
  setup() {
    const endpoint = "http://localhost:8000/api/persons/";
    const state = reactive({
      cc: "",
          });

    const rules = computed(() => {
      return {
          cc: {
          required,
          minLength: minLength(1),
          maxLength: maxLength(15),
          numeric,
        },
      };
    });

    const v$ = useVuelidate(rules, state);

    return { state, v$, endpoint };
  },

  methods: {
    clean_fields(){
      this.state.cc = '';
    },
    validate_id_form : async function(){
      this.v$.$validate();

      !this.v$.$error 
        ? delete_user(this.endpoint, this.state.cc) && this.clean_fields()
        : swal_user_deletion_error()

    }

  },

  mounted() {
    M.AutoInit();
  },
};
</script>

<template>
  <div class="container">
    <div class="row align-items center">
      <div class="card">
        <div class="card-title black-text">
          <h5><b>ELIMINAR USUARIO</b></h5>
        </div>
        <div class="card-content row">
          <div class="input-field">
            <ul class="valign-wrapper">
              <li class="col s2">
                <font-awesome-icon icon="fa-solid fa-trash" />
              </li>
              <li class="col s10">
                <input
                  Placeholder="Cedula"
                  id="first_name"
                  type="text"
                  class="validate"
                  v-model='state.cc'
                />
              </li>
            </ul>
          </div>
          <div></div>
          <a class="btn black white-text" @click='validate_id_form()'>Eliminar</a>
        </div>
      </div>
    </div>
  </div>
</template>
