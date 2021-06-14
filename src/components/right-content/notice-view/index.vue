<template>
  <header-dropdown
    placement="bottomRight"
    overlay-class-name="popover"
    :visible="visible"
    :trigger="['click']"
    @visible-change="visibleChange"
  >
    <template #overlay>
      <div style="width: 336px">
        <a-tabs class="tabs" :animated="false">
          <a-tab-pane key="1" tab="Notification (4)">
            <NoticeList :data="data" />
          </a-tab-pane>
          <a-tab-pane key="2" tab="Message (3)">
            <NoticeList :data="data2" />
          </a-tab-pane>
          <a-tab-pane key="3" tab="To do (4)">
            <NoticeList :data="data3" />
          </a-tab-pane>
        </a-tabs>
      </div>
    </template>
    <span :class="['notice-button', visible ? 'opened' : null]">
      <a-badge :count="15" style="box-shadow: none" class="badge">
        <BellOutlined class="icon" />
      </a-badge>
    </span>
  </header-dropdown>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import type { NoticeIconData } from './typing';
import HeaderDropdown from '../header-dropdown/index.vue';
import NoticeList from './NoticeList.vue';

const data: NoticeIconData[] = [
  {
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
    title: '你收到了 14 份新周报',
    datetime: '1周前',
    read: false,
  },
  {
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/OKJXDXrmkNshAMvwtvhu.png',
    title: '你推荐的 曲妮妮 已通过第三轮面试',
    datetime: '1周前',
    read: false,
  },
  {
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/kISTdvpyTAhtGxpovNWd.png',
    title: '这种模板可以区分多种通知类型',
    datetime: '1年前',
    read: false,
  },
  {
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/GvqBnKhFgObvnSGkDsje.png',
    title: '左侧图标用于区分不同的类型',
    datetime: '1周前',
    read: false,
  },
];

const data2: NoticeIconData[] = [
  {
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
    title: '曲丽丽 评论了你',
    description: '描述信息描述信息描述信息',
    datetime: '4 年前',
  },
];

const data3: NoticeIconData[] = [
  {
    title: '任务名称 1',
    description: '描述信息描述信息描述信息',
    datetime: `任务需要在 12点 前完成`,
    extra: '未开始',
  },
];

export default defineComponent({
  name: 'Notice',
  components: {
    HeaderDropdown,
    NoticeList,
  },
  setup() {
    const visible = ref(false);
    const visibleChange = (v: boolean) => {
      visible.value = v;
    };
    return {
      visible,
      visibleChange,

      data,
      data2,
      data3,
    };
  },
});
</script>

<style lang="less" scoped>
@import 'ant-design-vue/es/style/themes/default.less';

.popover {
  position: relative;
  width: 336px;
}
.notice-button {
  display: inline-block;
  cursor: pointer;
  transition: all 0.3s;
}
.icon {
  padding: 4px;
  vertical-align: middle;
}
.badge {
  font-size: 16px;
}
.tabs {
  :deep(.ant-tabs-tab) {
    margin: auto;
    font-weight: unset;
  }
  :deep(.ant-tabs-tab-active) {
    text-shadow: 0 0 0.25px currentColor;
  }
  :deep(.ant-tabs-nav-scroll) {
    text-align: center;
  }
  :deep(.ant-tabs-bar) {
    margin-bottom: 16px;
  }
}
</style>
