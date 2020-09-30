import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'

import BaseLayout from '@/views/layouts/BaseLayout.vue'
import ChildLayout from '@/views/layouts/ChildLayout.vue'
import Dashboard from '@/views/Dashboard.vue'

import Login from '@/views/Login.vue'
import NotFound from '@/views/NotFound.vue'

import Users from '@/views/Users.vue'
import UserEdit from '@/views/user/UserEdit.vue'
import UserNew from '@/views/user/UserNew.vue'

import Metrics from '@/views/Metrics.vue'
import MetricEdit from '@/views/metric/MetricEdit.vue'
import MetricNew from '@/views/metric/MetricNew.vue'

import Components from '@/views/Components.vue'
import ComponentEdit from '@/views/component/ComponentEdit.vue'
import ComponentNew from '@/views/component/ComponentNew.vue'

import ComponentGroups from '@/views/ComponentGroups.vue'
import ComponentGroupEdit from '@/views/component-group/ComponentGroupEdit.vue'
import ComponentGroupNew from '@/views/component-group/ComponentGroupNew.vue'

import Incidents from '@/views/Incidents.vue'
import IncidentEdit from '@/views/incident/IncidentEdit.vue'
import IncidentNew from '@/views/incident/IncidentNew.vue'
import IncidentUpdateEdit from '@/views/incident/IncidentUpdateEdit.vue'
import IncidentUpdateNew from '@/views/incident/IncidentUpdateNew.vue'



const routes = [
    {
        path: '/',
        name: 'home',
        component: BaseLayout,
        children: [
        { 
            path: '', 
            redirect: { name: 'dashboard' }
        },
        {
            path: 'dashboard',
            name: 'dashboard',
            component: Dashboard
        },
        {
            path: 'users',
            name: 'users-layout',
            component: ChildLayout,
            children: [
            {
                path: '',
                name: 'users',
                component: Users
            },
            {
                path: 'new',
                name: 'user-new',
                component: UserNew
            },
            {
                path: ':id/edit',
                name: 'user-edit',
                component: UserEdit
            }   
            ]
        },
        {
            path: 'metric',
            name: 'metrics-layout',
            component: ChildLayout,
            children: [
            {
                path: '',
                name: 'metrics',
                component: Metrics
            },
            {
                path: 'new',
                name: 'metric-new',
                component: MetricNew
            },
            {
                path: ':id/edit',
                name: 'metric-edit',
                component: MetricEdit
            }   
            ]
        },
        {
            path: 'component',
            name: 'components-layout',
            component: ChildLayout,
            children: [
            {
                path: '',
                name: 'components',
                component: Components
            },
            {
                path: 'new',
                name: 'component-new',
                component: ComponentNew
            },
            {
                path: ':id/edit',
                name: 'component-edit',
                component: ComponentEdit
            }   
            ]
        },
        {
            path: 'component-group',
            name: 'component-groups-layout',
            component: ChildLayout,
            children: [
            {
                path: '',
                name: 'component-groups',
                component: ComponentGroups
            },
            {
                path: 'new',
                name: 'component-group-new',
                component: ComponentGroupNew
            },
            {
                path: ':id/edit',
                name: 'component-group-edit',
                component: ComponentGroupEdit
            }   
            ]
        },
        {
            path: 'incident',
            name: 'incidents-layout',
            component: ChildLayout,
            children: [
            {
                path: '',
                name: 'incidents',
                component: Incidents
            },
            {
                path: 'new',
                name: 'incident-new',
                component: IncidentNew
            },
            {
                path: ':id/edit',
                name: 'incident-edit',
                component: IncidentEdit
            },
            {
                path: 'update/:id/edit',
                name: 'update-edit',
                component: IncidentUpdateEdit
            },
            {
                path: ':id/update/',
                name: 'update-new',
                component: IncidentUpdateNew
            }   
            ]
        },
        ],
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/:catchAll(.*)',
        name: 'notfound',
        component: NotFound
    }
]

const router = createRouter({
    linkActiveClass: "is-active",
    linkExactActiveClass: "is-active-exact",
    history: createWebHistory(process.env.BASE_URL),
    routes
});

router.beforeEach((to, from, next) => {
    if (!store.getters['auth/isAuthenticated'] && !to.path.endsWith('/login')) {
        next({ name: 'login' })
    } else {
        next()
    }
})

export default router
