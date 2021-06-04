import 'ant-design-vue/dist/antd.less';
import './app.less';

import { createApp } from 'vue';
import ProLayout, { PageContainer } from '@ant-design-vue/pro-layout';
import antd from 'ant-design-vue';
import router from './router';
import store from './store';
import i18n from './locales';
import App from './App.vue';
import icons from './utils/icons';

createApp(App)
  .use(router)
  .use(i18n)
  .use(store)
  .use(antd)
  .use(ProLayout)
  .use(PageContainer)
  .use(icons)
  .mount('#app');
