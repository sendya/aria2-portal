<template>
  <div :class="['right', theme]">
    <a-tooltip title="Use documentation">
      <a
        :style="{
          color: 'inherit',
        }"
        class="action"
        target="_blank"
        href="https://pro.ant.design/docs/getting-started"
        rel="noopener noreferrer"
      >
        <QuestionCircleOutlined />
      </a>
    </a-tooltip>
    <NoticeView class="action" />
    <Avatar />
    <SelectLang />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import NoticeView from './notice-view/index.vue';
import Avatar from './notice-view/Avatar.vue';
import SelectLang from '../select-lang/index.vue';

export default defineComponent({
  components: {
    Avatar,
    NoticeView,
    SelectLang,
  },
  props: {
    theme: {
      type: String as PropType<'dark' | 'light'>,
      default: 'light',
    },
  },
  setup() {},
});
</script>

<style lang="less" scoped>
@import 'ant-design-vue/es/style/themes/default.less';

@pro-header-hover-bg: rgba(0, 0, 0, 0.025);

.right {
  display: flex;
  float: right;
  height: 48px;
  margin-left: auto;
  margin-right: 8px;
  overflow: hidden;
  :deep(.action) {
    display: flex;
    align-items: center;
    height: 100%;
    padding: 0 12px;
    cursor: pointer;
    transition: all 0.3s;
    > span {
      vertical-align: middle;
    }
    &:hover {
      background: @pro-header-hover-bg;
    }
    &.opened {
      background: @pro-header-hover-bg;
    }
  }

  .search {
    padding: 0 12px;
    &:hover {
      background: transparent;
    }
  }
}

.dark {
  :deep(.action) {
    color: rgba(255, 255, 255, 0.85);
    > span {
      color: rgba(255, 255, 255, 0.85);
    }
    &:hover,
    &.opened {
      background: @primary-color;
    }
  }
}

.ant-pro-global-header {
  :deep(.dark) {
    .action {
      color: @text-color;
      > span {
        color: @text-color;
      }
      &:hover {
        color: rgba(255, 255, 255, 0.85);
        > span {
          color: rgba(255, 255, 255, 0.85);
        }
      }
    }
  }
}
</style>
<style lang="less">
.header-dropdown-menu {
  .anticon {
    margin-right: 8px;
  }
  .ant-dropdown-menu-item {
    min-width: 160px;
  }
}
</style>
