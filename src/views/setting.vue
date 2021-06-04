<template>
  <page-container :title="t('pages.setting.title')" v-bind="pageProps">
    <template #extra>
      <a-button key="1" type="primary">保存设置</a-button>
      <a-button key="2">还原</a-button>
    </template>
    <a-card class="pro-table-wrapper" :bordered="false">
      <SettingGlobal />
    </a-card>
  </page-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useI18n } from 'vue-i18n';
import SettingGlobal from './components/SettingGlobal.vue';

const tabList = [
  { key: 'setting-global', tab: '全局' },
  { key: 'setting-rpc', tab: 'RPC(connect..', disabled: true },
];

export default defineComponent({
  components: {
    SettingGlobal,
  },
  setup() {
    const { t } = useI18n();
    const pageProps = {
      tabList,
      tabProps: {
        type: 'card',
      },
      tabActiveKey: 'setting-global',
    };

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
