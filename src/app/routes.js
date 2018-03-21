
import app from './app.vue'

import loginLayout from '../partials/layouts/loginLayout/loginLayout.vue'


import dashboardLayout from '../partials/layouts/dashboardLayout/dashboardLayout.vue'


import parentComLayout from '../partials/layouts/parentComLayout/parentComLayout.vue'
import addDriver from '../pages/add_driver/add_driver.vue'



const routes = [
    {
        path: '/admin',
        component: app,
        children: [
            {
                path: '',
                component: dashboardLayout,
                meta: {
                    requiresAuth: true
                },
                children: [
                    {
                        path: '',

                    },

                    {
                        path: 'drivers',
                        component: parentComLayout,
                        children: [
                            {path: 'add_driver', component: addDriver},

                        ]
                    },
                ]
            },
            {
                path: 'login',
                component: loginLayout,
                meta: {
                    requiresAuth: false
                },
                children: [
                    {path: ''},
                ]
            },
            {
                path: '*',
            }
        ]
    }
];

module.exports = routes;