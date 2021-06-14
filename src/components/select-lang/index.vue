<template>
  <header-dropdown>
    <template #overlay>
      <a-menu :selected-keys="selectedKeys" @click="handleSelect">
        <a-menu-item key="en-US">
          <span role="img" style="margin-right: 8px" aria-label="English">us</span>
          <CheckOutlined v-if="selectedKeys.includes('en-US')" />
          English
        </a-menu-item>
        <a-menu-item key="zh-CN">
          <span role="img" style="margin-right: 8px" aria-label="简体中文">cn</span>
          <CheckOutlined v-if="selectedKeys.includes('zh-CN')" />
          简体中文
        </a-menu-item>
      </a-menu>
    </template>
    <TranslationOutlined class="action" />
  </header-dropdown>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { loadLanguageAsync } from '@/locales';
import HeaderDropdown from '@/components/right-content/header-dropdown/index.vue';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  components: {
    HeaderDropdown,
  },
  setup() {
    const i18n = useI18n();

    const selectedKeys = ref([i18n.locale.value || 'zh-CN']);

    const handleSelect = ({ key }: { key: string }) => {
      loadLanguageAsync(key).then(() => {
        console.log('switch lang', key);
        selectedKeys.value = [key];
      });
    };
    return {
      selectedKeys,
      handleSelect,
    };
  },
});
</script>
