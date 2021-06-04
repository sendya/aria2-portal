<template>
  <header-dropdown>
    <template #overlay>
      <a-menu v-model:selectedKeys="selectedKeys">
        <a-menu-item key="en-US">
          <span role="img" style="margin-right: 8px" aria-label="English">us</span>
          English
        </a-menu-item>
        <a-menu-item key="zh-CN">
          <span role="img" style="margin-right: 8px" aria-label="简体中文">cn</span>
          简体中文
        </a-menu-item>
      </a-menu>
    </template>
    <TranslationOutlined class="action" />
  </header-dropdown>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import HeaderDropdown from '@/components/right-content/header-dropdown/index.vue';

export default defineComponent({
  components: {
    HeaderDropdown,
  },
  setup() {
    const selectedKeys = ref(['zh-CN']);
    return {
      selectedKeys,
    };
  },
});
</script>
