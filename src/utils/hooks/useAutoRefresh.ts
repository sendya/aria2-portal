import { onMounted, onUnmounted, ref } from 'vue';

const useAutoRefresh = (cb: () => void, sleep = 1000): void => {
  const iv = ref<any /* number */>(0);
  const loading = ref(false);
  const fetch = async () => {
    if (loading.value) {
      return;
    }
    loading.value = true;
    await cb();
    loading.value = false;
    iv.value = setTimeout(fetch, sleep);
  };

  onMounted(() => {
    iv.value = setTimeout(fetch, sleep);
  });

  onUnmounted(() => {
    clearTimeout(iv.value);
  });
};

export default useAutoRefresh;
