import '@/config';
import '@/scss/style.scss';
import Login from './Login.vue';
import Vue from 'vue';
import VueCookies from 'vue-cookies';

Vue.config.productionTip = false;
Vue.prototype.ENDPOINT = window.endpoint;
Vue.use(VueCookies);

new Vue({
    render: (h) => h(Login)
}).$mount('#login');
