import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import i18n, { loadLanguageAsync } from '@/locales';
import UserLayout from '@/layouts/UserLayout.vue';
import BasicLayout from '@/layouts/BasicLayout.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'index',
    meta: { title: '' },
    component: BasicLayout,
    redirect: '/downloading',
    children: [
      {
        path: '/downloading',
        name: 'downloading',
        meta: { title: 'pages.downloading.title', icon: 'CloudDownloadOutlined' },
        component: () => import('@/views/downloading.vue'),
      },
      {
        path: '/stopped',
        name: 'stopped',
        meta: { title: 'pages.stopped.title', icon: 'CheckCircleOutlined' },
        component: () => import('@/views/downloading.vue'),
      },
      {
        path: '/setting',
        name: 'setting',
        meta: { title: 'pages.setting.title', icon: 'SettingOutlined' },
        component: () => import('@/views/setting.vue'),
      },
    ],
  },
];

const baseRoutes: RouteRecordRaw[] = [
  {
    path: '/auth',
    name: 'auth',
    meta: { hideInMenu: true },
    component: UserLayout,
    children: [
      {
        path: 'login',
        name: 'login',
        meta: { title: 'pages.auth.login.title' },
        component: () => import('@/views/auth/login.vue'),
      },
    ],
  },
  {
    path: '/:pathMatch(.*)',
    component: () => import('@/views/404.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: [...routes, ...baseRoutes],
});

router.beforeEach(async () => {
  // load locale messages
  if (!i18n.global.availableLocales.includes('zh-CN')) {
    await loadLanguageAsync('zh-CN');
  }
});

export default router;
