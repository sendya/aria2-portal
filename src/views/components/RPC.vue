<template>
  <a-descriptions class="rpc-info" bordered :column="1" size="middle">
    <a-descriptions-item label="Aria2 RPC 别名">
      <a-input v-model:value="state.alias" />
    </a-descriptions-item>
    <a-descriptions-item label="Aria2 RPC 地址">
      <a-input v-model:value="state.address">
        <template #addonBefore>
          <a-select v-model:value="state.protocol" style="width: 150px">
            <a-select-option key="http">HTTP</a-select-option>
            <a-select-option key="https">HTTPS</a-select-option>
            <a-select-option key="ws">WebSocket</a-select-option>
            <a-select-option key="wss">WebSocket(SSL)</a-select-option>
          </a-select>
        </template>
      </a-input>
    </a-descriptions-item>
    <a-descriptions-item v-if="hasHTTP" label="请求方式">
      <a-select v-model:value="state.method" style="width: 100%">
        <a-select-option key="get">GET</a-select-option>
        <a-select-option key="post">POST</a-select-option>
      </a-select>
    </a-descriptions-item>
    <a-descriptions-item label="Aria2 RPC 密钥">
      <a-input v-model:value="state.token" />
    </a-descriptions-item>
  </a-descriptions>
</template>

<script lang="ts">
import { computed, defineComponent, reactive } from 'vue';

export type PROTOCOL = 'http' | 'https' | 'ws' | 'wss';
export type REQUEST_METHOD = 'get' | 'post';

export default defineComponent({
  setup() {
    const state = reactive<{
      alias?: string;
      address?: string;
      protocol: PROTOCOL;
      method?: REQUEST_METHOD;
      token?: string;
    }>({
      alias: undefined,
      address: 'localhost:6880/jsonrpc',
      protocol: 'http',
      method: 'post',
      token: undefined,
    });

    const hasHTTP = computed(() => {
      return ['http', 'https'].includes(state.protocol);
    });

    return {
      state,
      hasHTTP,
    };
  },
});
</script>

<style lang="less" scoped>
.rpc-info {
  :deep(.ant-descriptions-item-label) {
    width: 260px;
  }
}
</style>
