import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
console.log(Router)
import Layout from '@/layout'


export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  },
  {
    path: '/paper',
    component: Layout,
    alwaysShow: true,
    meta: { title: '试卷管理', icon: 'nested', affix: true },
    children: [
      {
        path: 'question_list',
        component: () => import('@/views/paper/index'),
        name: 'course',
        meta: { title: '试卷列表', affix: true }
      }
    ]
  },
  {
    path: '/course',
    component: Layout,
    alwaysShow: true,
    meta: { title: '习题管理', icon: 'form', affix: true },
    children: [
      {
        path: 'question_list',
        component: () => import('@/views/course-enter/question_list'),
        name: 'course',
        meta: { title: '习题列表', affix: true }
      },
      {
        path: 'question_add',
        component: () => import('@/views/course-enter/add'),
        name: 'course',
        meta: { title: '添加习题', affix: true }
      }
    ]
  },
  {
    path: '/knowledge',
    component: Layout,
    alwaysShow: true,
    meta: { title: '知识点管理', icon: 'example', affix: true },
    children: [
      {
        path: 'know_ledge_list',
        component: () => import('@/views/knowledge-enter/know_ledge_list'),
        name: 'course',
        meta: { title: '知识点列表', affix: true }
      },
      {
        path: 'knowledge_add',
        component: () => import('@/views/knowledge-enter/add'),
        name: 'course',
        meta: { title: '添加知识点', affix: true }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true },
  
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
