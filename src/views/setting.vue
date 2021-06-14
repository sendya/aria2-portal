<template>
  <page-container :title="t('pages.setting.title')" v-bind="pageProps">
    <template #extra>
      <a-button key="1" type="primary">保存设置</a-button>
      <a-button key="2">还原</a-button>
    </template>
    <a-card class="pro-table-wrapper" :bordered="false">
      <SettingGlobal v-if="pageProps.tabActiveKey === 'setting-global'" />
      <RPC v-else />
    </a-card>
  </page-container>
</template>

<script lang="ts">
import { defineComponent, reactive, h } from 'vue';
import { useI18n } from 'vue-i18n';
import { PlusOutlined } from '@ant-design/icons-vue';
import SettingGlobal from './components/SettingGlobal.vue';
import RPC from './components/RPC.vue';

export default defineComponent({
  components: {
    SettingGlobal,
    RPC,
  },
  setup() {
    const { t } = useI18n();
    const pageProps = reactive({
      tabList: [
        { key: 'setting-global', tab: '全局' },
        { key: 'setting-rpc1', tab: 'RPC(connect..', disabled: false },
        { key: 'new-rpc', tab: h('span', [h(PlusOutlined)]), disabled: false },
      ],
      tabProps: {
        type: 'card',
      },
      tabActiveKey: 'setting-global',
      onTabChange: key => {
        if (key === 'new-rpc') {
          return;
        }
        pageProps.tabActiveKey = key;
      },
    });

    return { t, pageProps };
  },
});
</script>

<style lang="less" scoped>
.pro-table-wrapper {
  :deep(.ant-card-body) {
    padding: 0;
  }
}
</style>
