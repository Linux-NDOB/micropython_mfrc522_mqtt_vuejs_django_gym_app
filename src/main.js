import { createApp } from 'vue';
import { createPinia } from 'pinia';
import './style.css'
import App from './App.vue';
const pinia = createPinia();
import router from "./router.js";
import 'materialize-css/dist/css/materialize.min.css';

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import swal from 'sweetalert2';
window.Swal = swal;
// -- FONT AWESOME ---
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core';

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

/* import specific icons */
import { faLeaf, faFaceSmile, faHome, faRightFromBracket, faFile, faChartSimple, faDumbbell, faHammer, faCircleUser, faScroll, faIdCard, faFingerprint, faUser, faMobile, faTrash, faSdCard} from '@fortawesome/free-solid-svg-icons';


/* add icons to the library */
library.add(faLeaf, faFaceSmile, faHome, faRightFromBracket, faFile, faChartSimple, faDumbbell, faHammer, faCircleUser, faScroll, faIdCard, faFingerprint, faUser, faMobile, faTrash, faSdCard)


createApp(App).use(pinia).use(router).use(VueSweetalert2).component('font-awesome-icon', FontAwesomeIcon).mount('#app')
