import '@/config';
import '@/plugins';
import '@/plugins/vue-cookies';
import '@/scss/style.scss';
import {store} from '@/webapp/app/store';
import App from './App';
import router from '@/webapp/app/router';
import Vue from 'vue';

import ApiService from '@/services/ApiService';

Vue.config.productionTip = false;

if (Vue.$cookies.get('token')) {
    Vue.prototype.momemt = require('moment');
    Vue.prototype.ENDPOINT = window.endpoint;
    ApiService.init();
    window.$ = require('jquery');
    new Vue({
        render: (h) => h(App),
        router,
        store
    }).$mount('#app');
} else {
    window.location.href = '/index.html';
}
