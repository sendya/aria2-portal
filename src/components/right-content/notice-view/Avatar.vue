<template>
  <header-dropdown overlay-class-name="header-dropdown-menu">
    <template #overlay>
      <a-menu>
        <a-menu-item>
          <span>
            <UserOutlined />
            {{ t('c.header.user.menu.user_center') }}
          </span>
        </a-menu-item>
        <a-menu-item>
          <span>
            <SettingOutlined />
            {{ t('c.header.user.menu.settings') }}
          </span>
        </a-menu-item>
        <a-menu-item>
          <span>
            <TeamOutlined />
            {{ t('c.header.user.menu.swtich_session') }}
          </span>
        </a-menu-item>
        <a-menu-divider />
        <a-menu-item>
          <span>
            <LogoutOutlined />
            {{ t('c.header.user.menu.logout') }}
          </span>
        </a-menu-item>
      </a-menu>
    </template>
    <span class="action account">
      <a-avatar
        size="small"
        class="avatar"
        alt="avatar"
        src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png"
      />
      <span class="name anticon">Sendya</span>
    </span>
  </header-dropdown>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HeaderDropdown from '@/components/right-content/header-dropdown/index.vue';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  components: { HeaderDropdown },
  setup() {
    const { t } = useI18n();

    return {
      t,
    };
  },
});
</script>

<style lang="less" scoped>
@import 'ant-design-vue/es/style/themes/default.less';

.account {
  .avatar {
    margin: ~'calc((@{layout-header-height} - 24px) / 2)' 0;
    margin-right: 8px;
    color: @primary-color;
    vertical-align: top;
    background: rgba(255, 255, 255, 0.85);
  }
}
</style>
