import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import ClientsView from '@/views/ClientsView.vue'
import ReportView from '@/views/ReportView.vue'
import LoginView from '@/views/LoginView.vue'



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView,
      children: [
        {
          path: '/clients',
          name: 'clients',
          component: ClientsView
        },
        {
          path: '/report',
          name: 'report',
          component: ReportView
        }
      ]
    }
  ]
});
// 模拟一个简单的身份验证状态
let isAuthenticated = false;

const login = () => {
  isAuthenticated = true; // 更新登录状态
};

// 添加路由守卫
router.beforeEach((to, from, next) => {
  if (to.name !== 'login' && !isAuthenticated) {
    next({ name: 'login' }); // 如果未登录，重定向到登录页面
  } else {
    next(); // 允许访问
  }
});

export { router, login }; // 导出登录函数供使用
export default router;