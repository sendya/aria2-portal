import { VNodeChild } from 'vue';

export type ColumnRender<T> = {
  text: string | number;
  record: T;
  index: number;
};

type ColumnUk =
  | {
      key: string | number;
    }
  | {
      dataIndex: string | number;
    };

export type ColumnProps<T> = ColumnUk & {
  title: string | VNodeChild;
  width?: string | number;
  ellipsis?: boolean;
  align?: 'left' | 'right' | 'center';
  customRender?: (args: ColumnRender<T>) => VNodeChild | string;
  slots?: Record<string, any>;
};
