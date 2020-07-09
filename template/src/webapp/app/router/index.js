import { routes } from './routes';
import Router from 'vue-router';
import Vue from 'vue';

Vue.use(Router);

export default new Router({
    routes,
    mode: 'hash',
    scrollBehavior(to, from, savedPosition) {
        if (to.hash) {
            return { selector: to.hash };
        } else if (savedPosition) {
            return savedPosition;
        } else {
            return { x: 0, y: 0 };
        }
    }
});
