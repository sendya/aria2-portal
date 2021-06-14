<template>
  <a-dropdown
    :visible="sVisible"
    :trigger="trigger"
    :overlay-class-name="cls"
    @visibleChange="visibleChange"
  >
    <template #overlay>
      <slot name="overlay" />
    </template>
    <slot />
  </a-dropdown>
</template>

<script lang="ts">
import { defineComponent, ref, ExtractPropTypes, watch, computed } from 'vue';
import classnames from 'classnames';
import 'ant-design-vue/es/dropdown/style';
import Dropdown from 'ant-design-vue/es/dropdown';
import PropTypes from 'ant-design-vue/es/_util/vue-types';

export const headerDropdownProps = {
  overlayClassName: PropTypes.string.def('header-dropdown-menu'),
  overlay: PropTypes.VNodeChild,
  placement: PropTypes.oneOf([
    'bottomLeft',
    'bottomRight',
    'topLeft',
    'topCenter',
    'topRight',
    'bottomCenter',
  ]),
  visible: PropTypes.looseBool,
  trigger: PropTypes.array,
};
export type HeaderDropdownProps = Partial<ExtractPropTypes<typeof headerDropdownProps>>;

export default defineComponent({
  components: {
    [Dropdown.name]: Dropdown,
  },
  props: headerDropdownProps,
  emits: ['visible-change'],
  setup(props, { emit }) {
    const sVisible = ref(false);
    const cls = computed(() => classnames(['container', props.overlayClassName]));

    const visibleChange = (visible: boolean) => {
      if (props.visible !== undefined) {
        emit('visible-change', visible);
      } else {
        sVisible.value = visible;
      }
    };
    watch(
      () => props.visible,
      () => {
        if (props.visible !== undefined) {
          sVisible.value = props.visible;
        }
      },
    );
    return {
      cls,
      sVisible,
      visibleChange,
    };
  },
});
</script>

<style lang="less">
@import './index.less';
</style>
