import { defineConfig } from 'vite';
import { resolve } from 'path';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import vueI18n from '@intlify/vite-plugin-vue-i18n';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    vueI18n({
      include: resolve(__dirname, './src/locales/lang/**'),
    }),
  ],
  resolve: {
    // alias: [
    //   // { find: /^~/, replacement: '' },
    //   { find: /^@\//, replacement: path.join(__dirname, './src/') },
    // ]
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  optimizeDeps: {
    include: [
      '@ant-design/icons-vue',
      '@ant-design-vue/use',
      'lodash-es',
      'moment/locale/eu',
      'moment/locale/zh-cn',
    ],
  },
  css: {
    postcss: {},
    preprocessorOptions: {
      less: {
        // DO NOT REMOVE THIS LINE
        javascriptEnabled: true,
      },
    },
  },
});
