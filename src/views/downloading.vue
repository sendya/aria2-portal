<template>
  <page-container>
    <template #content>
      <a-space :size="8">
        <a-button type="primary" style="margin-right: 12px" @click="handleAdd">
          <template #icon>
            <PlusOutlined />
          </template>
          {{ t('pages.downloading.btn_add') }}
        </a-button>
        <a-tooltip :title="t('pages.downloading.btn_start')" placement="bottomRight">
          <a-button v-if="hasSelected">
            <template #icon>
              <CaretRightOutlined />
            </template>
          </a-button>
        </a-tooltip>
        <a-tooltip :title="t('pages.downloading.btn_pause')" placement="bottomRight">
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
        <a-statistic
          :title="t('pages.downloading.label_down')"
          :value="speeds.down.speed"
          :suffix="`${speeds.down.unit}/s`"
        />
        <a-statistic
          :title="t('pages.downloading.label_up')"
          :value="speeds.up.speed"
          :suffix="`${speeds.up.unit}/s`"
        />
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
        :row-class-name="record => `aria-${record.status}`"
      >
        <template #size="{ text }">
          {{ formatSizeUnits(text) }}
        </template>
        <template #processing="{ text }">
          <a-progress style="width: 90%" :percent="text" :status="text < 100 ? 'active' : null" />
        </template>
        <template #speed="{ record }">
          <ArrowUpOutlined v-if="record.seeder === 'true'" />
          <ArrowDownOutlined v-else-if="!['paused', 'complete'].includes(record.status)" />
          <span style="margin-left: 4px">
            {{ speedRender(record) }}
          </span>
        </template>
      </a-table>
    </a-card>

    <a-modal
      v-model:visible="modalState.visible"
      :loading="modalState.loading"
      :title="t('pages.downloading.modal.title')"
      :width="660"
      :ok-text="t('pages.downloading.modal.btn_download')"
      :cancel-text="t('pages.downloading.modal.btn_cancel')"
      @ok="handleOk"
    >
      <a-form layout="vertical">
        <a-form-item v-bind="validateInfos.links">
          <template #label>
            <span style="margin-right: 8px">{{ t('pages.downloading.modal.links.label') }}</span>
            <span>(0 {{ t('pages.downloading.modal.links.label_link') }})：</span>
            <a-button style="margin-left: 24px">
              <template #icon>
                <FolderOpenOutlined />
              </template>
            </a-button>
          </template>
          <a-textarea
            v-model:value="models.links"
            :auto-size="{ minRows: 6, maxRows: 10 }"
            :placeholder="t('pages.downloading.modal.links.placeholder')"
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </page-container>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, computed, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { message } from 'ant-design-vue';
import { formatSizeUnits } from '@/utils/file';
import { tellDownloadList, addDownload } from '@/api/rpc';
import { useStore } from 'vuex';
import { useForm } from '@ant-design-vue/use';
import type { ColumnProps } from '@/typing';
import useDraggableRow from '@/utils/hooks/useDraggableRow';

type DownloadForm = { links: string | undefined };
type Item = {
  hash: string;
  file: string;
  size: number;
  processing: number;
  time: string;
  speed?: number;
  upspeed?: number;
  seeder: 'true' | 'false';
  status: 'paused' | 'active' | 'complete';
};
const columns: ColumnProps<Item>[] = [
  {
    dataIndex: 'file',
    title: '文件名',
    ellipsis: true,
  },
  {
    dataIndex: 'size',
    title: '大小',
    width: '100px',
    slots: { customRender: 'size' },
  },
  {
    dataIndex: 'processing',
    title: '进度',
    width: '200px',
    slots: { customRender: 'processing' },
  },
  // {
  //   dataIndex: 'time',
  //   title: '剩余时间',
  // },
  {
    dataIndex: 'speed',
    title: '下载/上行速度',
    width: '150px',
    slots: { customRender: 'speed' },
  },
];

const speedRender = (record: Item) => {
  if (record.status === 'active') {
    if (record.seeder === 'true') {
      return `${formatSizeUnits(record.upspeed)}/s`;
    }
    return `${formatSizeUnits(record.speed)}/s`;
  }
  if (record.status === 'complete') {
    return '已完成';
  }
  return '已暂停';
};

export default defineComponent({
  setup() {
    const { t } = useI18n();
    const store = useStore();
    const list = ref<Item[]>([]);
    const { customRow, dataSource } = useDraggableRow(list);

    const modalState = reactive({
      loading: false,
      visible: false,
    });
    const models = reactive<DownloadForm>({
      links: undefined,
    });
    const rules = reactive({
      links: [
        {
          required: true,
          message: () => t('pages.downloading.modal.links.required'),
        },
      ],
    });

    const { validate, validateInfos } = useForm(models, rules);

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

    const handleAdd = () => {
      modalState.visible = true;
    };
    const handleOk = () => {
      modalState.loading = true;
      validate<DownloadForm>()
        .then(r => {
          const links = r.links?.split('\n') || [];
          if (links.length > 0) {
            addDownload(links).then(() => {
              modalState.visible = false;
              message.success(t('pages.downloading.modal.submit_success'), 10);
            });
          }
        })
        .finally(() => {
          modalState.loading = false;
        });
    };

    const load = () => {
      tellDownloadList().then(res => {
        list.value = res.map(item => {
          const process = Number(
            (Number(item.completedLength) / Number(item.totalLength)) * 100,
          ).toFixed(2);
          return {
            hash: item.infoHash,
            file: (item.bittorrent.info && item.bittorrent.info.name) || item.files[0].path,
            processing: Number(process),
            size: Number(item.totalLength),
            speed: Number(item.downloadSpeed),
            upspeed: Number(item.uploadSpeed),
            seeder: item.seeder,
            status: item.status,
          } as Item;
        });

        setTimeout(load, 2000);
      });
    };

    onMounted(() => {
      load();
    });
    return {
      t,
      columns,
      formatSizeUnits,
      rowSelection,
      hasSelected,
      customRow,
      dataSource,
      speedRender,

      modalState,
      handleAdd,
      handleOk,
      models,
      validateInfos,

      speeds: computed(() => store.getters['worker/speeds']),
    };
  },
});
</script>

<style lang="less" scoped>
.pro-table-wrapper {
  :deep(.ant-card-body) {
    padding: 0;
  }
  :deep(.ant-table) {
    min-height: 460px;

    .ant-table-tbody > {
      // aria-complete
      tr.aria-complete {
        background-color: rgb(208 239 193 / 50%);
      }
      tr.aria-paused {
        background-color: rgb(200 200 200 / 30%);
      }
      tr:hover:not(.ant-table-expanded-row):not(.ant-table-row-selected) {
        &.aria-complete > td {
          background-color: rgb(208 239 193 / 65%);
        }
        &.aria-paused > td {
          background-color: rgb(200 200 200 / 50%);
        }
      }
      tr.ant-table-row-selected {
        &.aria-complete > td {
          background-color: rgb(208 239 193 / 65%);
        }
        &.aria-paused > td {
          background-color: rgb(200 200 200 / 50%);
        }
      }
    }
  }
}
</style>
