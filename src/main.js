import Vue from 'vue'
import App from './App.vue'
import firebase from 'firebase/app'

import router from './router'
import store from './store'
import vuelidate from 'vuelidate'
import paginate from 'vuejs-paginate'

import message from './common/plugin.message'
import loader from '@/components/app/loader'
import date from '@/filters/date'
import currency from '@/filters/currency'
import tooltipe from '@/directives/tooltipe'

import './registerServiceWorker'
import 'materialize-css/dist/js/materialize.min'

import 'firebase/auth'
import 'firebase/database'

Vue.config.productionTip = false

Vue.component('loader', loader)

Vue.use(vuelidate)
Vue.use(message)

Vue.filter('date', date)
Vue.filter('currency', currency)

Vue.directive('tooltipe', tooltipe)

Vue.component('paginate', paginate)

firebase.initializeApp({
	apiKey: 'AIzaSyDXrPCkSk5QW9oIvTdN5bXIs-2UO0oen4s',
	authDomain: 'crm-app-vue.firebaseapp.com',
	databaseURL: 'https://crm-app-vue.firebaseio.com',
	projectId: 'crm-app-vue',
	storageBucket: 'crm-app-vue.appspot.com',
	messagingSenderId: '694543055204',
	appId: '1:694543055204:web:88d05d97f4d9bd5b8ce271',
	measurementId: 'G-8K6825XD47',
})

let app

firebase.auth().onAuthStateChanged(() => {
	if (!app) {
		app = new Vue({
			router,
			store,
			render: h => h(App),
		}).$mount('#app')
	}
})
