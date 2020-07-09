/* eslint-disable sort-imports-es6-autofix/sort-imports-es6 */
// DO NOT Remove above line to make sure how routes should be visible in your sidebar controlled by store
import dashboardRoutes from '../dashboard/routes';

export const routes = [
    {
        path: '',
        redirect: '/dashboard'
    },
    ...dashboardRoutes,
    {
        path: '*',
        redirect: '/dashboard'
    }
];
