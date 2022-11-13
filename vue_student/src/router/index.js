import Vue from "vue";
// 导入路由
import Router from "vue-router";
// 使用路由
Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            // 路由重定向
            redirect: '/login',
            hidden: true,
            name: '',
            icon: 'el-icon-user',
            // 路由懒加载模式
            component: () => import('@/components/login'),
        },
        {
            // 登录路由
            path: '/login',
            name: 'Login',
            icon: 'el-icon-user',
            hidden: true,
            // 路由懒加载模式
            component: () => import('@/components/login'),
        },
        {
            // 主页路由
            path: '/home',
            name: '数据分析',
            redirect: '/home/dataShow',
            icon: 'el-icon-data-line',
            type: 1,
            // 路由懒加载模式
            component: () => import('@/components/Home'),
            children: [
                {
                    path: "/home/dataShow",
                    name: '数据预览',
                    icon: 'el-icon-pie-chart',
                    component: () => import("@/views/dataShow"),
                }
            ]
        },
        {
            // 主页路由
            path: '/home',
            name: '社团管理',
            // redirect: '/home/association',
            icon: 'el-icon-s-unfold',
            // 路由懒加载模式
            component: () => import('@/components/Home'),
            children: [
                {
                    path: '/home/association',
                    name: "社团信息",
                    icon: 'el-icon-document-copy',
                    type: 1,
                    component: () => import('@/views/association'),
                    meta: { ifShow: false }
                },
                {
                    path: '/home/salon',
                    name: '社团活动',
                    icon: 'el-icon-s-order',
                    component: () => import('@/views/salon'),
                },
                {
                    path: '/home/capital',
                    name: '社团资金',
                    icon: 'el-icon-coin',
                    component: () => import('@/views/capital'),
                },
                {
                    path: '/home/material',
                    component: () => import('@/views/material'),
                    name: '社团物资',
                    icon: 'el-icon-box',
                }
            ]
        },
        {
            // 主页路由
            path: '/home',
            name: '用户管理',
            icon: 'el-icon-folder',
            // 路由懒加载模式
            component: () => import('@/components/Home'),
            children: [
                {
                    path: '/home/president',
                    name: '会长信息',
                    icon: 'el-icon-user-solid',
                    type: 1,
                    component: () => import('@/views/president'),
                },
                {
                    path: '/home/user',
                    name: '学生信息',
                    icon: 'el-icon-user',
                    component: () => import('@/views/user'),
                }
            ]
        },
        {
            // 主页路由
            path: '/home',
            name: '个人中心',
            icon: 'el-icon-s-custom',
            // 路由懒加载模式
            component: () => import('@/components/Home'),
            children: [
                {
                    path: '/home/info',
                    name: '个人信息',
                    icon: 'el-icon-s-unfold',
                    component: () => import('@/views/info'),
                }
            ]
        },

        {
            path: '*',
            hidden: true,
            component: () => import('@/components/404'),
        }
    ],
    mode: 'history'
});