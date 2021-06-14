import { reactive, onMounted } from 'vue';

export interface PageInfo {
  current: number;
  pageSize: number;
  total: number;
}

export interface RequestData<T> {
  data: T[];
  success?: boolean;
  total?: number;
  [key: string]: any;
}

export type RequestParams =
  | {
      pageSize: number;
      current: number;
      [key: string]: any;
    }
  | undefined;

export interface UseFetchDataAction<T extends RequestData<any>> {
  stripe: (record: any, index: number) => string | undefined;
  cancel: () => void;
  reload: () => Promise<void>;
  resetPageIndex: () => void;
  reset: () => void;
  context: Context<T>;
  setPageInfo: (pageInfo: Partial<PageInfo>) => void;
}

export interface Context<T> {
  current: number;
  pageSize: number;
  dataSource: T[];
  loading: boolean;
  total: number;
  params?: {
    [key: string]: any;
  };
  [key: string]: any;
}

export const defaultContext: Context<any> = {
  stripe: false,
  loading: false,
  current: 1,
  pageSize: 20,
  total: 0,
  dataSource: [],
};

export type WrapFetchData<T> = {
  data: T[];
  total: number;
  success: boolean;
};

// export const wrap = <T>(data: T[]) => {
//   return {
//     data,
//     total: data.length,
//     success: data !== null && data !== undefined,
//   };
// };

export const wrap = <T>(req: () => Promise<T[]>): (() => Promise<RequestData<T>>) => {
  return () =>
    req().then(res => {
      const data = res;
      return {
        data,
        total: data.length,
        success: data !== null && data !== undefined,
      };
    });
};

export const useFetchData = <T extends RequestData<any>>(
  getData: (params?: RequestParams) => Promise<RequestData<T>>,
  context?: {
    stripe?: boolean;
    current?: number;
    pageSize?: number;
    dataSource?: T[];
    loading?: boolean;
    [key: string]: any;
  },
  options?: {
    current?: number;
    pageSize?: number;
    onLoad?: (dataSource: T['data']) => void;
    onRequestError?: (e: Error) => void;
    pagination?: boolean;
  },
): UseFetchDataAction<T> => {
  const state = reactive({
    ...defaultContext,
    ...context,
  }) as Context<T>;

  const fetchList = async () => {
    // 请求中禁止重复请求
    if (state.loading) {
      return;
    }
    state.loading = true;
    const { pageSize = 20, current = 1 } = state;
    try {
      const params: RequestParams =
        options?.pagination !== false
          ? {
              current,
              pageSize,
              ...state.params,
            }
          : undefined;
      const { data, success, total: dataTotal = 0 } = await getData(params);
      state.loading = false;
      if (success !== false) {
        state.dataSource = data;
        state.total = dataTotal;
      }
    } catch (e) {
      state.loading = false;
      // 如果没有传递这个方法的话，需要把错误抛出去，以免吞掉错误
      if (options?.onRequestError === undefined) {
        throw new Error(e);
      } else {
        options.onRequestError(e);
      }
    }
  };

  const cancel = () => {};

  const reset = () => {};

  const reload = (): Promise<void> => {
    return new Promise(resolve => {
      resolve(fetchList());
    });
  };

  const setPageInfo = (pageInfo: Partial<PageInfo>) => {
    pageInfo.current && (state.current = pageInfo.current);
    pageInfo.pageSize && (state.pageSize = pageInfo.pageSize);
    state.params = pageInfo;
  };

  const resetPageIndex = (): void => {
    state.current = 1;
  };

  const stripe = (_: any, index: number) =>
    index % 2 === 1 && state.stripe && 'ant-pro-table-row-striped';

  onMounted(() => {
    fetchList().catch(e => {
      throw new Error(e);
    });
  });

  return {
    stripe,
    cancel,
    reset,
    reload,
    resetPageIndex,
    setPageInfo: info => {
      setPageInfo({
        current: state.current,
        pageSize: state.pageSize,
        ...info,
      });
    },
    context: state,
  };
};

export default useFetchData;
