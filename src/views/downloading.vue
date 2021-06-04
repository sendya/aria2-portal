<template>
  <page-container>
    <template #content>
      <a-space :size="8">
        <a-button type="primary" style="margin-right: 12px">
          <template #icon>
            <PlusOutlined />
          </template>
          新建
        </a-button>
        <a-tooltip title="开始任务" placement="bottomRight">
          <a-button v-if="hasSelected">
          <template #icon>
            <CaretRightOutlined />
          </template>
        </a-button>
        </a-tooltip>
        <a-tooltip title="删除任务" placement="bottomRight">
          <a-button v-if="hasSelected">
          <template #icon>
            <DeleteOutlined />
          </template>
        </a-button>
        </a-tooltip>
      </a-space>
    </template>
    <template #extraContent>
      <a-space :size="24">
        <a-statistic title="下载速度" value="1.8" suffix="MB/s" />
        <a-statistic title="上传速度" value="98" suffix="KB/s" />
      </a-space>
    </template>
    <a-card class="pro-table-wrapper" :bordered="false">
      <a-table
        size="small"
        row-key="hash"
        :columns="columns"
        :custom-row="customRow"
        :data-source="dataSource"
        :row-selection="rowSelection"
      >
        <template #size="{ text }">
          {{ formatSizeUnits(text) }}
        </template>
        <template #processing="{ text }">
          <a-progress :percent="text" :status="text < 100 ? 'active' : null" />
        </template>
        <template #speed="{ text }">
          <strong>{{ text !== null ? `${formatSizeUnits(text)}/s` : '-' }}</strong>
        </template>
      </a-table>
    </a-card>
  </page-container>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { formatSizeUnits } from '@/utils/file';
import useDraggableRow from '@/utils/hooks/useDraggableRow';
import type { ColumnProps } from '@/typing';

type Item = {
  hash: string;
  file: string;
  size: number;
  processing: number;
  time: string;
  speed: number | null;
};
const columns: ColumnProps<Item>[] = [
  {
    dataIndex: 'file',
    title: '文件名',
  },
  {
    dataIndex: 'size',
    title: '大小',
    slots: { customRender: 'size' },
  },
  {
    dataIndex: 'processing',
    title: '进度',
    width: '160px',
    slots: { customRender: 'processing' },
  },
  {
    dataIndex: 'time',
    title: '剩余时间',
  },
  {
    dataIndex: 'speed',
    title: '下载速度',
    slots: { customRender: 'speed' },
  },
];
const data: Item[] = [
  {
    hash: '123',
    file: '145cm色白お嬢様。下町お散歩デート連続中出し_最优化的质量和大小.mp4',
    size: 4831838208,
    processing: 100,
    time: '',
    speed: null,
  },
  {
    hash: '456',
    file: '釜山行.Train.to.Bushan.2016.BluRay.1080p.x265.10bit.MNHD-FRDS',
    size: 5808943267.84,
    processing: 70,
    time: '00:07:13',
    speed: 1024 * 1024 * 1.8,
  },
];

export default defineComponent({
  setup() {
    const { t } = useI18n();
    const d = ref(data);
    const { customRow, dataSource } = useDraggableRow(d);

    const rowSelection = reactive<{
      selectedRowKeys: string[];
      onChange: (selectedRowKeys: string[]) => void;
    }>({
      selectedRowKeys: [],
      onChange: (selectedRowKeys: string[]) => {
        rowSelection.selectedRowKeys = selectedRowKeys || [];
      },
    });
    const hasSelected = computed(() => rowSelection.selectedRowKeys.length > 0);

    return { t, columns, data, formatSizeUnits, rowSelection, hasSelected, customRow, dataSource };
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
