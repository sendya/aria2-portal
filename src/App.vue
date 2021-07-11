<template>
  <a-config-provider :locale="zh">
    <router-view />
  </a-config-provider>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { loadLanguageAsync } from '@/locales';
import { getVersion } from '@/api/rpc';
import useAutoRefresh from '@/utils/hooks/useAutoRefresh';

import zh from 'ant-design-vue/es/locale/zh_CN';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'App',
  setup() {
    const store = useStore();
    const lang = localStorage.getItem('app-i18n');
    if (lang) {
      loadLanguageAsync(lang);
    }
    onMounted(() => {
      // check rpc
      getVersion()
        .then(data => {
          console.log('data', data);
        })
        .catch(e => {
          console.log('e', e);
        });
    });
    useAutoRefresh(() => {
      // store.dispatch('worker/update');
    }, 1000);

    return {
      zh,
    };
  },
});
</script>
