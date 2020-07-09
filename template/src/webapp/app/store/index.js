import Vue from 'vue';
import Vuex from 'vuex';
import {authModule} from '@/webapp/common/store/modules/auth';
import {constantModule} from '@/webapp/common/store/modules/constants';

Vue.use(Vuex);

export const store = new Vuex.Store({
    modules: {
        authModule,
        constantModule
    }
});
