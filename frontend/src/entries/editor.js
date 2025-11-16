import { createApp } from 'vue'
import '~/style/editor.css'
import App from '~/views/Editor.vue'
import ToastService from 'primevue/toastservice';
import PrimeVue from 'primevue/config';

const app = createApp(App);
app.use(PrimeVue, { unstyled: true });
app.use(ToastService);
app.mount('#app');

