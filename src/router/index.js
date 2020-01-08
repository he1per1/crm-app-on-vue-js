import Vue from 'vue'
import Router from 'vue-router'

import firebase from 'firebase/app'

Vue.use(Router)

const routes = [
	{
		path: '/',
		name: 'home',
		meta: { layout: 'main', auth: true },
		component: () => import('../views/home'),
	},
	{
		path: '/login',
		name: 'login',
		meta: { layout: 'empty' },
		component: () => import('../views/login'),
	},
	{
		path: '/registration',
		name: 'registration',
		meta: { layout: 'empty' },
		component: () => import('../views/registration'),
	},
	{
		path: '/categories',
		name: 'categories',
		meta: { layout: 'main', auth: true },
		component: () => import('../views/categories'),
	},
	{
		path: '/detail-record/:id',
		name: 'detail-record',
		meta: { layout: 'main', auth: true },
		component: () => import('../views/detail-record'),
	},
	{
		path: '/history',
		name: 'history',
		meta: { layout: 'main', auth: true },
		component: () => import('../views/history'),
	},
	{
		path: '/planning',
		name: 'planning',
		meta: { layout: 'main', auth: true },
		component: () => import('../views/planning'),
	},
	{
		path: '/profile',
		name: 'profile',
		meta: { layout: 'main', auth: true },
		component: () => import('../views/profile'),
	},
	{
		path: '/record',
		name: 'record',
		meta: { layout: 'main', auth: true },
		component: () => import('../views/record'),
	},
]

const router = new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
})

router.beforeEach((to, from, next) => {
	const user = firebase.auth().currentUser
	const require = to.matched.some(record => record.meta.auth)

	if (require && !user) {
		next('/login?message=login')
	} else {
		next()
	}
})

export default router
