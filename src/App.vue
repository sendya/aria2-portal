<template>
  <a-config-provider :locale="zh">
    <router-view />
  </a-config-provider>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { loadLanguageAsync } from '@/locales';
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
    useAutoRefresh(store.dispatch('worker/update') as unknown as () => Promise<any>, 1000);
    return {
      zh,
    };
  },
});
</script>
