<template>
  <a-config-provider :locale="zh">
    <router-view />
  </a-config-provider>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import zh from 'ant-design-vue/es/locale/zh_CN';

export default defineComponent({
  name: 'App',
  setup() {
    return {
      zh,
    };
  },
});
</script>
