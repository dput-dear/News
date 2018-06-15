import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Index from '@/components/index'
import News from '@/components/news'
import AddNews from '@/components/addNews'
import NewsDetail from '@/components/newsDetail'

Vue.use(Router)

export default new Router({
  routes: [
    {
        path: '/',
        name: 'index',
        component: Index
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/new',
        name: 'news',
        component: News
    },
    {
        path: '/addNews',
        name: 'addNews',
        component: AddNews
    },
    {
        path: '/newsDetail',
        name: 'newsDetail',
        component: NewsDetail
    }
  ]
})
