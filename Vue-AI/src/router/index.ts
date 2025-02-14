// 创建一个路由器，并暴露出去

// 第一步：引入createRouter
import {createRouter,createWebHistory} from 'vue-router'
// 引入一个一个可能要呈现组件
import Home from '@/pages/Home.vue'
import Login from '@/pages/Login.vue'
import Newconversation from '@/pages/Newconversation.vue'
import Oldconversation  from "@/pages/Oldconversation.vue";

import Manage from "@/pages/Manage.vue";

// 第二步：创建路由器
const router = createRouter({
    history:createWebHistory(), //路由器的工作模式
    routes:[ //一个一个的路由规则


        {
            path:'/login',
            name:'login',
            component:Login
        },
        {
            path:'/manage',
            name:'manage',
            component:Manage,
            children:[
                {
                    path:'home',
                    name:'home',
                    component:Home
                },
                {
                    path:'new',
                    name:'new',
                    component:Newconversation
                },
                {
                    path:'old',
                    name:'old',
                    component:Oldconversation
                },


            ]
        },
        {
            path: '/',
            redirect: '/login'
        },
    ]
})

// 暴露出去router
export default router
