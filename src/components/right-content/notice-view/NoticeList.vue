<template>
  <div>
    <a-list class="list" item-layout="horizontal" :data-source="data">
      <template #renderItem="{ item }">
        <a-list-item class="item">
          <a-list-item-meta class="meta">
            <template #title>
              <div class="title">
                {{ item.title }}
                <span v-if="item.extra" class="extra">{{ item.extra }}</span>
              </div>
            </template>
            <template v-if="item.avatar" #avatar>
              <a-avatar class="avatar" :src="item.avatar" />
            </template>
            <template #description>
              <div>
                <div v-if="item.description" class="description">{{ item.description }}</div>
                <div class="datetime">{{ item.datetime }}</div>
              </div>
            </template>
          </a-list-item-meta>
        </a-list-item>
      </template>
    </a-list>
    <div class="bottomBar">
      <div>Empty</div>
      <div>See more</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import type { NoticeIconData } from './typing';

export default defineComponent({
  props: {
    data: {
      type: Array as PropType<NoticeIconData[]>,
      default: () => [],
    },
  },
  setup() {},
});
</script>

<style lang="less" scoped>
@import 'ant-design-vue/es/style/themes/default.less';

.list {
  max-height: 400px;
  overflow: auto;

  &::-webkit-scrollbar {
    display: none;
  }

  :deep(.item) {
    padding-right: 24px;
    padding-left: 24px;
    overflow: hidden;
    cursor: pointer;
    transition: all 0.3s;

    .meta {
      width: 100%;
    }

    .avatar {
      margin-top: 4px;
      background: @component-background;
    }
    .iconElement {
      font-size: 32px;
    }

    &.read {
      opacity: 0.4;
    }
    &:last-child {
      border-bottom: 0;
    }
    &:hover {
      background: @primary-1;
    }
    .title {
      margin-bottom: 8px;
      font-weight: normal;
    }
    .description {
      font-size: 12px;
      line-height: @line-height-base;
    }
    .datetime {
      margin-top: 4px;
      font-size: 12px;
      line-height: @line-height-base;
    }
    .extra {
      float: right;
      margin-top: -1.5px;
      margin-right: 0;
      color: @text-color-secondary;
      font-weight: normal;
    }
  }

  .loadMore {
    padding: 8px 0;
    color: @primary-6;
    text-align: center;
    cursor: pointer;
    &.loadedAll {
      color: rgba(0, 0, 0, 0.25);
      cursor: unset;
    }
  }
}

.notFound {
  padding: 73px 0 88px;
  color: @text-color-secondary;
  text-align: center;
  img {
    display: inline-block;
    height: 76px;
    margin-bottom: 16px;
  }
}

.bottomBar {
  height: 46px;
  color: @text-color;
  line-height: 46px;
  text-align: center;
  border-top: 1px solid @border-color-split;
  border-radius: 0 0 @border-radius-base @border-radius-base;
  transition: all 0.3s;

  div {
    display: inline-block;
    width: 50%;
    cursor: pointer;
    transition: all 0.3s;
    user-select: none;

    &:only-child {
      width: 100%;
    }
    &:not(:only-child):last-child {
      border-left: 1px solid @border-color-split;
    }
  }
}
</style>
