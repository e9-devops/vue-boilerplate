import {authModule} from '@/webapp/common/store/modules/auth';
import {constantModule} from '@/webapp/common/store/modules/constants';
import {sideBarModule} from '@/webapp/common/store/modules/sidebar';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    modules: {
        authModule,
        constantModule,
        sideBarModule
    }
});
