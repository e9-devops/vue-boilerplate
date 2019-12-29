// all the global components should go here
import Vue from 'vue';

import formFor from './field-for/FormFor';
import subFormFor from './field-for/SubFormFor';
import fieldFor from './field-for/FieldFor';
import Loader from '@/e9_components/components/Loader';

Vue.component('formFor',formFor);
Vue.component('subFormFor',subFormFor);
Vue.component('fieldFor',fieldFor);
Vue.component('Loader',Loader);
