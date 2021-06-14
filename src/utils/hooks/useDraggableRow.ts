import { isRef, computed, Ref, ref } from 'vue';

function useDraggableRow<T>(dataSource: Ref<T[]>) {
  const dragItem = ref<number>();
  const targetItem = ref<number>();
  const overItem = ref<number>();
  const customRow = computed(() => {
    const dragging = ref<boolean>();

    return (record: T, index: number) => {
      return {
        draggable: true,
        ondrag() {
          dragItem.value = index;
        },
        ondrop() {
          targetItem.value = index;
        },
        ondragstart() {
          dragging.value = true;
        },
        ondragend() {
          dragging.value = false;
          overItem.value = undefined;
          if (!isRef(dataSource)) {
            return;
          }
          if (dragItem.value !== targetItem.value) {
            // 解构交换
            [dataSource.value[dragItem.value!], dataSource.value[targetItem.value!]] = [
              dataSource.value[targetItem.value!],
              dataSource.value[dragItem.value!],
            ];
          }
        },
        ondragover() {
          overItem.value = index;
          return false;
        },
        style: { cursor: 'move' },
        className:
          typeof overItem.value === 'undefined' ||
          overItem.value !== index ||
          dragItem.value! === overItem.value!
            ? undefined
            : dragItem.value! > overItem.value!
            ? 'drop-over-upward'
            : 'drop-over-downward',
      };
    };
  });
  return {
    customRow,
    dataSource,
  };
}

export default useDraggableRow;
