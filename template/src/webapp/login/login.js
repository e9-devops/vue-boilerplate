import Vue from 'vue';
import Login from './Login.vue';
import VueCookies from 'vue-cookies';
import '@/scss/style.scss';

Vue.config.productionTip = false;
Vue.prototype.ENDPOINT = window.endpoint;
Vue.use(VueCookies);

new Vue({
    render: (h) => h(Login)
}).$mount('#login');
