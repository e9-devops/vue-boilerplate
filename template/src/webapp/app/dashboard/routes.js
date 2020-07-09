import {store} from '../store';
import Dashboard from './Dashboard';

export default [{
    path: '/dashboard',
    component: Dashboard,
    name: 'Dashboard'
}];

store.state['sideBarModule'].menu[0].menuItems.push({
    name: 'Dashboard',
    path: '/dashboard',
    icon: 'dashboard'
});
