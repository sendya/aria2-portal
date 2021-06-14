<template>
  <pro-layout
    v-model:openKeys="layoutState.openKeys"
    v-model:selectedKeys="layoutState.selectedKeys"
    v-model:collapsed="layoutState.collapsed"
    v-bind="layoutConf"
    :locale="t"
    :menu-data="menuData"
  >
    <template #menuHeaderRender>
      <a>
        <CloudDownloadOutlined
          style="font-size: 28px; display: inline-block; height: 32px; vertical-align: middle"
        />
        <h1 v-if="!layoutState.collapsed || layoutConf.layout === 'mix'">Aria2 Portal</h1>
      </a>
    </template>
    <template #rightContentRender>
      <RightContent :theme="layoutConf.theme" />
    </template>
    <router-view />
  </pro-layout>
</template>

<script lang="ts">
import { defineComponent, reactive, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { getMenuData } from '@ant-design-vue/pro-layout';
import { CloudDownloadOutlined } from '@ant-design/icons-vue';
import RightContent from '@/components/right-content/index.vue';

export default defineComponent({
  components: {
    RightContent,
    CloudDownloadOutlined,
  },
  setup() {
    const { t } = useI18n();
    const router = useRouter();
    const layoutState = reactive<{
      collapsed: boolean;
      openKeys: string[];
      selectedKeys: string[];
    }>({
      collapsed: false,
      openKeys: [],
      selectedKeys: [],
    });
    const layoutConf = reactive({
      layout: 'mix',
      theme: 'dark',
      // navTheme: 'dark',
      splitMenus: true,
      fixedHeader: true,
      fixSiderbar: true,
    });

    const { menuData } = getMenuData(router.getRoutes());

    watchEffect(() => {
      layoutState.selectedKeys = router.currentRoute.value.matched.concat().map(r => r.path);
    });

    return {
      t,
      menuData,
      layoutState,
      layoutConf,
    };
  },
});
</script>
